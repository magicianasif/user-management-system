import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import SignUp from "../src/app/sign-up/page";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignUp", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the sign-up form", () => {
    render(<SignUp />);

    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("displays error messages when required fields are empty", async () => {
    render(<SignUp />);

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      const fullNameError = screen.getByText("Full name is required");
      const usernameError = screen.getByText("Username is required");
      const emailError = screen.getByText("Email is required");
      const passwordError = screen.getByText("Password is required");
      const confirmPasswordError = screen.getByText(
        "Confirm password is required"
      );

      expect(fullNameError).toBeInTheDocument();
      expect(usernameError).toBeInTheDocument();
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
      expect(confirmPasswordError).toBeInTheDocument();
    });
  });
  
  it("registers a new user and redirects to the sign-in page", async () => {
    localStorage.setItem("users", JSON.stringify([]));

    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "newUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "newuser@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      expect(users).toHaveLength(1);
      expect(users[0]).toEqual({
        fullName: "John Doe",
        username: "newUser",
        email: "newuser@test.com",
        password: "password123",
      });
    });
  });
});
