import { BigLogo } from "@/src/components/custom/Logo";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Link } from "expo-router";
import { Eye, EyeClosed, Lock, Mail } from 'lucide-react-native';
import { Button, ButtonText, Center, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, VStack } from "@/src/components/ui";
import { useUtility } from "@/src/context/utiliity";



export default function AdminSignin() {
    const { pushSuccess, pushError } = useUtility();

    const [signinPayload, setSigninPayload] = useState<SigninPayload>({ email: "", password: "" });
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const submit = () => {
        pushSuccess({ title: "Sign in successful!" });
    }

    return (
        <ScrollView className="bg-background-0">
            <Center className="py-4 gap-4">
                <BigLogo />

                <Heading className="text-2xl">Welcome back admin!</Heading>

                <VStack className="w-10/12 gap-4 py-4">
                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Mail} size="lg" />
                            </InputSlot>
                            <InputField placeholder="Email" />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Lock} size="lg" />
                            </InputSlot>
                            <InputField type={isShowPassword ? "text" : "password"} placeholder="Password" />
                            <InputSlot onTouchStart={() => setIsShowPassword(!isShowPassword)} >
                                {!isShowPassword ? <Icon as={Eye} size="lg" /> : <Icon as={EyeClosed} size="lg" />}
                            </InputSlot>
                        </Input>
                    </FormControl>

                    <HStack className="flex justify-end">
                        <Link href="/forgot-password" className="underline text-primary-500">Forgot password?</Link>
                    </HStack>

                    <Button size="xl" className="w-full rounded-lg bg-primary-500" onPress={submit}>
                        <ButtonText>Sign in</ButtonText>
                    </Button>

                </VStack>
            </Center>
        </ScrollView>
    )
}