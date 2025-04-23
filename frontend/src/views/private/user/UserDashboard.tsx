import ShadowBox from "@/src/components/custom/ShadowBox";
import { Box, Button, Fab, FabLabel, Heading, HStack, Text, VStack } from "@/src/components/ui";
import { interopIcons } from "@/src/utils/nativewind";
import { CalendarDays, CloudSun, Droplet, Leaf, Moon, PenLine, Plus, Sun, Thermometer, Trash } from "lucide-react-native";
import { Fragment, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import PopupAddPlant from "./components/PopupAddPlant";
import { useUtility } from "@/src/context/utiliity";
import { GardenInfoServfice } from "@/src/lib/api";
import PopupEditPlant from "./components/PopupEditPlant";
import { ButtonIcon } from "@/src/components/ui/button";

interopIcons([CloudSun, Sun, Moon, Thermometer, Droplet, Leaf, Plus, PenLine]);

export default function UserDashboard() {
    const { pushError, pushSuccess, pushAlertDialog } = useUtility();

    const [counterRefresh, setCounterRefresh] = useState(0);
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);

    const onCloseAddModal = () => {
        setIsOpenAddModal(false);
    }

    const [gardenInfo, setGardenInfo] = useState<GardenInfo>();
    const [currentTreeInfo, setCurrentTreeInfo] = useState<TreeInfo | null>(null);

    const onCloseEditModal = () => {
        setCurrentTreeInfo(null);
    }

    useEffect(() => {
        const fetchGardenInfo = async () => {
            const garden = new GardenInfoServfice();
            const res = await garden.getAllGardenInfo({current: 1, pageSize: 10});
            if (!res.success) {
                pushError({title: "Error", message: res.message});
                return;
            }
            setGardenInfo(res.data)
        };
        fetchGardenInfo();
    }, [counterRefresh]);

    const refresh = () => {
        setCounterRefresh((prev) => prev + 1);
    }

    const deletePlant = async (id: string) => {
        const del = () => {
            const garden = new GardenInfoServfice();
            garden.deleteGardenInfo(id).then((res) => {
                if (!res.success) {
                    pushError({title: "Error", message: res.message});
                    return;
                }
                pushSuccess({title: "Success", message: "Plant deleted successfully"});
                refresh();
            })
        }
        pushAlertDialog({
            title: "Delete plant",
            message: "Are you sure you want to delete this plant?",
            onConfirmText: "Delete",
            onConfirm: del,
        })
    }

    const [apiData, setAPIData] = useState<any>({
        humidity: 1,
        moisture: 1,
        temperature: 1,
    });

    const data = {
        farmName: "Smart drip farm",
        temperature: apiData.temperature,
        light: 123,
        thermometer: 32,
        humidity: apiData.humidity,
        soilMoisture: apiData.moisture,
        sunrise: "06:30 AM",
        sunset: "07:30 PM",
    }

    return (
        <Fragment>
            <PopupAddPlant isOpen={isOpenAddModal} onClose={onCloseAddModal} refresh={refresh} />
            {currentTreeInfo && <PopupEditPlant currentPlant={currentTreeInfo} isOpen={currentTreeInfo != null} onClose={onCloseEditModal} refresh={refresh} />}
            <Fab onPress={() => setIsOpenAddModal(true)}>
                <Leaf color="white" size={16} />
                <Plus color="white" size={12} className="absolute bottom-2 left-6" />
                <FabLabel>Add plant</FabLabel>
            </Fab>
            <ScrollView className="bg-background-0 h-screen p-4">
                <VStack className="flex-1 items-center gap-4 mb-20">
                    <Heading className="text-2xl font-semibold text-primary-500">Welcome</Heading>
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
                        </HStack>
                        <VStack className="gap-4 pt-4">
                            {gardenInfo?.gardenInfos.map(plant => (
                                <ShadowBox key={plant._id} className="w-full">
                                    <HStack className="flex-1 items-center p-4 gap-4">
                                        <Leaf className="text-primary-500" />
                                        <VStack>
                                            <Text className="font-semibold text-2xs">{plant.treeType}</Text>
                                            <Text>{`${plant.numOfTree} plants`}</Text>
                                            <Text>{`${ new Date(new Date(plant.cropStart).getTime() * 1000).toDateString() }`}</Text>
                                        </VStack>
                                        <Button size="xs" action="negative" onPress={() => deletePlant(plant._id)} className="ml-auto rounded-md px-2">
                                            <ButtonIcon as={Trash} size="sm"     />
                                        </Button>
                                        <Button size="xs" onPress={() => setCurrentTreeInfo(plant)} className="rounded-md px-2">
                                            <ButtonIcon as={PenLine} size="sm" />
                                        </Button>
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