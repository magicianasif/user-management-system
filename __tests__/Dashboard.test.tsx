import { render, screen } from "@testing-library/react";
import Dashboard from "../src/app/dashboard/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Dashboard", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to home page if no user is stored in localStorage", () => {
    render(<Dashboard />);
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("renders the user dashboard for a non-admin user", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "john", fullName: "John Doe" })
    );

    render(<Dashboard />);

    expect(screen.getByText("Welcome, John")).toBeInTheDocument();
    expect(
      screen.getByText("This is your user dashboard.")
    ).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders the admin dashboard with registered users", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "admin", fullName: "Admin User" })
    );
    localStorage.setItem(
      "users",
      JSON.stringify([
        { username: "admin", fullName: "Admin User" },
        { username: "john", fullName: "John Doe" },
        { username: "jane", fullName: "Jane Smith" },
      ])
    );

    render(<Dashboard />);

    expect(screen.getByText("Welcome, Admin")).toBeInTheDocument();
    expect(screen.getByText("Registered Users:")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.queryByText("Admin User")).not.toBeInTheDocument();
  });

  it("renders a message when no users are registered", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "admin", fullName: "Admin User" })
    );
    localStorage.setItem("users", JSON.stringify([]));

    render(<Dashboard />);

    expect(screen.getByText("No users have registered")).toBeInTheDocument();
  });

  it("renders a message when no users are registered", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ username: "admin", fullName: "Admin User" })
    );
    localStorage.setItem("users", JSON.stringify([]));

    render(<Dashboard />);

    expect(screen.getByText("No users have registered")).toBeInTheDocument();
  });

  it("renders a welcome text with the username", () => {
    const username = "admin";
    const fullName = "Admin User";

    localStorage.setItem("user", JSON.stringify({ username, fullName }));
    localStorage.setItem("users", JSON.stringify([]));

    render(<Dashboard />);

    const capitalizedUsername =
      username.charAt(0).toUpperCase() + username.slice(1);

    expect(
      screen.getByText(`Welcome, ${capitalizedUsername}`)
    ).toBeInTheDocument();
  });
});
