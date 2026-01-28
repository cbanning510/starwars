import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { Person } from "../types/swapi";
import { getAvatarColor, getInitials, formatGender } from "../utils/helpers";

interface PersonCardProps {
  person: Person;
  onPress: () => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onPress }) => {
  const avatarColor = getAvatarColor(person.name);
  const initials = getInitials(person.name);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.initials}>{initials}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{person.name}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>
            {formatGender(person.gender)} • {person.birth_year}
          </Text>
        </View>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{person.height}cm</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Mass</Text>
            <Text style={styles.statValue}>{person.mass}kg</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Films</Text>
            <Text style={styles.statValue}>{person.films.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  initials: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFE81F",
    marginBottom: 4,
  },
  details: {
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#AAA",
  },
  stats: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  statValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
  },
  chevron: {
    marginLeft: 8,
  },
  chevronText: {
    fontSize: 28,
    color: "#666",
    fontWeight: "300",
  },
});
