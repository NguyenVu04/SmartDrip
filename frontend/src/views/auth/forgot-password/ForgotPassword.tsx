import { ScrollView } from "react-native";
import { Button, ButtonText, Center, Divider, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import { Phone } from "lucide-react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useUtility } from "@/src/context/utiliity";

export default function ForgotPassword() {
    const router = useRouter()
    const { pushSuccess, pushError } = useUtility();

    const submit = () => {
        pushSuccess({title: "OTP sent", message: "We have sent an OTP to your phone number."})
        router.push('/forgot-password/verify-otp')
    }

    return (
        <ScrollView className="bg-background-0">
            <Center className="py-4 gap-4">
                <BigLogo />
                
                <Heading className="text-2xl">Forgot password</Heading>

                <VStack className="w-10/12 gap-4 py-4">
                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Phone} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField keyboardType="number-pad" placeholder="Enter phone number" />
                        </Input>
                    </FormControl>

                    <Text></Text>

                    <Button onPress={submit} size="xl" className="w-full rounded-lg bg-primary-500">
                        <ButtonText>Continue</ButtonText>
                    </Button>

                    <HStack className="items-center gap-4">
                        <Divider className="flex-1" />
                            <Text>OR</Text>
                        <Divider className="flex-1" />
                    </HStack>

                    <Center>
                        <Link href="/" className="text-primary-500 underline">Back to sign in</Link>
                    </Center>

                </VStack>
            </Center>
        </ScrollView>
    )
}