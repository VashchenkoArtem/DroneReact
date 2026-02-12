import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import type { IRegUser } from "../shared/types";


interface IUserContext {
    token: string
    user: IRegUser | null
    registration: (userData: IRegUser) => Promise<void | string>
}

const UserContext = createContext<IUserContext | null>(null)

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
            localStorage.setItem("Token", result.token)
        } catch {
            return "Unknown error! Try again later."
        }
    }

    return (
        <UserContext value={{ token, user, registration }}>
            { children }
        </UserContext>
    );
}
