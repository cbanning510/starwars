import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/swapi";
import { usePlanet } from "../hooks/usePlanets";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { formatNumber, capitalizeWords } from "../utils/helpers";

type Props = NativeStackScreenProps<RootStackParamList, "PlanetDetail">;

export const PlanetDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, name } = route.params;
  const { data: planet, isLoading, isError, error, refetch } = usePlanet(id);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  if (isLoading) {
    return <LoadingState message={`Loading ${name}...`} />;
  }

  if (isError || !planet) {
    return (
      <ErrorState
        message={error?.message || `Failed to load ${name}`}
        onRetry={refetch}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>🪐</Text>
          <Text style={styles.name}>{planet.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Characteristics</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Diameter</Text>
              <Text style={styles.value}>
                {formatNumber(planet.diameter)} km
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Gravity</Text>
              <Text style={styles.value}>{planet.gravity}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Rotation Period</Text>
              <Text style={styles.value}>{planet.rotation_period} hours</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Orbital Period</Text>
              <Text style={styles.value}>{planet.orbital_period} days</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Environmental</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Climate</Text>
              <Text style={styles.value}>
                {capitalizeWords(planet.climate)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Terrain</Text>
              <Text style={styles.value}>
                {capitalizeWords(planet.terrain)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Surface Water</Text>
              <Text style={styles.value}>{planet.surface_water}%</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Population</Text>
              <Text style={styles.value}>
                {formatNumber(planet.population)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{planet.residents.length}</Text>
              <Text style={styles.statLabel}>Residents</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{planet.films.length}</Text>
              <Text style={styles.statLabel}>Films</Text>
            </View>
          </View>
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
    alignItems: "center",
    paddingVertical: 32,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFE81F",
    textAlign: "center",
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFE81F",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridItem: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFE81F",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
