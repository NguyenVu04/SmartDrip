import { ScrollView, View } from "react-native";
import { Button, ButtonText } from "@/src/components/ui/button";
import { VStack } from "../components/ui/vstack";
import { useRouter } from "expo-router";
import { BigLogo } from "../components/custom";
import { Heading } from "../components/ui";


export default function Index() {
    const router = useRouter();

    return (
        <ScrollView className="bg-white">        
            <View className="flex-1 justify-start items-center py-4 gap-4">
                <VStack className="w-10/12 gap-8 pt-10 items-center">
                    <BigLogo />

                    <Heading className="text-2xl">Welcome to Smart Drip!</Heading>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => router.push("/sign-in/admin")}>
                        <ButtonText>Sign in admin</ButtonText>
                    </Button>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => router.push("/sign-in/user")}>
                        <ButtonText>Sign in user</ButtonText>
                    </Button>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => router.push("/sign-up")}>
                        <ButtonText>Sign up</ButtonText>
                    </Button>
                </VStack>

            </View>
        </ScrollView>
    )
}