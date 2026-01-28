import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/swapi";
import { useFilm } from "../hooks/useFilms";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";

type Props = NativeStackScreenProps<RootStackParamList, "FilmDetail">;

export const FilmDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, title } = route.params;

  const { data: film, isLoading, isError, error, refetch } = useFilm(id);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  if (isLoading) {
    return <LoadingState message={`Loading ${title}...`} />;
  }

  if (isError || !film) {
    return (
      <ErrorState
        message={error?.message || `Failed to load ${title}`}
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.episodeBadge}>
            <Text style={styles.episodeLabel}>EPISODE</Text>
            <Text style={styles.episodeNumber}>{film.episode_id}</Text>
          </View>
          <Text style={styles.title}>{film.title}</Text>
          <Text style={styles.releaseDate}>{film.release_date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opening Crawl</Text>
          <View style={styles.crawlContainer}>
            <Text style={styles.crawlText}>{film.opening_crawl}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Production</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Director</Text>
              <Text style={styles.detailValue}>{film.director}</Text>
            </View>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Producer</Text>
              <Text style={styles.detailValue}>{film.producer}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{film.characters.length}</Text>
              <Text style={styles.statLabel}>Characters</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{film.planets.length}</Text>
              <Text style={styles.statLabel}>Planets</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{film.starships.length}</Text>
              <Text style={styles.statLabel}>Starships</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{film.vehicles.length}</Text>
              <Text style={styles.statLabel}>Vehicles</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{film.species.length}</Text>
              <Text style={styles.statLabel}>Species</Text>
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
    paddingHorizontal: 16,
  },
  episodeBadge: {
    backgroundColor: "#FFE81F",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  episodeLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
    letterSpacing: 1,
  },
  episodeNumber: {
    fontSize: 36,
    fontWeight: "900",
    color: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFE81F",
    textAlign: "center",
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 16,
    color: "#AAA",
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
  crawlContainer: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  crawlText: {
    fontSize: 16,
    color: "#CCC",
    lineHeight: 24,
    textAlign: "justify",
  },
  detailsGrid: {
    gap: 12,
  },
  detailCard: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFE81F",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
