import { ScrollView } from "react-native";
import { Button, ButtonText, Center, Divider, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import {  Mail, RectangleEllipsis } from "lucide-react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useUtility } from "@/src/context/utiliity";
import { AuthService } from "@/src/lib/api";

export default function SignupVerifyOTPEmail() {
    const router = useRouter()
    const { pushSuccess, pushError } = useUtility();
    
    const [otp, setOtp] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    
    const submit = async () => {
        if (!otp) {
            pushError({ title: "Please fill in all fields!" });
            return;
        }
        const auth = new AuthService();
        const res = await auth.verifyOTPEmail(email, otp);
        if (!res.success) {
            pushError({ title: "Error", message: res.message });
            return;
        }
        pushSuccess({ title: "OTP verified successfully!" });
        router.push("/sign-in/user")
    }

    return (
        <ScrollView className="bg-background-0">
            <Center className="py-4 gap-4">
                <BigLogo />
                
                <Heading className="text-2xl">Verify OTP</Heading>

                <VStack className="w-10/12 gap-4 py-4">
                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Mail} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField placeholder="Email" onChangeText={(text) => setEmail(text)} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={RectangleEllipsis} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField keyboardType="number-pad" placeholder="OTP" onChangeText={(text) => setOtp(text)}  />
                        </Input>
                    </FormControl>

                    <Text></Text>

                    <Button onPress={submit} size="xl" className="w-full rounded-lg bg-primary-500">
                        <ButtonText>Confirm</ButtonText>
                    </Button>

                    <HStack className="items-center gap-4">
                        <Divider className="flex-1" />
                            <Text>OR</Text>
                        <Divider className="flex-1" />
                    </HStack>

                    <Center>
                        <Link href="/sign-up" className="text-primary-500 underline">Back to sign up</Link>
                    </Center>

                </VStack>
            </Center>
        </ScrollView>
    )
}