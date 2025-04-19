import { Button, ButtonText, FormControl, Heading, Icon, Input, InputField, InputSlot, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, VStack } from "@/src/components/ui";
import { CloseIcon } from "@/src/components/ui/icon/index.web";
import { useUtility } from "@/src/context/utiliity";
import { GardenInfoServfice } from "@/src/lib/api";
import { Leaf, Tally5 } from "lucide-react-native";
import { useEffect, useState } from "react";

type Props = {
    currentPlant: TreeInfo;
    isOpen: boolean;
    onClose: () => void;
    refresh: () => void;
}

export default function PopupEditPlant({currentPlant, isOpen, onClose, refresh}: Props) {
    const { pushError, pushSuccess } = useUtility();

    const [editPlantPayload, setEditPlantPayload] = useState<UpdateGardenInfoPayload>(currentPlant);

    useEffect(() => {
        setEditPlantPayload(currentPlant);
    }, [currentPlant])

    const onChangePayload = (key: string, value: any) => {
        setEditPlantPayload((prev) => ({ ...prev, [key]: value }));
    }

    const clear = () => {
        setEditPlantPayload(currentPlant);
    }

    const submit = async () => {
        if (!editPlantPayload.treeType || editPlantPayload.numOfTree <= 0) {
            alert("Please fill all fields");
            return;
        }

        const garden = new GardenInfoServfice();
        const payload = {
            _id: editPlantPayload._id,
            treeType: editPlantPayload.treeType,
            numOfTree: editPlantPayload.numOfTree,
        }
        const res = await garden.updateGardenInfo(editPlantPayload._id, payload);
        if (!res.success) {
            pushError({ title: "Error", message: res.message });
            return;
        }
        pushSuccess({ title: "Success", message: "Plant added successfully" });
        clear();
        refresh();
        onClose();
    }

    return (
        <Modal size="md" isOpen={isOpen} onClose={onClose}>
            <ModalBackdrop />
            <ModalContent>
            <ModalHeader>
                <Heading size="xl" className="text-typography-950">Edit Plant</Heading>
                <ModalCloseButton>
                    <Icon
                        as={CloseIcon}
                        size="md"
                        className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                    />
                </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
                <VStack className="w-full gap-4 mt-2">
                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Leaf} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField placeholder="Tree type" value={editPlantPayload.treeType} onChangeText={(text) => onChangePayload("treeType", text)} />
                        </Input>
                    </FormControl>
                    <FormControl>
                        <Input variant="outline" size="lg" className="w-full rounded-lg px-3" >
                            <InputSlot>
                                <Icon as={Tally5} size="lg" className="text-primary-500" />
                            </InputSlot>
                            <InputField placeholder="Number of tree" keyboardType="number-pad" value={editPlantPayload.numOfTree == 0 ? "" : editPlantPayload.numOfTree.toString()} onChangeText={(num) => onChangePayload("numOfTree", isNaN(parseInt(num)) ? 0 : parseInt(num))} />
                        </Input>
                    </FormControl>
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Button variant="outline" action="secondary" onPress={clear} >
                    <ButtonText>Clear</ButtonText>
                </Button>

                <Button onPress={submit}>
                    <ButtonText>Submit</ButtonText>
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}