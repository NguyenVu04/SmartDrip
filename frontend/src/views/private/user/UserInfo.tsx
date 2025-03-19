import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, AvatarFallbackText, Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, HStack, Input, InputField, VStack } from "@/src/components/ui";
import { interopIcons } from "@/src/utils/nativewind";
import { PenLine } from "lucide-react-native";
import { useState } from "react";
import { useRouter } from 'expo-router';

interopIcons([PenLine])

export default function UserInfo() {
    const router = useRouter()

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const userInfo = {
        firstName: "Lam",
        lastName: "Vy",
        phone: "0123456789",
        email: "vy.tranngoclam@gmail.com",
    }

    return (
        <KeyboardAwareScrollView className="bg-background-0 min-h-screen p-4" keyboardShouldPersistTaps="handled" extraScrollHeight={100} enableOnAndroid={true} resetScrollToCoords={{ x: 0, y: 0 }}>
            <VStack className="items-center gap-8">
                <Avatar size="2xl" className="size-20 border-primary-500">
                    <AvatarFallbackText>Lam Vy</AvatarFallbackText>
                </Avatar>

                <VStack className="w-full gap-4 px-4">
                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>First name</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="lg" className="w-full rounded-lg" isDisabled={!isEditing} >
                            <InputField placeholder="First name" value={userInfo.firstName} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Last name</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="lg" className="w-full rounded-lg" isDisabled={!isEditing} >
                            <InputField placeholder="Last name" value={userInfo.lastName} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Phone</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="lg" className="w-full rounded-lg" isDisabled={!isEditing} >
                            <InputField placeholder="Phone" value={userInfo.phone} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="lg" className="w-full rounded-lg" isDisabled={!isEditing} >
                            <InputField placeholder="Email" value={userInfo.email} />
                        </Input>
                    </FormControl>

                    <HStack className="mt-4">
                        {!isEditing && <Button onTouchStart={() => router.push("/user/password-change")} size="sm" className="rounded-lg">
                            <ButtonText>Change password</ButtonText>
                        </Button>}
                        <Button size="sm" onTouchStart={() => setIsEditing(!isEditing)} className="rounded-lg ml-auto">
                            <ButtonText>{isEditing ? "Save" : "Edit"}</ButtonText>
                            <PenLine size={14} className="text-white" />
                        </Button>
                    </HStack>
                </VStack>

                
            </VStack>
        </KeyboardAwareScrollView>
    )
}