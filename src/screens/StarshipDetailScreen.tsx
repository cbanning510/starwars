import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/swapi";
import { useStarship } from "../hooks/useStarships";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { formatNumber } from "../utils/helpers";

type Props = NativeStackScreenProps<RootStackParamList, "StarshipDetail">;

export const StarshipDetailScreen: React.FC<Props> = ({
  route,
  navigation,
}) => {
  const { id, name } = route.params;
  const {
    data: starship,
    isLoading,
    isError,
    error,
    refetch,
  } = useStarship(id);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  }, [navigation, name]);

  if (isLoading) {
    return <LoadingState message={`Loading ${name}...`} />;
  }

  if (isError || !starship) {
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
          <Text style={styles.emoji}>🚀</Text>
          <Text style={styles.name}>{starship.name}</Text>
          <Text style={styles.model}>{starship.model}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Class</Text>
              <Text style={styles.value}>{starship.starship_class}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Manufacturer</Text>
              <Text style={styles.value}>{starship.manufacturer}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Cost</Text>
              <Text style={styles.value}>
                {formatNumber(starship.cost_in_credits)} credits
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Length</Text>
              <Text style={styles.value}>
                {formatNumber(starship.length)} m
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Max Speed</Text>
              <Text style={styles.value}>
                {formatNumber(starship.max_atmosphering_speed)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Hyperdrive</Text>
              <Text style={styles.value}>{starship.hyperdrive_rating}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>MGLT</Text>
              <Text style={styles.value}>{starship.MGLT}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Consumables</Text>
              <Text style={styles.value}>{starship.consumables}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Capacity</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Crew</Text>
              <Text style={styles.value}>{formatNumber(starship.crew)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Passengers</Text>
              <Text style={styles.value}>
                {formatNumber(starship.passengers)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Cargo</Text>
              <Text style={styles.value}>
                {formatNumber(starship.cargo_capacity)} kg
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearances</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{starship.films.length}</Text>
              <Text style={styles.statLabel}>Films</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{starship.pilots.length}</Text>
              <Text style={styles.statLabel}>Pilots</Text>
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
    marginBottom: 4,
  },
  model: {
    fontSize: 16,
    color: "#AAA",
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
