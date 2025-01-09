// __tests__/Navbar.test.tsx
import { render, screen } from "@testing-library/react";
import Navbar from "../src/app/components/Navbar";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Navbar Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    localStorage.clear();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("renders the navbar with the correct title", () => {
    render(<Navbar />);

    const navbarTitle = screen.getByTestId("navbar-title");
    expect(navbarTitle).toHaveTextContent("User Management");
  });

  test("logs out the user and redirects on clicking the logout button", async () => {
    localStorage.setItem("user", JSON.stringify({ username: "testuser" }));

    render(<Navbar />);

    const logoutButton = screen.getByTestId("logout-button");
    await userEvent.click(logoutButton);

    expect(localStorage.getItem("user")).toBeNull();

    expect(mockPush).toHaveBeenCalledWith("/sign-in");
  });

  test("renders the logout icon correctly", () => {
    render(<Navbar />);

    const logoutIcon = screen.getByTestId("logout-button").querySelector("svg");
    expect(logoutIcon).toBeInTheDocument();
  });
});
