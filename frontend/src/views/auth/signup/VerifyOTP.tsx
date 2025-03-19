import { ScrollView } from "react-native";
import { Button, ButtonText, Center, Divider, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import {  RectangleEllipsis } from "lucide-react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useUtility } from "@/src/context/utiliity";

export default function SignupVerifyOTP() {
    const router = useRouter()
    const { pushSuccess, pushError } = useUtility();

    const submit = () => {
        pushSuccess({title: "Sign up successful"});
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
                                <Icon as={RectangleEllipsis} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField keyboardType="number-pad" placeholder="OTP" />
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