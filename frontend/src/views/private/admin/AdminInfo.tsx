import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Avatar, AvatarFallbackText, FormControl, FormControlLabel, FormControlLabelText, Input, InputField, VStack } from "@/src/components/ui";
import { interopIcons } from "@/src/utils/nativewind";
import { PenLine } from "lucide-react-native";
import { useAuth } from '@/src/context/auth';

interopIcons([PenLine])

export default function AdminInfo() {
    const { userInfo, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }
    if (!userInfo) {
        return null;
    }

    return (
        <KeyboardAwareScrollView className="bg-background-0 min-h-screen p-4" keyboardShouldPersistTaps="handled" extraScrollHeight={100} enableOnAndroid={true} resetScrollToCoords={{ x: 0, y: 0 }}>
            <VStack className="items-center gap-8">
                <Avatar size="2xl" className="size-20 border-primary-500">
                    <AvatarFallbackText>{userInfo.email}</AvatarFallbackText>
                </Avatar>

                <VStack className="w-full gap-4 px-4">
                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Email</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="lg" className="w-full rounded-lg" isDisabled={true} >
                            <InputField placeholder="First name" value={userInfo.email} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>ID</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="lg" className="w-full rounded-lg" isDisabled={true} >
                            <InputField placeholder="Email" value={userInfo._id} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Account Type</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="lg" className="w-full rounded-lg" isDisabled={true} >
                            <InputField placeholder="Last name" value={userInfo.accountType} />
                        </Input>
                    </FormControl>

                    <FormControl>
                        <FormControlLabel>
                            <FormControlLabelText>Role</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="outline" size="lg" className="w-full rounded-lg" isDisabled={true} >
                            <InputField placeholder="Phone" value={userInfo.role} />
                        </Input>
                    </FormControl>

                    {/* <HStack className="mt-4">
                        {!isEditing && <Button onTouchStart={() => router.push("/admin/password-change")} size="sm" className="rounded-lg">
                            <ButtonText>Change password</ButtonText>
                        </Button>}
                        <Button size="sm" onTouchStart={() => setIsEditing(!isEditing)} className="rounded-lg ml-auto">
                            <ButtonText>{isEditing ? "Save" : "Edit"}</ButtonText>
                            <PenLine size={14} className="text-white" />
                        </Button>
                    </HStack> */}
                </VStack>

                
            </VStack>
        </KeyboardAwareScrollView>
    )
}