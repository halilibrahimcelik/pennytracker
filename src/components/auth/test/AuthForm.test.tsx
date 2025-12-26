import { render, screen } from "@testing-library/react";
import { AuthForm } from "../AuthForm";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
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
const mockAuthMethod = vi.fn();
describe("Transaction Form Test Suites", () => {
  beforeEach(() => {
    mockAuthMethod.mockClear();
    mockAuthMethod.mockResolvedValue({ success: false, errors: {} });
  });
  it("should render transaction form correctly", () => {
    render(
      <AuthForm
        title="New Transaction"
        authType="sign-up"
        authMethod={mockAuthMethod}
        initialState={{ success: false, errors: {} }}
      />
    );
    const transactionFromTitle = screen.getByRole("heading", { level: 2 });
    expect(transactionFromTitle).toBeInTheDocument();
  });
  it("should  call authMethod on form submission", async () => {
    render(
      <AuthForm
        title="New Transaction"
        authType="sign-up"
        authMethod={mockAuthMethod}
        initialState={{ success: false, errors: {} }}
      />
    );
    const user = userEvent.setup();
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const passportInput = screen.getByTestId("password-input");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(passportInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    await user.type(emailInput, "tess1t@example.com");
    await user.type(nameInput, "Test User");
    await user.type(passportInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    expect(emailInput).toHaveValue("tess1t@example.com");
    expect(nameInput).toHaveValue("Test User");
    expect(passportInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
    await user.click(submitButton);
    expect(mockAuthMethod).toHaveBeenCalledTimes(1);
  });
});
