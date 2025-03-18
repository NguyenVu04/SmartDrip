import ShadowBox from "@/src/components/custom/ShadowBox";
import { Box, Button, ButtonText, Divider, Heading, HStack, VStack } from "@/src/components/ui";
import { interopIcons } from "@/src/utils/nativewind";
import { CalendarDays, Droplet, Leaf, Sun, Thermometer } from "lucide-react-native";
import { ScrollView, Text } from "react-native";

interopIcons([Sun, Thermometer, Droplet, Leaf, CalendarDays]);

export default function WateringHistory() {

    const history = Array.from({ length: 10 }, (_, index) => {
        const date = new Date()
        return {
            id: index,
            date: date.toDateString(),
            time: date.toLocaleTimeString(),
            light: 123,
            thermometer: 32,
            humidity: 56,
            soilMoisture: 30,
        }
    })

    return (
        <ScrollView className="bg-background-0 h-screen p-4">
            <VStack className="flex-1 items-center gap-4 mb-20">
                <Heading className="text-primary-500 text-2xl">Watering history</Heading>
                <VStack className="w-full h-fit bg-background-0 rounded-xl border border-slate-200 shadow-md shadow-slate-200 p-4 gap-2">
                    <Heading className="font-medium text-primary-500">Today</Heading>
                    <VStack className="gap-4">
                        {history.map(plant => (
                            <ShadowBox key={plant.id} className="w-full">
                                <HStack className="flex-1 items-center p-4 gap-2">
                                    <CalendarDays size={24} className="text-primary-500" />
                                    <VStack className="mr-auto">
                                        <Text className="text-xs">{plant.date}</Text>
                                        <Text className="text-xs">{plant.time}</Text>
                                    </VStack>

                                    
                                    <VStack className="min-w-14">
                                        <HStack className="items-center justify-end gap-1">
                                            <Text className="text-2xs text-slate-500">{plant.light}</Text>
                                            <Sun className="text-primary-500" size={16} />
                                        </HStack>
                                        <HStack className="items-center justify-end gap-1">
                                            <Text className="text-2xs text-slate-500">{plant.thermometer}</Text>
                                            <Thermometer className="text-primary-500" size={16} />
                                        </HStack>
                                    </VStack>
                                    <Divider orientation="vertical" />
                                    <VStack className="min-w-14">
                                        <HStack className="items-center justify-end gap-1">
                                            <Text className="text-2xs text-slate-500">{plant.humidity}</Text>
                                            <Droplet className="text-primary-500" size={16} />
                                        </HStack>
                                        <HStack className="items-center justify-end gap-1">
                                            <Text className="text-2xs text-slate-500">{plant.soilMoisture}</Text>
                                            <Leaf className="text-primary-500" size={16} />
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </ShadowBox>
                        ))}
                    </VStack>
                </VStack>

                <VStack className="w-full h-fit bg-background-0 rounded-xl border border-slate-200 shadow-md shadow-slate-200 p-4 gap-2">
                    <Heading className="font-medium text-primary-500">Yesterday</Heading>
                    <VStack className="gap-4">
                        {history.map(plant => (
                            <ShadowBox key={plant.id} className="w-full">
                                <HStack className="flex-1 items-center p-4 gap-2">
                                    <CalendarDays size={24} className="text-primary-500" />
                                    <VStack className="mr-auto">
                                        <Text className="text-xs">{plant.date}</Text>
                                        <Text className="text-xs">{plant.time}</Text>
                                    </VStack>

                                    
                                    <VStack className="min-w-14">
                                        <HStack className="items-center justify-end gap-1">
                                            <Text className="text-2xs text-slate-500">{plant.light}</Text>
                                            <Sun className="text-primary-500" size={16} />
                                        </HStack>
                                        <HStack className="items-center justify-end gap-1">
                                            <Text className="text-2xs text-slate-500">{plant.thermometer}</Text>
                                            <Thermometer className="text-primary-500" size={16} />
                                        </HStack>
                                    </VStack>
                                    <Divider orientation="vertical" />
                                    <VStack className="min-w-14">
                                        <HStack className="items-center justify-end gap-1">
                                            <Text className="text-2xs text-slate-500">{plant.humidity}</Text>
                                            <Droplet className="text-primary-500" size={16} />
                                        </HStack>
                                        <HStack className="items-center justify-end gap-1">
                                            <Text className="text-2xs text-slate-500">{plant.soilMoisture}</Text>
                                            <Leaf className="text-primary-500" size={16} />
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </ShadowBox>
                        ))}
                    </VStack>
                </VStack>

                <Button className="rounded-full">
                    <ButtonText>Load more</ButtonText>
                </Button>
            </VStack>
        </ScrollView>
    )
}