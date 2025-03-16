import { createContext, ReactNode, useContext, useState } from "react";
import { HStack, Pressable, Toast, ToastDescription, ToastTitle, useToast, VStack } from "../components/ui";
import { CircleCheck, Info, X } from "lucide-react-native";
import Alert from "../components/custom/Alert";


type UtilityContextType = {
    pushSuccess: (notification: NotificationType) => void
    pushError: (notification: NotificationType) => void
    pushAlertDialog: (alert: AlertType) => void
}

const UtilityContext = createContext<UtilityContextType | null>(null);

export function useUtility() {
    const context = useContext(UtilityContext);
    if (!context) {
        throw new Error("useUtility must be used within a UtilityProvider");
    }
    return context;
}

const toastWidth = 300;
const toastDefaultDuration = 3000;
const maxNumberOfToasts = 2;

type Props = {
    children: ReactNode;
}

export default function UtilityProvider({ children }: Props) {
    const toast = useToast()

    const [toastIdList, setToastIdList] = useState<string[]>([]);

    const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false)
    const [alert, setAlert] = useState<AlertType>({ title: "", message: "", onConfirmText: "", onConfirm: () => {} })
    const handleClose = () => setShowAlertDialog(false)


    const pushSuccess = (notification: NotificationType) => {
        if (!notification.startIcon) notification.startIcon = <CircleCheck color="white" size={24} />
        pushToast("success", notification);
    }

    const pushError = (notification: NotificationType) => {
        if (!notification.startIcon) notification.startIcon = <Info color="white" size={24} />
        pushToast("error", notification);
    }

    const pushToast = (type: ToastType, notification: NotificationType) => {
        const toastId = Math.random().toString();
        controlToastLimit(toastId);

        if (notification.status === 401) {
            // Handle unauthorized error
        }

        toast.show({
            id: toastId,
            placement: notification.placement || "top",
            duration: notification.duration || toastDefaultDuration,
            avoidKeyboard: true,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id
                return (
                    <Toast onTouchStart={() => toast.close(toastId.toString())} nativeID={uniqueToastId} action={type} variant="solid">
                        <HStack className="justify-start items-center gap-3" style={{ width : toastWidth }}>
                            {notification.startIcon}
                            <VStack style={{ width: "75%" }}>
                                {notification.title && <ToastTitle numberOfLines={1}>{notification.title}</ToastTitle>}
                                {notification.message && <ToastDescription numberOfLines={2}>{notification.message}</ToastDescription>}
                            </VStack>
                            <Pressable className="ml-auto">
                                <X color="white" size={24} />
                            </Pressable>
                        </HStack>
                    </Toast>
                )
            }
        })
    }

    const pushAlertDialog = (alret: AlertType) => {
        setShowAlertDialog(true)
        setAlert(alret)
    }

    const controlToastLimit = (id: string) => {
        const cloneToastIdList = [...toastIdList];
        if (cloneToastIdList.length >= maxNumberOfToasts) {
            const firstToastId = cloneToastIdList.shift();
            if (firstToastId) {
                toast.close(firstToastId);
            }
        }
        cloneToastIdList.push(id.toString());
        setToastIdList(cloneToastIdList);
    }

    const value = {
        pushSuccess,
        pushError,
        pushAlertDialog
    };

    return (
        <UtilityContext.Provider value={value}>
            <Alert showAlertDialog={showAlertDialog} handleClose={handleClose} alert={alert} />
            {children}
        </UtilityContext.Provider>
    );
}