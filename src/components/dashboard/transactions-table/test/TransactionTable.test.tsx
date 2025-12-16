import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import TransactionTable from "../TransactionTable";
import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/types";
import userEvent from "@testing-library/user-event";
vi.mock("@/hooks", () => ({
  useDebounce: (value: string) => value,
}));
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
const mockColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transactionType",
    header: "Type",
  },
  {
    accessorKey: "transactionDate",
    header: "Date",
  },
];
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
        columns={mockColumns}
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
        columns={mockColumns}
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
        columns={mockColumns}
        data={mockData}
        pagination={{ page: 1, pageSize: 10 }}
        count={2}
      />
    );
    expect(screen.getByText("3000")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
  });
  it("should render correct query from the search field", async () => {
    render(
      <TransactionTable
        columns={mockColumns}
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
});
