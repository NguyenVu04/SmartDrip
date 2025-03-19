import { ScrollView } from "react-native";
import { Button, ButtonText, Center, FormControl, Heading, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import {  Eye, EyeClosed, Lock, LockKeyhole } from "lucide-react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUtility } from "@/src/context/utiliity";

export default function ResetPassword() {
    const router = useRouter()
    const { pushSuccess, pushError } = useUtility();

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

    const submit = () => {
        pushSuccess({title: "Password changed successfully"})
        router.push("/")
    }

    return (
        <ScrollView className="bg-background-0">
            <Center className="py-4 gap-4">
                <BigLogo />
                
                <Heading className="text-2xl">Change password</Heading>

                <VStack className="w-10/12 gap-4 py-4">
                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Lock} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField type={isShowPassword ? "text" : "password"} placeholder="Password" />
                            <InputSlot onTouchStart={() => setIsShowPassword(!isShowPassword)} >
                                {!isShowPassword ? <Icon as={Eye} size="lg" className="text-primary-500" /> : <Icon as={EyeClosed} size="lg" className="text-primary-500" />}
                            </InputSlot>
                        </Input>
                    </FormControl>

                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={LockKeyhole} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField type={isShowConfirmPassword ? "text" : "password"} placeholder="Confirm Password" />
                            <InputSlot onTouchStart={() => setIsShowConfirmPassword(!isShowConfirmPassword)} >
                                {!isShowConfirmPassword ? <Icon as={Eye} size="lg" className="text-primary-500" /> : <Icon as={EyeClosed} size="lg" className="text-primary-500" />}
                            </InputSlot>
                        </Input>
                    </FormControl>

                    <Text></Text>

                    <Button onPress={submit} size="xl" className="w-full rounded-lg bg-primary-500">
                        <ButtonText>Reset my password</ButtonText>
                    </Button>

                </VStack>
            </Center>
        </ScrollView>
    )
}