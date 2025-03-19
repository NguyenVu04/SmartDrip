import { ScrollView } from "react-native";
import AlternativeSigninButtons from "../components/AlternativeSigninButtons";
import { Button, ButtonText, Center, Divider, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import { Eye, EyeClosed, Lock, LockKeyhole, Mail } from "lucide-react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useUtility } from "@/src/context/utiliity";

export default function UserSignup() {
    const router = useRouter();
    const { pushSuccess, pushError } = useUtility();

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

    const submit = () => {
        pushSuccess({title: "Please verify your email"});
        router.push("/sign-up/verify-otp");
    }

    return (
        <ScrollView className="bg-background-0">
            <Center className="py-4 gap-4">
                <BigLogo />
                
                <Heading className="text-2xl">Sign up</Heading>

                <VStack className="w-10/12 gap-4 py-4">
                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Mail} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField placeholder="Email" />
                        </Input>
                    </FormControl>

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

                    <Button size="xl" onPress={submit} className="w-full rounded-lg bg-primary-500">
                        <ButtonText>Sign up</ButtonText>
                    </Button>

                    <HStack className="items-center gap-4">
                        <Divider className="flex-1" />
                            <Text>OR</Text>
                        <Divider className="flex-1" />
                    </HStack>

                    <AlternativeSigninButtons />

                    <HStack className="justify-center gap-2 items-center">
                        <Text>Already have an account?</Text>
                        <Link href="/sign-in/user" replace className="underline text-primary-500">Sign in</Link>
                    </HStack>

                </VStack>
            </Center>
        </ScrollView>
    )
}