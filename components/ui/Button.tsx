import { Pressable, Text, ActivityIndicator, View } from "react-native";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export default function Button({ title, onPress, variant = "primary", disabled = false, loading = false, fullWidth = false }: ButtonProps) {
  const baseClasses = "flex-row items-center justify-center rounded-full py-3 px-6";
  const widthClass = fullWidth ? "w-full" : "";

  const variantClasses = {
    primary: "bg-gold",
    secondary: "border-2 border-gold bg-transparent",
    danger: "bg-danger",
  };

  const textClasses = {
    primary: "text-black font-sans-semibold text-sm",
    secondary: "text-gold font-sans-semibold text-sm",
    danger: "text-white font-sans-semibold text-sm",
  };

  const disabledClass = disabled || loading ? "opacity-40" : "";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass}`}
    >
      {loading && <ActivityIndicator size="small" color={variant === "primary" ? "#000" : "#C9A84C"} className="mr-2" />}
      <Text className={textClasses[variant]}>{title}</Text>
    </Pressable>
  );
}
