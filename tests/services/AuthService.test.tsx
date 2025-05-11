import { render, waitFor } from "@testing-library/react";
import {
    UserContextProvider,
    useAuth,
} from "../../src/contexts/UserAuthContext";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";

const TestComponent = () => {
    const { loginUser, user, token } = useAuth();

    React.useEffect(() => {
        loginUser("testuser", "testpass");
    }, []);

    return (
        <div>
            <div data-testid="username">{user?.userName}</div>
            <div data-testid="token">{localStorage.getItem("token")}</div>
        </div>
    );
};

test("logs in user and sets context values", async () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <UserContextProvider>
                <TestComponent />
            </UserContextProvider>
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(getByTestId("username").textContent).toBe("testuser");
        expect(getByTestId("token").textContent).toBe("mock-token-456");
    });
});
