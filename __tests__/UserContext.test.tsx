import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProvider, useUserContext } from "../src/app/context/UserContext";

const TestComponent = () => {
  const { user, login, logout } = useUserContext();
  
  return (
    <div>
      <div>
        {user ? `Welcome, ${user.username}` : "Not logged in"}
      </div>
      <button onClick={() => login("testuser")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("UserContext", () => {
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
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn().mockReturnValue('{"username":"testuser"}');

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      '{"username":"testuser"}'
    );
  });
});
