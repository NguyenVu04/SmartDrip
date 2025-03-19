import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';
import "./global.css";
import UtilityProvider from '../context/utiliity';


export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <GluestackUIProvider>
                <UtilityProvider>
                    <StatusBar style="auto" />
                    <Stack>
                        <Stack.Screen name="index" options={{ title: "Home" }} />
                        <Stack.Screen name="(auth)" options={{ title: "Authentication" }} />
                        <Stack.Screen name="(private)" options={{ headerShown: false }} />
                    </Stack>
                </UtilityProvider>
            </GluestackUIProvider>
        </SafeAreaProvider>
    );
}