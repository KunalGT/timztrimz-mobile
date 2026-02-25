import { View } from "react-native";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}

export default function Card({ children, dark = false, className = "" }: CardProps) {
  const bgClass = dark ? "bg-gray-900" : "bg-white";
  return (
    <View className={`rounded-2xl p-4 ${bgClass} ${className}`}>
      {children}
    </View>
  );
}
