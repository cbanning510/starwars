import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/swapi";
import { usePerson } from "../hooks/usePeople";
import { usePlanetByUrl } from "../hooks/usePlanets";
import { useFilmsByUrls } from "../hooks/useFilms";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import {
  getAvatarColor,
  getInitials,
  formatHeight,
  formatMass,
  formatGender,
  getEyeColorEmoji,
  capitalizeWords,
} from "../utils/helpers";

type Props = NativeStackScreenProps<RootStackParamList, "PersonDetail">;

export const PersonDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id, name } = route.params;

  const { data: person, isLoading, isError, error, refetch } = usePerson(id);
  const { data: homeworld } = usePlanetByUrl(person?.homeworld || "");
  const filmQueries = useFilmsByUrls(person?.films || []);

  const films = filmQueries
    .filter((query) => query.isSuccess)
    .map((query) => query.data!)
    .sort((a, b) => a.episode_id - b.episode_id);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [navigation, name]);

  if (isLoading) {
    return <LoadingState message={`Loading ${name}...`} />;
  }

  if (isError || !person) {
    return (
      <ErrorState
        message={error?.message || `Failed to load ${name}`}
        onRetry={refetch}
      />
    );
  }

  const avatarColor = getAvatarColor(person.name);
  const initials = getInitials(person.name);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.headerCard}>
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.initials}>{initials}</Text>
          </View>
          <Text style={styles.name}>{person.name}</Text>
          <Text style={styles.subtitle}>
            {formatGender(person.gender)} • {person.birth_year}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physical Attributes</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Height</Text>
              <Text style={styles.value}>{formatHeight(person.height)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Mass</Text>
              <Text style={styles.value}>{formatMass(person.mass)}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Hair Color</Text>
              <Text style={styles.value}>
                {capitalizeWords(person.hair_color)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Skin Color</Text>
              <Text style={styles.value}>
                {capitalizeWords(person.skin_color)}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Eye Color</Text>
              <Text style={styles.value}>
                {getEyeColorEmoji(person.eye_color)}{" "}
                {capitalizeWords(person.eye_color)}
              </Text>
            </View>
          </View>
        </View>

        {homeworld && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Homeworld</Text>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardEmoji}>🪐</Text>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{homeworld.name}</Text>
                  <Text style={styles.cardSubtitle}>
                    {homeworld.climate} • {homeworld.terrain}
                  </Text>
                  <Text style={styles.cardDetail}>
                    Population: {homeworld.population}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {films.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Films ({films.length})</Text>
            {films.map((film) => (
              <View key={film.url} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardEmoji}>🎬</Text>
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{film.title}</Text>
                    <Text style={styles.cardSubtitle}>
                      Episode {film.episode_id} • {film.release_date}
                    </Text>
                    <Text style={styles.cardDetail}>
                      Directed by {film.director}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{person.films.length}</Text>
              <Text style={styles.statLabel}>Films</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{person.starships.length}</Text>
              <Text style={styles.statLabel}>Starships</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{person.vehicles.length}</Text>
              <Text style={styles.statLabel}>Vehicles</Text>
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
  headerCard: {
    alignItems: "center",
    paddingVertical: 32,
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  initials: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFF",
  },
  name: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFE81F",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
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
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFE81F",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 13,
    color: "#666",
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
