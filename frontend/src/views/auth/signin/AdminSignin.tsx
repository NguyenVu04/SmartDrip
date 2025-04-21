import { BigLogo } from "@/src/components/custom/Logo";
import { useState } from "react";
import { ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { Eye, EyeClosed, Lock, Mail } from 'lucide-react-native';
import { Button, ButtonText, Center, FormControl, Heading, HStack, Icon, Input, InputField, InputSlot, VStack } from "@/src/components/ui";
import { useUtility } from "@/src/context/utiliity";
import { AuthService } from "@/src/lib/api";



export default function AdminSignin() {
    const router = useRouter();
    const { pushSuccess, pushError } = useUtility();

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
        router.push("/admin/dashboard");
    }

    const onChangePayload = (key: string, value: string) => {
        setSigninPayload((prev) => ({ ...prev, [key]: value }));
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

                </VStack>
            </Center>
        </ScrollView>
    )
}