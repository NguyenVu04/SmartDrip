import ShadowBox from "@/src/components/custom/ShadowBox";
import { Box, Button, Fab, FabLabel, Heading, HStack, Text, VStack } from "@/src/components/ui";
import { getAPI } from "@/src/lib/api";
import { interopIcons } from "@/src/utils/nativewind";
import { CloudSun, Droplet, Leaf, Moon, PenLine, Plus, Sun, Thermometer } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";

interopIcons([CloudSun, Sun, Moon, Thermometer, Droplet, Leaf, Plus, PenLine]);

export default function UserDashboard() {
    const [apiData, setAPIData] = useState<FarmData>({
        humidity: 1,
        moisture: 1,
        temperature: 1,
    });


    useEffect(() => {
        const fetch = async () => {
            const response = await getAPI();
            if (response) setAPIData(response);
        }
        fetch()
    }, []) 

    const data = {
        farmName: "Smart drip farm",
        temperature: apiData.temperature,
        light: 123,
        thermometer: 32,
        humidity: apiData.humidity,
        soilMoisture: apiData.moisture,
        sunrise: "06:30 AM",
        sunset: "07:30 PM",
        plants: Array.from({ length: 10}, (_, index) => {
            return {
                id: index,
                name: `Plant ${index + 1}`,
                quantity: Math.floor(Math.random() * 10) + 1,
            }
        })
    }

    return (
        <Fragment>
            <Fab>
                <Leaf color="white" size={16} />
                <Plus color="white" size={12} className="absolute bottom-2 left-6" />
                <FabLabel>Add plant</FabLabel>
            </Fab>
            <ScrollView className="bg-background-0 h-screen p-4">
                <VStack className="flex-1 items-center gap-4 mb-20">
                    <Heading className="text-2xl font-semibold text-primary-500">Welcome, Lam Vy!</Heading>
                    <Box className="w-full h-fit bg-background-0 rounded-xl border border-slate-200 shadow-md shadow-slate-200 p-4">
                        <Heading className="text-primary-500">Weather</Heading>
                        <VStack className="w-full h-fit gap-4">
                            <HStack className="items-end gap-2">
                                <CloudSun size={40} className="text-primary-500" />
                                <Heading className="text-2xl text-black font-medium">{`${data.temperature} \u00b0 `}</Heading>
                                <Text className="text-xl ml-auto text-black font-medium">{data.farmName}</Text>
                            </HStack>
                            <HStack className="gap-4">
                                <ShadowBox className="h-fit">
                                    <HStack className="flex-1 justify-start items-center p-4 gap-4">
                                        <Sun className="text-primary-500" />
                                        <VStack>
                                            <Text className="font-semibold text-2xs">Light</Text>
                                            <Text>{data.light + " Lumens"}</Text>
                                        </VStack>
                                    </HStack>
                                </ShadowBox>
                                <ShadowBox className="h-fit">
                                    <HStack className="flex-1 justify-start items-center p-4 gap-4">
                                        <Thermometer className="text-primary-500" />
                                        <VStack>
                                            <Text className="font-semibold text-2xs">Thermometer</Text>
                                            <Text>{`${data.thermometer} \u00b0`}</Text>
                                        </VStack>
                                    </HStack>
                                </ShadowBox>
                            </HStack>
                            <HStack className="gap-4">
                            <ShadowBox className="h-fit">
                                    <HStack className="flex-1 justify-start items-center p-4 gap-4">
                                        <Droplet className="text-primary-500" />
                                        <VStack>
                                            <Text className="font-semibold text-2xs">Humidity</Text>
                                            <Text>{`${data.humidity} \%`}</Text>
                                        </VStack>
                                    </HStack>
                                </ShadowBox>
                                <ShadowBox className="h-fit">
                                    <HStack className="flex-1 justify-start items-center p-4 gap-4">
                                        <Leaf className="text-primary-500" />
                                        <VStack>
                                            <Text className="font-semibold text-2xs">Soil moisture</Text>
                                            <Text>{`${data.soilMoisture} \%`}</Text>
                                        </VStack>
                                    </HStack>
                                </ShadowBox>
                            </HStack>
                            <ShadowBox className="h-fit">
                                <HStack className="flex-1 items-center p-4 gap-2">
                                    <Sun className="text-primary-500" />
                                    <VStack>
                                        <Text className="font-semibold text-2xs">Sunrise</Text>
                                        <Text>{data.sunrise}</Text>
                                    </VStack>

                                    <VStack className="items-end ml-auto">
                                        <Text className="font-semibold text-2xs">Sunset</Text>
                                        <Text>{data.sunset}</Text>
                                    </VStack>
                                    <Moon className="text-primary-500" />
                                </HStack>
                            </ShadowBox>
                        </VStack>
                    </Box>

                    <Box className="w-full h-fit bg-background-0 rounded-xl border border-slate-200 shadow-md shadow-slate-200 p-4">
                        <HStack className="justify-between w-full">
                            <Heading className="text-primary-500">Plants info</Heading>
                            <Button size="xs" className="rounded-full">
                                <Text className="text-white text-sm">Edit</Text> 
                                <PenLine className="text-white" size={16} />
                            </Button>           
                        </HStack>
                        <VStack className="gap-4 pt-4">
                            {data.plants.map(plant => (
                                <ShadowBox key={plant.id} className="w-full">
                                    <HStack className="flex-1 items-center p-4 gap-4">
                                        <Leaf className="text-primary-500" />
                                        <VStack>
                                            <Text className="font-semibold text-2xs">{plant.name}</Text>
                                            <Text>{`${plant.quantity} plants`}</Text>
                                        </VStack>
                                    </HStack>
                                </ShadowBox>
                            ))}
                        </VStack>
                    </Box>

                </VStack>
            </ScrollView>
        </Fragment>
    )
}