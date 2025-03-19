import { createContext, ReactNode, useContext } from "react"


type AuthContextType = {}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}

type Props = {
    children: ReactNode
}

export default function AuthProvider({ children }: Props) {

    const value = {}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}