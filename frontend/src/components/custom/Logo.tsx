import { Image } from "react-native";


export function BigLogo() {
    return (
        <Image
            className="size-44 mr-4"
            source={require("@/assets/images/logo.png")}
            alt="image"
        />
    )
}

export function MediumLogo() {
    return (
        <Image
            className="size-32 mr-4"
            source={require("@/assets/images/logo.png")}
            alt="image"
        />
    )
}

export function SmallLogo() {
    return (
        <Image
            className="size-20 mr-4"
            source={require("@/assets/images/logo.png")}
            alt="image"
        />
    )
}