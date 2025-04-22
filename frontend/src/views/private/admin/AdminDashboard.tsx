import ShadowBox from "@/src/components/custom/ShadowBox";
import { Avatar, AvatarFallbackText, Box, Button, Heading, HStack, Input, InputField, VStack } from "@/src/components/ui";
import { useUtility } from "@/src/context/utiliity";
import { interopIcons } from "@/src/utils/nativewind";
import { Mail, PenLine, Phone, User, CircleX, CircleCheck, IdCard } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { MQTTService, UserService } from "@/src/lib/api";
import AdminUserInfo from "./AdminUserInfo";

interopIcons([User, Mail, Phone])

export default function AdminDashboard() {
    const { pushError } = useUtility();

    const [userInfoList, setUserInfoList] = useState<UserInfo[]>([]);

    useEffect(() => {
        const fetchUserInfoList = async () => {
            const account = new UserService();
            const res = await account.getAllUsers({ current: 1, pageSize: 10, sort: "createdAt" });
            if (!res.success) {
                pushError({ message: res.message, title: "Error" });
                return;
            }
            setUserInfoList(res.data.results);
        }
        fetchUserInfoList();
    }, [])

    return (
        <ScrollView className="bg-background-0 h-screen p-4">
            <VStack className="items-center gap-4">
                <Heading className="text-primary-500">Account management</Heading>
                <Box className="w-full h-fit bg-background-0 rounded-xl border border-slate-200 shadow-md shadow-slate-200 p-4">
                    <VStack className="gap-4">
                        {userInfoList.map(user => {
                            return <AdminUserInfo key={user._id} user={user} userInfoList={userInfoList} setUserInfoList={setUserInfoList} />
                        })}
                    </VStack>
                </Box>
            </VStack>
        </ScrollView>
    )
}