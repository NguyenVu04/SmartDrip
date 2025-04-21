import AuthProvider from "@/src/context/auth";
import { Stack } from "expo-router";


export default function Layout() {
    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
    )
}