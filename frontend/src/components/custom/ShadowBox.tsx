import { ReactNode } from "react";
import { Box } from "../ui";


type Props = {
    children?: ReactNode | string;
    className?: string;
}

export default function ShadowBox({ children, className }: Props) {
    const defaultClassName = "flex-1 rounded-lg bg-background-0 border border-slate-200 shadow-sm shadow-slate-200";
    return (
        <Box className={`${defaultClassName} ${className}`}>
            {children}
        </Box>
    )
}