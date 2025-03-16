import React from "react";
import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { Image } from "../ui/image";

const alternativeSigninIcon = [
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
  return (
    <HStack space="xl" className="w-full justify-center">
      {alternativeSigninIcon.map((icon) => (
        <Pressable key={icon.id} className="flex items-center justify-center border border-gray-400 rounded-lg p-3 size-16">
          <Image source={icon.source} alt={icon.id} size="2xs" />
        </Pressable>
      ))}
    </HStack>
  );
};
