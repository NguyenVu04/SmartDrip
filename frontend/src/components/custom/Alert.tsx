import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, Button, ButtonText, Heading, Text } from "../ui";

type Props = {
    showAlertDialog: boolean;
    handleClose: () => void;
    alert: AlertType;
}

export default function ({showAlertDialog, handleClose, alert}: Props) {
    return (
        <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
                <AlertDialogBackdrop />
                <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading className="text-typography-950 font-semibold" size="md">
                        {alert.title}
                    </Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                    <Text size="sm">
                        {alert.message}
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter className="">
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={handleClose}
                        size="sm"
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button size="sm" variant="solid" onPress={() => { handleClose(); alert.onConfirm() }} className="min-w-20">
                        <ButtonText>{alert.onConfirmText}</ButtonText>
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )
}