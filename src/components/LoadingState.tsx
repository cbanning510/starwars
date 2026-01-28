import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "large";
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  size = "large",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#FFE81F" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: "#FFE81F",
    fontWeight: "600",
  },
});
