import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { UserProvider, useUserContext } from "../src/app/context/UserContext";

const TestComponent = () => {
  const { user, login, logout } = useUserContext();

  return (
    <div>
      <div>{user ? `Welcome, ${user.username}` : "Not logged in"}</div>
      <button onClick={() => login("testuser")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("UserContext", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    cleanup();
  });

  it("should allow the user to log in", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    expect(screen.getByText(/Welcome, testuser/)).toBeInTheDocument();
  });

  it("should allow the user to log out", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(screen.getByText(/Not logged in/)).toBeInTheDocument();
  });

  it("should persist user data in localStorage", () => {
    const mockSetItem = jest.fn();
    const mockGetItem = jest.fn().mockReturnValue('{"username":"testuser"}');
    Storage.prototype.setItem = mockSetItem;
    Storage.prototype.getItem = mockGetItem;

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(mockGetItem).toHaveBeenCalledWith("user");
    expect(screen.getByText(/Welcome, testuser/)).toBeInTheDocument();
  });

  it("should update localStorage when logging in", () => {
    const mockSetItem = jest.fn();
    Storage.prototype.setItem = mockSetItem;

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    expect(mockSetItem).toHaveBeenCalledWith("user", '{"username":"testuser"}');
  });

  it("should load user from localStorage when reloaded", () => {
    const mockGetItem = jest.fn().mockReturnValue('{"username":"testuser"}');
    Storage.prototype.getItem = mockGetItem;

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(mockGetItem).toHaveBeenCalledWith("user");
    expect(screen.getByText(/Welcome, testuser/)).toBeInTheDocument();
  });
});
