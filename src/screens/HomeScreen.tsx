import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/swapi";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface CategoryCard {
  id: string;
  title: string;
  emoji: string;
  description: string;
  route: keyof RootStackParamList;
  color: string;
}

const categories: CategoryCard[] = [
  {
    id: "people",
    title: "Characters",
    emoji: "👤",
    description: "Explore heroes, villains, and everyone in between",
    route: "PeopleList",
    color: "#FF6B6B",
  },
  {
    id: "films",
    title: "Films",
    emoji: "🎬",
    description: "Discover the epic saga across all episodes",
    route: "FilmsList",
    color: "#4ECDC4",
  },
  {
    id: "planets",
    title: "Planets",
    emoji: "🪐",
    description: "Journey through the galaxy, one world at a time",
    route: "PlanetsList",
    color: "#45B7D1",
  },
  {
    id: "starships",
    title: "Starships",
    emoji: "🚀",
    description: "Examine the vessels that traverse the stars",
    route: "StarshipsList",
    color: "#FFA07A",
  },
];

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Star Wars</Text>
          <Text style={styles.subtitle}>Database</Text>
          <Text style={styles.tagline}>
            A long time ago in a galaxy far, far away...
          </Text>
        </View>

        <View style={styles.categories}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.card, { borderLeftColor: category.color }]}
              onPress={() => navigation.navigate(category.route as any)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.emoji}>{category.emoji}</Text>
                <Text style={styles.cardTitle}>{category.title}</Text>
              </View>
              <Text style={styles.cardDescription}>{category.description}</Text>
              <View style={styles.cardFooter}>
                <Text style={[styles.exploreText, { color: category.color }]}>
                  Explore →
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>May the Force be with you</Text>
          <Text style={styles.apiCredit}>Powered by SWAPI</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFE81F",
    letterSpacing: 2,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFE81F",
    letterSpacing: 8,
    textAlign: "center",
    marginBottom: 16,
  },
  tagline: {
    fontSize: 14,
    color: "#AAA",
    fontStyle: "italic",
    textAlign: "center",
  },
  categories: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFE81F",
  },
  cardDescription: {
    fontSize: 14,
    color: "#AAA",
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    alignItems: "flex-end",
  },
  exploreText: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#FFE81F",
    fontStyle: "italic",
    marginBottom: 8,
  },
  apiCredit: {
    fontSize: 12,
    color: "#666",
  },
});
