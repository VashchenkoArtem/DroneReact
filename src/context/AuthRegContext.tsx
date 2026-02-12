import { createContext, type ReactNode, useContext, useEffect, useState } from "react";


interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface IUserContext {
    token: string;
    user: IUser | null;
    login: (userData: LoginCredentials) => Promise<void | string>;
    logout: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within UserContextProvider");
    return context;
};

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string>(localStorage.getItem("token") || "");
    const [user, setUser] = useState<IUser | null>(null);

    const API_URL = "http://127.0.0.1:8000/users";

    async function login(userData: LoginCredentials) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (!response.ok) {
                return result.message || "Login failed";
            }

            setToken(result.token);
            setUser(result.user);
            localStorage.setItem("token", result.token);
        } catch {
            return "Network error. Is server running?";
        }
    }

    async function fetchMe() {
        if (!token) return;
        try {
            const response = await fetch(`${API_URL}/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const result = await response.json();
            if (response.ok) {
                setUser(result);
            } else {
                logout();
            }
        } catch {
            console.error("Auth sync failed");
        }
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("token");
    }

    useEffect(() => {
        if (token && !user) fetchMe();
    }, [token]);

    return (
        <UserContext.Provider value={{ token, user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}