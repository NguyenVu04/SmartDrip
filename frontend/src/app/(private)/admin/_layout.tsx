import { Avatar, AvatarBadge, AvatarFallbackText } from '@/src/components/ui';
import { interopIcons } from '@/src/utils/nativewind';
import { Tabs, useRouter } from 'expo-router';
import { House, CircleUserRound, History, Menu, Droplet } from 'lucide-react-native';
  
interopIcons([CircleUserRound, History, Menu, Droplet]);

export default function Layout() {
    const router = useRouter();

    return (
        <Tabs 
            screenOptions={{ 
                tabBarActiveTintColor: '#219E76',
                headerTitle: "",
                headerRight: () => (
                    <Avatar className='w-10 h-10 mr-2' onTouchStart={() => router.push("/admin/info")}>
                        <AvatarFallbackText>Lam Vy</AvatarFallbackText>
                        <AvatarBadge />
                    </Avatar>
                )
        
        }} >
            <Tabs.Screen name="dashboard" options={{ title: 'Home', tabBarIcon: ({ color }) => <House size={24} color={color} /> }} />
            <Tabs.Screen name="menu" options={{ title: 'Menu', headerTitle: "Menu", tabBarIcon: ({ color }) => <Menu size={24} color={color} />, headerRight: () => null }} />
            <Tabs.Screen name="info" options={{ title: 'User info', headerTitle: "My account", href: null, headerRight: () => null }} />
            <Tabs.Screen name="password-change" options={{ title: 'Password changes', headerTitle: "", href: null, headerRight: () => null}} />
        </Tabs>
    )
}