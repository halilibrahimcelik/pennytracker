import { render, screen, waitFor } from "@testing-library/react";
import TransactionForm from "../TransactionForm";
import { beforeAll, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.scrollIntoView = function () {};
});

const mockMutate = vi.fn();

vi.mock("@/hooks", () => {
  return {
    useTransactionMutation: () => ({
      mutate: mockMutate,
      isPending: false,
      error: undefined,
    }),
  };
});

vi.mock("@/lib/trpc/client", () => ({
  trpcClientRouter: {
    transaction: {
      create: {
        useMutation: vi.fn().mockReturnValue({
          mutate: vi.fn(),
          isPending: false,
          error: undefined,
        }),
      },
      update: {
        useMutation: vi.fn().mockReturnValue({
          mutate: vi.fn(),
          isPending: false,
          error: undefined,
        }),
      },
    },
  },
}));

describe("TransactionForm Component Test Suites", () => {
  // beforeEach(() => {
  //   mockMutate.mockClear();
  // });

  test("should render TransactionForm Component", () => {
    render(<TransactionForm />);
    const formComponent = screen.getByTestId("transaction-form");
    expect(formComponent).toBeInTheDocument();
  });

  test("should  submit the form with correct data", async () => {
    const user = userEvent.setup();
    render(<TransactionForm />);

    // Get form elements
    const radioBtn = screen.getByTestId("Transaction Type");
    const expenseRadio = screen.getByLabelText(/expense/i);
    const selectDropdown = screen.getByRole("combobox", {
      name: /category/i,
    });
    const amountInput = screen.getByLabelText(/amount/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const datePicker = screen.getByTestId("date-picker-trigger");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    // Simulate user interactions
    await user.type(amountInput, "1500");
    await user.type(descriptionInput, "Monthly Salary");
    await user.click(expenseRadio);

    expect(expenseRadio).toHaveValue("expense");

    await user.click(selectDropdown);
    const leisureOption = await screen.findByRole("option", {
      name: /leisure/i,
    });

    // Assert the option is in the document before clicking
    expect(leisureOption).toBeInTheDocument();

    await user.click(leisureOption);

    // Verify the selected value appears in the trigger
    await waitFor(() => {
      expect(selectDropdown).toHaveTextContent("Leisure");
    });

    await user.click(datePicker);

    waitFor(async () => {
      const dayToSelect = await screen.findByRole("button", { name: "15" });
      await user.click(dayToSelect);
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
      expect(mockMutate).toHaveBeenCalledTimes(1);
    });

    expect(radioBtn).toBeInTheDocument();
    expect(selectDropdown).toBeInTheDocument();
    expect(datePicker).toBeInTheDocument();
  });
});
