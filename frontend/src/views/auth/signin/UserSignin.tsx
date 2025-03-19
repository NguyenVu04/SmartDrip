import { Link, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import AlternativeSigninButtons from "../components/AlternativeSigninButtons";
import { Button, ButtonText, Center, Divider, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { useUtility } from "@/src/context/utiliity";

export default function UserSignin() {
    const router = useRouter();
    const { pushSuccess, pushError } = useUtility();

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const submit = () => {
        pushSuccess({ title: "Sign in successful!" });
        router.push("/user/dashboard");
    }

    return (
        <ScrollView className="bg-background-0">
            <Center className="py-4 gap-4">
                <BigLogo />
                
                <Heading className="text-2xl">Welcome back!</Heading>

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

                    <HStack className="flex justify-end">
                        <Link href="/forgot-password" className="underline text-primary-500">Forgot password?</Link>
                    </HStack>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={submit}>
                        <ButtonText>Sign in</ButtonText>
                    </Button>

                    <HStack className="items-center gap-4">
                        <Divider className="flex-1" />
                            <Text>OR</Text>
                        <Divider className="flex-1" />
                    </HStack>

                    <AlternativeSigninButtons />
                    
                    <HStack className="justify-center gap-2 items-center">
                        <Text>Don't have an account?</Text>
                        <Link href="/sign-up" replace className="underline text-primary-500">Sign up</Link>
                    </HStack>

                </VStack>
            </Center>
        </ScrollView>
    )
}