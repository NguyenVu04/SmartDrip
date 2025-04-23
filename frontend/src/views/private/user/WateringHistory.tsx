import ShadowBox from "@/src/components/custom/ShadowBox";
import { Box, Button, ButtonText, Divider, Heading, HStack, VStack } from "@/src/components/ui";
import { API_URL } from "@/src/lib/api";
import { getFromStorage } from "@/src/lib/utils";
import { interopIcons } from "@/src/utils/nativewind";
import axios from "axios";
import { CalendarDays, Droplet, Leaf, Sun, Thermometer } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

interopIcons([Sun, Thermometer, Droplet, Leaf, CalendarDays]);

type History = {
    isOn: boolean;
    timestamp: number;
}

export default function WateringHistory() {

    const [historyData, setHistory] = useState<History[]>([])

    useEffect(() => {
        const fetchHistory = async () => {
            const url = `http://localhost:8000/pump/all/`+ getFromStorage("userId")

            try {
                const res = await axios.get(`${url}`)
                const data = res.data.pumps
                setHistory(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchHistory()
    }, [])

    return (
        <ScrollView className="bg-background-0 h-screen p-4">
            <VStack className="flex-1 items-center gap-4 mb-20">
                <Heading className="text-primary-500 text-2xl">Watering history</Heading>
                <VStack className="w-full h-fit bg-background-0 rounded-xl border border-slate-200 shadow-md shadow-slate-200 p-4 gap-2">
                    <VStack className="gap-4">
                        {historyData.map(history => {
                        const date = new Date(history.timestamp * 1000)
                        const day = date.toLocaleDateString("en", { weekday: "long" })
                        const time = date.toLocaleTimeString("vi", { hour: "2-digit", minute: "2-digit" })
                        return (
                            <ShadowBox key={history.timestamp} className="w-full">
                                <HStack className="flex-1 items-center p-4 gap-2">
                                    <CalendarDays size={24} className="text-primary-500" />
                                    <VStack className="mr-auto">
                                        <Text className="text-xs">{day}</Text>
                                        <Text className="text-xs">{time}</Text>
                                    </VStack>

                                    
                                    <Heading>
                                        {history.isOn ? "On" : "Off"}
                                    </Heading>
                                </HStack>
                            </ShadowBox>
                        )})}
                    </VStack>
                </VStack>
            </VStack>
        </ScrollView>
    )
}