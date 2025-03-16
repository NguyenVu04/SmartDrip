import { ScrollView } from "react-native";
import { Button, ButtonText, Center, FormControl, Heading, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import {  RectangleEllipsis } from "lucide-react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUtility } from "@/src/context/utiliity";

export default function ForgotPasswordVerifyOTP() {
    const router = useRouter()
    const { pushSuccess, pushError } = useUtility();

    const submit = () => {
        pushSuccess({title: "OTP verified successfully"})
        router.push("/forgot-password/reset-password")
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
                                <Icon as={RectangleEllipsis} size="lg" />
                            </InputSlot>
                            <InputField keyboardType="number-pad" placeholder="OTP" />
                        </Input>
                    </FormControl>

                    <Text></Text>

                    <Button onPress={submit} size="xl" className="w-full rounded-lg bg-primary-500">
                        <ButtonText>Confirm</ButtonText>
                    </Button>

                </VStack>
            </Center>
        </ScrollView>
    )
}