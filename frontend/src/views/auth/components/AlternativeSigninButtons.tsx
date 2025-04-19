import { HStack, Image, Pressable } from "@/src/components/ui";
import { useUtility } from "@/src/context/utiliity";

const icons = [
  { 
    id: "facebook", 
    source: require("@/assets/images/icons/facebook.png") 
  },
  { 
    id: "google", 
    source: require("@/assets/images/icons/google.png")
  },
  { 
    id: "apple", 
    source: require("@/assets/images/icons/apple.png")
  },
];

export default function AlternativeSigninButtons () {
    const { pushWarning } = useUtility();

    const unimplemented = () => {
        pushWarning({
            title: "Unimplemented feature",
        })
    }


    return (
        <HStack space="4xl" className="justify-center">
        {icons.map((icon) => (
            <Pressable onPress={unimplemented} key={icon.id} className="flex items-center justify-center border border-gray-400 rounded-lg p-3 size-16">
            <Image source={icon.source} alt={icon.id} size="2xs" />
            </Pressable>
        ))}
        </HStack>
    );
};
