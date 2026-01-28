import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, Film } from "../types/swapi";
import { useFilms } from "../hooks/useFilms";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { extractIdFromUrl } from "../utils/helpers";

type Props = NativeStackScreenProps<RootStackParamList, "FilmsList">;

const FilmCard: React.FC<{ film: Film; onPress: () => void }> = ({
  film,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <View style={styles.episodebadge}>
          <Text style={styles.episodeText}>EP {film.episode_id}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{film.title}</Text>
          <Text style={styles.cardSubtitle}>{film.release_date}</Text>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>Directed by {film.director}</Text>
            <Text style={styles.metaText}>Produced by {film.producer}</Text>
          </View>
        </View>
        <View style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const FilmsListScreen: React.FC<Props> = ({ navigation }) => {
  const { data, isLoading, isError, error, refetch } = useFilms();

  const films = data?.results.sort((a, b) => a.episode_id - b.episode_id) ?? [];

  const handleFilmPress = (filmUrl: string, filmTitle: string) => {
    const id = extractIdFromUrl(filmUrl);
    navigation.navigate("FilmDetail", { id, title: filmTitle });
  };

  if (isLoading) {
    return <LoadingState message="Loading films..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || "Failed to load films"}
        onRetry={refetch}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Films</Text>
          <Text style={styles.subtitle}>{films.length} episodes</Text>
        </View>

        <FlatList
          data={films}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <FilmCard
              film={item}
              onPress={() => handleFilmPress(item.url, item.title)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <EmptyState
              title="No films found"
              message="The saga is yet to begin"
              emoji="🎬"
            />
          }
        />
      </View>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFE81F",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#AAA",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  episodebadge: {
    backgroundColor: "#FFE81F",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 16,
    minWidth: 56,
    alignItems: "center",
  },
  episodeText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFE81F",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#AAA",
    marginBottom: 8,
  },
  cardMeta: {
    gap: 2,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
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
