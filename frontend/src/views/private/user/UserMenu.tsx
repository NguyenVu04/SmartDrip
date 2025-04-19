import { Avatar, AvatarFallbackText, Button, ButtonText, VStack } from "@/src/components/ui";
import { useUtility } from "@/src/context/utiliity";
import { useRouter } from "expo-router";
import { ScrollView, Text } from "react-native";


export default function UserMenu() {
    const router = useRouter();
    const { pushAlertDialog, pushWarning } = useUtility();

    const unimplemented = () => {
        pushWarning({
            title: "Unimplemented feature",
        })
    }

    const logout = () => {
        pushAlertDialog({
            title: "Sign out",
            message: "Are you sure you want to sign out?",
            onConfirm: () => {
                router.push("/");
            },
            onConfirmText: "Sign out",
        })
    }

    return (
        <ScrollView className="bg-background-0 h-screen p-4">
            <VStack className="items-center gap-8">
                <Avatar size="2xl" className="size-20 border-primary-500">
                    <AvatarFallbackText>Lam Vy</AvatarFallbackText>
                </Avatar>

                <VStack className="w-full gap-4 px-4">
                    <Button size="lg" variant="outline" action="default" onTouchStart={() => router.push("/user/info")} className="rounded-xl h-14 border-2">
                        <ButtonText className="text-xl text-slate-600">My account</ButtonText>
                    </Button>
                    <Button size="lg" variant="outline" action="default" onPress={unimplemented} className="rounded-xl h-14 border-2">
                        <ButtonText className="text-xl text-slate-600">Warnings and notifications</ButtonText>
                    </Button>
                    <Button size="lg" variant="outline" action="default" onPress={unimplemented} className="rounded-xl h-14 border-2">
                        <ButtonText className="text-xl text-slate-600">Language</ButtonText>
                    </Button>

                    <Button size="lg" variant="outline" action="default" onPress={unimplemented} className="rounded-xl h-14 border-2">
                        <ButtonText className="text-xl text-slate-600">Need help?</ButtonText>
                    </Button>
                    <Button size="lg" variant="outline" action="negative" onPress={logout} className="rounded-xl h-14 border-2">
                        <Text className="text-xl font-normal text-error-500">Sign out</Text>
                    </Button>
                </VStack>

                
            </VStack>
        </ScrollView>
    )
}