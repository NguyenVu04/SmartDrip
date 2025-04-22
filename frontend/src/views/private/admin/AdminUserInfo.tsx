import ShadowBox from "@/src/components/custom/ShadowBox";
import { Avatar, AvatarFallbackText, Box, Button, Heading, HStack, Input, InputField, VStack } from "@/src/components/ui";
import { useUtility } from "@/src/context/utiliity";
import { interopIcons } from "@/src/utils/nativewind";
import { Mail, PenLine, Phone, User, CircleX, CircleCheck, IdCard } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { MQTTService, UserService } from "@/src/lib/api";

interface AdminUserInfoProps {
    user: UserInfo;
    userInfoList: UserInfo[];
    setUserInfoList: React.Dispatch<React.SetStateAction<UserInfo[]>>;
}

const AdminUserInfo: React.FC<AdminUserInfoProps> = ({user, userInfoList, setUserInfoList}) => {
    const { pushSuccess, pushError, pushAlertDialog, pushWarning } = useUtility();

    const [aioKey, setAioKey] = useState<string>("");
    const [aioUsername, setAioUsername] = useState<string>("");
    const [pumpFeed, setPumpFeed] = useState<string>("");
    const [temperatureFeed, setTemperatureFeed] = useState<string>("");
    const [moistureFeed, setMoistureFeed] = useState<string>("");
    const [humidityFeed, setHumidityFeed] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmitMQTT = (userId: string) => {

        if (!aioKey || !aioUsername || !pumpFeed || !temperatureFeed || !moistureFeed || !humidityFeed) {
            pushWarning({ message: "Please fill all fields", title: "Warning" });
            return;
        }

        setIsSubmitting(true);

        const mqtt = new MQTTService();
        mqtt.createMQTT({
            userId,
            aioKey,
            aioUsername,
            pumpFeed,
            temperatureFeed,
            moistureFeed,
            humidityFeed
        }).then((res) => {
            setIsSubmitting(false);
            if (!res.success) {
                pushError({ message: res.message, title: "Error" });
                return;
            }
            pushSuccess({ message: "MQTT configuration created successfully", title: "Success" });
        }).catch((err) => {
            setIsSubmitting(false);
            pushError({ message: err.message, title: "Error" });
        })

        setAioKey("");
        setAioUsername("");
        setPumpFeed("");
        setTemperatureFeed("");
        setMoistureFeed("");
        setHumidityFeed("");
    }

    const deleteUser = (userId: string) => {
        const del = () => {
            const account = new UserService();
            account.deleteUser(userId).then((res) => {
                if (!res.success) {
                    pushError({ message: res.message, title: "Error" });
                    return;
                }
                setUserInfoList(userInfoList.filter(user => user._id !== userId));
                pushSuccess({ message: "User deleted successfully", title: "Success" });
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
                <InputField placeholder="Adafruit Key" value={aioKey} onChangeText={setAioKey}></InputField>
                <PenLine size={16} className="text-primary-500 mr-3" />
            </Input>
            <Input>
                <InputField placeholder="Adafruit Username" value={aioUsername} onChangeText={setAioUsername}></InputField>
                <PenLine size={16} className="text-primary-500 mr-3" />
            </Input>
            <Input>
                <InputField placeholder="Pump Feed" value={pumpFeed} onChangeText={setPumpFeed}></InputField>
                <PenLine size={16} className="text-primary-500 mr-3" />
            </Input>
            <Input>
                <InputField placeholder="Temperature Feed" value={temperatureFeed} onChangeText={setTemperatureFeed}></InputField>
                <PenLine size={16} className="text-primary-500 mr-3" />
            </Input>
            <Input>
                <InputField placeholder="Moisture Feed" value={moistureFeed} onChangeText={setMoistureFeed}></InputField>
                <PenLine size={16} className="text-primary-500 mr-3" />
            </Input>
            <Input>
                <InputField placeholder="Humidity Feed" value={humidityFeed} onChangeText={setHumidityFeed}></InputField>
                <PenLine size={16} className="text-primary-500 mr-3" />
            </Input>
            <HStack>
                <Button size="xs" action="positive" onPress={() => handleSubmitMQTT(user._id)} disabled={isSubmitting} className="ml-auto"><Text className="text-white">Update</Text></Button>
            </HStack>
            <HStack>
                <Button size="xs" action="negative" onPress={() => deleteUser(user._id)} className="ml-auto"><Text className="text-white">Delete</Text></Button>
            </HStack>
        </ShadowBox>
    );
}

export default AdminUserInfo;