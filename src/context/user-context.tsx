import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import type { IRegUser } from "../shared/types";
import { ILogUser } from "../shared/types/user";


interface IUserContext {
    token: string
    user: IRegUser | null
    registration: (userData: IRegUser) => Promise<void | string>
    login: (userData: ILogUser) => Promise<void | string>
    setUserFunction: (user: IRegUser | null) => Promise<void>
}

export const UserContext = createContext<IUserContext | null>(null)

export function useUserContext() {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("Context was not definded, Try again please")
    }

    return context
}

interface UserContextProviderProps {
    children: ReactNode
}

export function UserContextProvider(props: UserContextProviderProps) {
    const { children } = props

    const [token, setToken] = useState<string>("")
    const [user, setUser] = useState<IRegUser | null>(null)
    const setUserFunction = async (user: IRegUser | null) => setUser(user)
    
    useEffect(() => {
        fetchMe();
    }, [token]);
    async function login(userData: ILogUser) {
        try {
            const response = await fetch(`http://localhost:8000/users/login`, {
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
        const storedToken = localStorage.getItem("token");
        
        if (!storedToken || storedToken === "undefined") return;

        try {
            const response = await fetch(`http://localhost:8000/users/me`, {
                headers: {
                    Authorization: `Bearer ${storedToken.replace(/"/g, '')}` 
                },
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setUser(result);
            } else {
                localStorage.removeItem("token");
                setUser(null);
            }
        } catch {
            console.error("Auth sync failed");
        }
    }
    async function registration(userData: IRegUser) {
        try {
            const response = await fetch("http://localhost:8000/users/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })

            const result = await response.json()

            if (response.status === 409) {
                return result.message
            }

            setToken(result.token)
            localStorage.setItem("token", result.token)
        } catch {
            return "Unknown error! Try again later."
        }
    }

    return (
        <UserContext value={{ token, user, registration, login, setUserFunction }}>
            { children }
        </UserContext>
    );
}
