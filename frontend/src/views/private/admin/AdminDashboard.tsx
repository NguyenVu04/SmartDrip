import ShadowBox from "@/src/components/custom/ShadowBox";
import { Avatar, AvatarFallbackText, Box, Button, ButtonText, Heading, HStack, Input, InputField, VStack } from "@/src/components/ui";
import { interopIcons } from "@/src/utils/nativewind";
import { Mail, PenLine, Phone, User } from "lucide-react-native";
import { ScrollView, Text } from "react-native";

interopIcons([User, Mail, Phone])

export default function AdminDashboard() {

    const accountList = Array.from({ length: 10 }, (_, index) => {
        return {
            id: index,
            fullName: `Tran Ngoc Lam Vy`,
            email: `user${index + 1}@gmail.com`,
            phone: `+84 123 456 789`,
            adafruitKey: "123456789",
        }
    })

    return (
        <ScrollView className="bg-background-0 h-screen p-4">
            <VStack className="items-center gap-4">
                <Heading className="text-primary-500">Account management</Heading>
                <Box className="w-full h-fit bg-background-0 rounded-xl border border-slate-200 shadow-md shadow-slate-200 p-4">
                    <VStack className="gap-4">
                        {accountList.map(account => {
                            return (
                                <ShadowBox key={account.id} className="flex-col gap-2 p-4">
                                <HStack className="gap-4 items-center">
                                    <Avatar>
                                        <AvatarFallbackText>{account.fullName}</AvatarFallbackText>
                                    </Avatar>
                                    <VStack className="gap-1">
                                        <HStack className="items-center gap-1">
                                            <User size={12} className="text-primary-500" />
                                            <Text className="text-xs">{account.fullName}</Text>
                                        </HStack>
                                        <HStack className="items-center gap-1">
                                            <Mail size={12} className="text-primary-500" />
                                            <Text className="text-xs">{account.email}</Text>
                                        </HStack>
                                        <HStack className="items-center gap-1">
                                            <Phone size={12} className="text-primary-500" />
                                            <Text className="text-xs">{account.phone}</Text>
                                        </HStack>
                                    </VStack>

                                    <Button size="xs" className="rounded-md ml-auto">
                                        <ButtonText>Detail</ButtonText>
                                    </Button>
                                </HStack>
                                <Input>
                                    <InputField placeholder="Adafruit key"></InputField>
                                    <PenLine size={16} className="text-primary-500 mr-3" />
                                </Input>
                                </ShadowBox>
                            )
                        })}
                    </VStack>
                </Box>
            </VStack>
        </ScrollView>
    )
}