import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import TransactionTable from "../TransactionTable";
import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/types";
import userEvent from "@testing-library/user-event";
import { TransactionColumns } from "../columns";
vi.mock("@/hooks", () => ({
  useDebounce: (value: string) => value,
}));
vi.mock("date-fns", async (importOriginal) => {
  const actual = await importOriginal<typeof import("date-fns")>();
  return {
    ...actual,
    format: vi.fn(),
  };
});
const mockMutate = vi.fn();
const mockMutateAsync = vi.fn();
vi.mock("@/lib/trpc/client", () => ({
  trpcClientRouter: {
    transaction: {
      delete: {
        useMutation: vi.fn(() => ({
          mutate: mockMutate,
          mutateAsync: mockMutateAsync,
          isPending: false,
          isError: false,
          isSuccess: false,
          data: undefined,
          error: null,
        })),
      },
    },
  },
}));

vi.mock("../columns", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../columns")>();
  return {
    ...actual,
    TransactionColumns: actual.TransactionColumns,
  };
});
vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();
  const { useRouter } =
    await vi.importActual<typeof import("next-router-mock")>(
      "next-router-mock"
    );
  const usePathname = vi.fn().mockImplementation(() => {
    const router = useRouter();
    return router.pathname;
  });
  const useSearchParams = vi.fn().mockImplementation(() => {
    const router = useRouter();
    return new URLSearchParams(router.query?.toString());
  });
  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  };
});

const mockData: Transaction[] = [
  {
    id: "1",
    description: "Salary",
    amount: "3000",
    category: "Income",
    transactionType: "income",
  },
  {
    id: "2",
    description: "Rent Payment",
    amount: "1200",
    transactionType: "expense",
    category: "Housing",
  },
];

describe("TransactionTable Component Test Suites", () => {
  it("should render Transaction Table", async () => {
    render(
      <TransactionTable
        columns={TransactionColumns}
        data={mockData}
        pagination={{ page: 1, pageSize: 10 }}
        count={2}
      />
    );
    expect(screen.getByTestId("transactions-table")).toBeInTheDocument();
  });
  it("should show no results when there is no data", () => {
    render(
      <TransactionTable
        columns={TransactionColumns}
        data={[]}
        pagination={{ page: 1, pageSize: 10 }}
        count={0}
      />
    );
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
  it("should render correct amount for the transactions", async () => {
    render(
      <TransactionTable
        columns={TransactionColumns}
        data={mockData}
        pagination={{ page: 1, pageSize: 10 }}
        count={2}
      />
    );
    const rows = await screen.findAllByRole("row");
    expect(rows).toHaveLength(3);
  });
  it("should render correct query from the search field", async () => {
    render(
      <TransactionTable
        columns={TransactionColumns}
        data={mockData}
        pagination={{ page: 1, pageSize: 10 }}
        count={2}
      />
    );
    const user = userEvent.setup();
    const searchInput = screen.getByLabelText(/search transactions/i);
    const testQuery = "Rent";
    await user.type(searchInput, testQuery);
    expect(searchInput).toHaveValue(testQuery);
    const row = await screen.findByRole("row", { name: /rent/i });
    expect(row).toBeInTheDocument();
    expect(screen.queryByText(/salary/i)).not.toBeInTheDocument();
  });
  it("should delete  a transaction when delete action is triggered", async () => {
    render(
      <TransactionTable
        columns={TransactionColumns}
        data={mockData}
        pagination={{ page: 1, pageSize: 10 }}
        count={2}
      />
    );
    const user = userEvent.setup();
    const SalaryRow = await screen.findByRole("row", { name: /salary/i });
    expect(SalaryRow).toBeInTheDocument();
    const deleteAction = await screen.findByTestId(
      `transaction-actions-${mockData[0].id}`
    );
    expect(deleteAction).toBeInTheDocument();
    await user.click(deleteAction);
    const deleteButton = await screen.findByTestId(
      `transaction-actions-delete-${mockData[0].id}`
    );
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);
    const confirmButton = await screen.findByRole("button", { name: "Yes" });
    expect(confirmButton).toBeInTheDocument();
    await user.click(confirmButton);
    expect(mockMutate).toHaveBeenCalledTimes(1);
  });
});
