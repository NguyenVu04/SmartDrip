import { Link, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import AlternativeSigninButtons from "../components/AlternativeSigninButtons";
import { Button, ButtonText, Center, Divider, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { useUtility } from "@/src/context/utiliity";
import { AuthService } from "@/src/lib/api";

export default function UserSignin() {
    const router = useRouter();
    const { pushSuccess, pushError, pushWarning } = useUtility();

    const unimplemented = () => {
        pushWarning({
            title: "Unimplemented feature",
        })
    }

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [signinPayload, setSigninPayload] = useState<LoginPayload>({ username: "", password: "" });

    const submit = async () => {
        if (!signinPayload.username || !signinPayload.password) {
            pushError({ title: "Please fill in all fields!" });
            return;
        }

        const auth = new AuthService();
        const res = await auth.login(signinPayload);
        if (!res.success) {
            pushError({ title: "Error", message: res.message });
            return;
        }
        pushSuccess({ title: "Sign in successful!" });
        router.push("/user/dashboard");
    }

    const onChangePayload = (key: string, value: string) => {
        setSigninPayload((prev) => ({ ...prev, [key]: value }));
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
                            <InputField placeholder="Username or Email" value={signinPayload.username} onChangeText={(text) => onChangePayload("username", text)} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Lock} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField type={isShowPassword ? "text" : "password"} placeholder="Password" value={signinPayload.password} onChangeText={(text) => onChangePayload("password", text)} />
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