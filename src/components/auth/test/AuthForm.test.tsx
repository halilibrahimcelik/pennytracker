import { render, screen } from "@testing-library/react";
import { AuthForm } from "../AuthForm";
import { expect, vi } from "vitest";
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
  it("should render transaction form correctly", () => {
    render(
      <AuthForm
        title="New Transaction"
        authType="sign-up"
        authMethod={mockAuthMethod}
        initialState={""}
      />
    );
    const transactionFromTitle = screen.getByRole("heading", { level: 2 });
    expect(transactionFromTitle).toBeInTheDocument();
  });
});
