import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { UserService } from "../lib/api"
import { useRouter } from "expo-router"
import { getFromStorage } from "../lib/utils"


type AuthContextType = {
    userInfo: UserInfo | null;
    isLoading: boolean;
}

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
    const router = useRouter()
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
            const fetchUserInfo = async () => {
                const account = new UserService();
                const id = getFromStorage("userId");
                if (!id) {
                    router.push("/")
                    setIsLoading(false)
                    return;
                }
                const res = await account.getUserById(id)
                if (!res.success) {
                    router.push("/")
                    setIsLoading(false)
                    return;
                }
                setUserInfo(res.data.results[0]);
                setIsLoading(false)
            }
            fetchUserInfo();
        }, [])

    const value = {
        userInfo,
        isLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}