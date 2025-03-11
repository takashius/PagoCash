import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface CardProps {
  style?: ViewStyle;
}

interface TextProps {
  style?: TextStyle;
}

const Card = React.forwardRef<View, CardProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.card, style]} {...props} />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<View, CardProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.cardHeader, style]} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<Text, TextProps>(
  ({ style, ...props }, ref) => (
    <Text ref={ref} style={[styles.cardTitle, style]} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, TextProps>(
  ({ style, ...props }, ref) => (
    <Text ref={ref} style={[styles.cardDescription, style]} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, CardProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.cardContent, style]} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, CardProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.cardFooter, style]} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "column",
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#888",
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 0,
  },
});

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
