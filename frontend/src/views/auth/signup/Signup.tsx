import { ScrollView } from "react-native";
import AlternativeSigninButtons from "../components/AlternativeSigninButtons";
import { Button, ButtonText, Center, Divider, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, Text, VStack } from "@/src/components/ui";
import { BigLogo } from "@/src/components/custom";
import { Eye, EyeClosed, Lock, LockKeyhole, Mail } from "lucide-react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useUtility } from "@/src/context/utiliity";
import { AuthService } from "@/src/lib/api";

export default function UserSignup() {
    const router = useRouter();
    const { pushSuccess, pushError } = useUtility();

    const [signupPayload, setSignupPayload] = useState<{email: string, password: string, confirmPassword: string}>({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false);

    const submit = async () => {
        if (!signupPayload.email || !signupPayload.password || !signupPayload.confirmPassword) {
            pushError({ title: "Please fill in all fields!" });
            return;
        }
        if (signupPayload.password !== signupPayload.confirmPassword) {
            pushError({ title: "Passwords do not match!" });
            return;
        }

        const auth = new AuthService();

        const res = await auth.signup({email: signupPayload.email, password: signupPayload.password});
        if (!res.success) {
            pushError({ title: "Error", message: res.message });
            return;
        }

        pushSuccess({title: "Please verify your email"});
        router.push("/sign-up/verify-otp");
    }

    const onChangePayload = (key: string, value: string) => {
        setSignupPayload((prev) => ({ ...prev, [key]: value }));
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
                            <InputField placeholder="Email" value={signupPayload.email} onChangeText={(text) => onChangePayload("email", text)} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Lock} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField type={isShowPassword ? "text" : "password"} placeholder="Password" value={signupPayload.password} onChangeText={(text) => onChangePayload("password", text)} />
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
                            <InputField type={isShowConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={signupPayload.confirmPassword} onChangeText={(text) => onChangePayload("confirmPassword", text)} />
                            <InputSlot onTouchStart={() => setIsShowConfirmPassword(!isShowConfirmPassword)} >
                                {!isShowConfirmPassword ? <Icon as={Eye} size="lg" className="text-primary-500" /> : <Icon as={EyeClosed} size="lg" className="text-primary-500" />}
                            </InputSlot>
                        </Input>
                    </FormControl>

                    <HStack className="flex justify-end">
                        <Link href="/sign-up/verify-otp-email" className="underline text-primary-500">Verify OTP?</Link>
                    </HStack>

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