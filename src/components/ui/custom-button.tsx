import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";

// Tipos para los estilos y props
interface ButtonProps {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const variants: Record<string, ViewStyle> = {
  default: {
    backgroundColor: "#007bff",
    borderColor: "transparent",
  },
  primary: {
    backgroundColor: "#FFD700",
    borderColor: "transparent",
  },
  secondary: {
    backgroundColor: "#8B4513",
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#333",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  link: {
    backgroundColor: "transparent",
  },
};

const sizes: Record<string, ViewStyle> = {
  default: {
    height: 48,
    paddingHorizontal: 16,
  },
  sm: {
    height: 40,
    paddingHorizontal: 12,
  },
  lg: {
    height: 56,
    paddingHorizontal: 24,
  },
  icon: {
    height: 40,
    width: 40,
  },
};

const textVariants: Record<string, TextStyle> = {
  default: { color: "#fff" },
  primary: { color: "#333" },
  secondary: { color: "#fff" },
  outline: { color: "#333" },
  ghost: { color: "#333" },
  link: { color: "#FFD700", textDecorationLine: "underline" },
};

const CustomButton = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>, // El tipo del ref para TouchableOpacity
  ButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      loading = false,
      children,
      onPress,
      style,
      textStyle,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const buttonStyles = [
      styles.base,
      variants[variant], // Se aplica el estilo según la variante
      sizes[size], // Se aplica el tamaño según la configuración
      disabled && styles.disabled,
      style,
    ];

    const textStyles = [styles.text, textVariants[variant], textStyle];

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyles}
        onPress={onPress}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <ActivityIndicator style={styles.spinner} color="#fff" />
        ) : (
          <Text style={textStyles}>{children}</Text>
        )}
      </TouchableOpacity>
    );
  }
);

CustomButton.displayName = "CustomButton";

// Base de estilos en StyleSheet
const styles = StyleSheet.create({
  base: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  spinner: {
    alignSelf: "center",
  },
});

export { CustomButton };
