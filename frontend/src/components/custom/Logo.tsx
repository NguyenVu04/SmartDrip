import { Image } from "react-native";


export function BigLogo() {
    return (
        <Image
            style={{
                width: 200,
                height: 200,
            }}
            className="w-8 h-8 mr-4"
            source={require("@/assets/images/logo.png")}
            alt="image"
        />
    )
}

export function MediumLogo() {
    return (
        <Image
            style={{
                width: 160,
                height: 160,
            }}
            className="size-14 mr-4"
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