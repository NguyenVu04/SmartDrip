import { ScrollView, View } from "react-native";
import { Button, ButtonText } from "@/src/components/ui/button";
import { VStack } from "../components/ui/vstack";
import { useRouter } from "expo-router";
import { useUtility } from "../context/utiliity";


export default function Index() {
    const router = useRouter();

    const { pushSuccess, pushError, pushAlertDialog } = useUtility();

    return (
        <ScrollView className="bg-white">        
            <View className="flex-1 justify-start items-center py-4 gap-4">
                <VStack className="w-10/12 gap-8 pt-10">
                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => router.push("/sign-in/admin")}>
                        <ButtonText>Sign in admin</ButtonText>
                    </Button>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => router.push("/sign-in/user")}>
                        <ButtonText>Sign in user</ButtonText>
                    </Button>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => router.push("/sign-up")}>
                        <ButtonText>Sign up</ButtonText>
                    </Button>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => router.push("/forgot-password")}>
                        <ButtonText>Forgot password</ButtonText>
                    </Button>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => {pushSuccess({title: "Success", message: "This is a success notification"})}}>
                        <ButtonText>Push success notification</ButtonText>
                    </Button>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => {pushError({title: "Error", message: "This is an error notification"})}}> 
                        <ButtonText>Push error notification</ButtonText>
                    </Button>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={() => {pushAlertDialog({title: "Alert", message: "This is an alert", onConfirmText: "OK", onConfirm: () => {pushSuccess({title: "Success", message: "This is a success notification"})}})}}> 
                        <ButtonText>Push alert</ButtonText>
                    </Button>
                </VStack>

            </View>
        </ScrollView>
    )
}