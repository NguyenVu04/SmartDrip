
declare global {
    type NotificationType = {
        title: string;
        message?: string;
        startIcon?: ReactNode;
        status?: number;
        duration?: number;
        placement?: "top" | "bottom";
    }
    
    type ToastType = "error" | "warning" | "success" | "info" | "muted" | undefined;
    
    type AlertType = {
        title: string;
        message: string;
        onConfirmText: string;
        onConfirm: () => void;
    }
}

export {}