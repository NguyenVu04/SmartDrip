import ShadowBox from "@/src/components/custom/ShadowBox";
import { Avatar, AvatarFallbackText, Box, Button, Heading, HStack, Input, InputField, VStack } from "@/src/components/ui";
import { useUtility } from "@/src/context/utiliity";
import { interopIcons } from "@/src/utils/nativewind";
import { Mail, PenLine, Phone, User, CircleX, CircleCheck, IdCard } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { UserService } from "@/src/lib/api";

interopIcons([User, Mail, Phone])

export default function AdminDashboard() {
    const { pushSuccess, pushError, pushAlertDialog, pushWarning } = useUtility();

    const unimplemented = () => {
        pushWarning({
            title: "Unimplemented feature",
        })
    }

    const [userInfoList, setUserInfoList] = useState<UserInfo[]>([]);

    useEffect(() => {
        const fetchUserInfoList = async () => {
            const account = new UserService();
            const res = await account.getAllUsers({current: 1, pageSize: 10, sort: "createdAt"});
            if (!res.success) {
                pushError({message: res.message, title: "Error"});
                return;
            }
            setUserInfoList(res.data.results);
        }
        fetchUserInfoList();
    }, [])

    const deleteUser = (userId: string) => {
        const del = () => {  
            const account = new UserService();
            account.deleteUser(userId).then((res) => {
                if (!res.success) {
                    pushError({message: res.message, title: "Error"});
                    return;
                }
                setUserInfoList(userInfoList.filter(user => user._id !== userId));
                pushSuccess({message: "User deleted successfully", title: "Success"});
            })
        }
        pushAlertDialog({
            title: "Delete user",
            message: "Are you sure you want to delete this user?",
            onConfirmText: "Delete",
            onConfirm: del,
        })
    }

    return (
        <ScrollView className="bg-background-0 h-screen p-4">
            <VStack className="items-center gap-4">
                <Heading className="text-primary-500">Account management</Heading>
                <Box className="w-full h-fit bg-background-0 rounded-xl border border-slate-200 shadow-md shadow-slate-200 p-4">
                    <VStack className="gap-4">
                        {userInfoList.map(user => {
                            return (
                                <ShadowBox key={user._id} className="flex-col gap-2 p-4">
                                <HStack className="gap-4 items-center">
                                    <Avatar>
                                        <AvatarFallbackText>{user.codeId}</AvatarFallbackText>
                                    </Avatar>
                                    <HStack className="justify-between items-center w-full">
                                        <VStack className="gap-1">
                                            <HStack className="items-center gap-1">
                                                <Mail size={12} className="text-primary-500" />
                                                <Text className="text-xs">{user.email}</Text>
                                            </HStack>
                                            <HStack className="items-center gap-1">
                                                <User size={12} className="text-primary-500" />
                                                <Text className="text-xs">{user.role}</Text>
                                            </HStack>
                                            <HStack className="items-center gap-1">
                                                <IdCard size={12} className="text-primary-500" />
                                                <Text className="text-xs">{user._id}</Text>
                                            </HStack>
                                        </VStack>

                                        {user.isActive ? <CircleCheck size={20} className="text-green-500" /> : <CircleX size={20} className="text-red-500" />}
                                    </HStack>
                                </HStack>
                                <Input>
                                    <InputField placeholder="Adafruit key" onFocus={unimplemented}></InputField>
                                    <PenLine size={16} className="text-primary-500 mr-3" />
                                </Input>
                                <HStack>
                                    <Button size="xs" action="negative" onPress={() => deleteUser(user._id)} className="ml-auto"><Text className="text-white">Delete</Text></Button>
                                </HStack>
                                </ShadowBox>
                            )
                        })}
                    </VStack>
                </Box>
            </VStack>
        </ScrollView>
    )
}