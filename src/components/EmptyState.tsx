import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface EmptyStateProps {
  title?: string;
  message?: string;
  emoji?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No Results",
  message = "Try adjusting your search",
  emoji = "🔍",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#000",
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFE81F",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
