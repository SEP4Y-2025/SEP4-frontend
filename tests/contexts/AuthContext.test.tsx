import { render, waitFor } from "@testing-library/react";
import {
  UserContextProvider,
  useAuth,
} from "../../src/contexts/UserAuthContext";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";

vi.mock("../../src/services/AuthService", async () => {
  const actual = await vi.importActual<
    typeof import("../../src/services/AuthService")
  >("../../src/services/AuthService");
  return {
    ...actual,
    loginAPI: vi.fn((username, password) => {
      if (username === "testuser" && password === "testpass") {
        return Promise.resolve({
          data: {
            access_token: "mock-token-456",
            userName: "testuser",
          },
        });
      }
      return Promise.reject(new Error("Invalid credentials"));
    }),
  };
});

test("logs in user and sets context values", async () => {
  const TestComponent = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { loginUser } = useAuth();

    React.useEffect(() => {
      loginUser(username, password);
    }, []);

    return (
      <div>
        <div data-testid="username">{localStorage.getItem("user")}</div>
        <div data-testid="token">{localStorage.getItem("token")}</div>
      </div>
    );
  };

  const { getByTestId } = render(
    <MemoryRouter>
      <UserContextProvider>
        <TestComponent username="testuser" password="testpass" />
      </UserContextProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByTestId("token").textContent).toBe("mock-token-456");
  });
});

test("shows error message on failed login", async () => {
  const TestComponent = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { loginUser, user } = useAuth();

    React.useEffect(() => {
      loginUser(username, password);
    }, [loginUser, username, password]);

    return (
      <div>
        <div data-testid="username">{user ? user.toString() : "No user"}</div>
        <div data-testid="token">{localStorage.getItem("token")}</div>
      </div>
    );
  };

  const { getByTestId } = render(
    <MemoryRouter>
      <UserContextProvider>
        <TestComponent username="testuser" password="wrong" />
      </UserContextProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByTestId("token").textContent).toBe("");
  });
});

test("logs out user and clears context values", async () => {
  const LogoutTestComponent = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { loginUser, logout } = useAuth();

    React.useEffect(() => {
      loginUser(username, password);
    }, [loginUser, username, password]);

    return (
      <div>
        <button data-testid="logout-button" onClick={logout}>
          Logout
        </button>
        <div data-testid="token">{localStorage.getItem("token")}</div>
      </div>
    );
  };

  const { getByTestId } = render(
    <MemoryRouter>
      <UserContextProvider>
        <LogoutTestComponent username="testuser" password="testpass" />
      </UserContextProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(getByTestId("token").textContent).toBe("mock-token-456");
  });

  getByTestId("logout-button").click();

  await waitFor(() => {
    expect(getByTestId("token").textContent).toBe("");
  });
});

afterEach(() => {
  localStorage.clear();
});
