import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { UserProvider } from "../src/app/context/UserContext";
import SignIn from "../src/app/sign-in/page";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignIn", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the sign-in form", () => {
    render(
      <UserProvider>
        <SignIn />
      </UserProvider>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("displays error messages when invalid credentials are submitted", async () => {
    const users = [{ username: "user", password: "password" }];
    localStorage.setItem("users", JSON.stringify(users));

    render(
      <UserProvider>
        <SignIn />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      const usernameError = screen.getByTestId("username-error");
      const passwordError = screen.getByTestId("password-error");

      expect(usernameError).toBeInTheDocument();
      expect(usernameError).toHaveTextContent("Invalid credentials");
      expect(passwordError).toBeInTheDocument();
      expect(passwordError).toHaveTextContent("Invalid credentials");
    });
  });

  it("calls login and pushes to dashboard on successful login", async () => {
    const users = [{ username: "user", password: "password" }];
    localStorage.setItem("users", JSON.stringify(users));

    render(
      <UserProvider>
        <SignIn />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("calls login and pushes to admin on admin credentials", async () => {
    render(
      <UserProvider>
        <SignIn />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/admin");
    });
  });
});
