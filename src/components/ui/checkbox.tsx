import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface CheckboxProps {
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
  style?: ViewStyle;
  iconStyle?: TextStyle;
  disabled?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  CheckboxProps
>(
  ({ checked = false, onValueChange, style, iconStyle, disabled = false }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handlePress = () => {
      if (disabled) return;
      const newValue = !isChecked;
      setIsChecked(newValue);
      onValueChange?.(newValue);
    };

    return (
      <TouchableOpacity
        ref={ref}
        style={[
          styles.checkbox,
          isChecked && styles.checkboxChecked,
          disabled && styles.disabled,
          style,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={disabled}
      >
        {isChecked && (
          <Feather
            name="check"
            size={16}
            color="#fff"
            style={[styles.icon, iconStyle]}
          />
        )}
      </TouchableOpacity>
    );
  }
);

Checkbox.displayName = "Checkbox";

const styles = StyleSheet.create({
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 4,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    fontWeight: "bold",
  },
});

export { Checkbox };
