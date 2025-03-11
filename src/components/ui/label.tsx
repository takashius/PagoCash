import React from "react";
import { Text, TextStyle, StyleSheet } from "react-native";

interface LabelProps {
  className?: string;
  style?: TextStyle;
  children: React.ReactNode;
}

const Label = React.forwardRef<Text, LabelProps>(({ style, children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.label, style]} {...props}>
      {children}
    </Text>
  );
});

Label.displayName = "Label";

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#000",
    opacity: 1,
  },
});

export { Label };
