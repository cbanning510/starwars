import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, Starship } from "../types/swapi";
import {
  useStarshipsInfinite,
  useSearchStarships,
} from "../hooks/useStarships";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { extractIdFromUrl, formatNumber } from "../utils/helpers";

type Props = NativeStackScreenProps<RootStackParamList, "StarshipsList">;

const StarshipCard: React.FC<{ starship: Starship; onPress: () => void }> = ({
  starship,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardHeader}>
        <Text style={styles.emoji}>🚀</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{starship.name}</Text>
          <Text style={styles.cardSubtitle}>{starship.model}</Text>
          <View style={styles.cardStats}>
            <Text style={styles.statText}>
              Class: {starship.starship_class}
            </Text>
            <Text style={styles.statText}>
              Crew: {formatNumber(starship.crew)}
            </Text>
          </View>
        </View>
        <View style={styles.chevron}>
          <Text style={styles.chevronText}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const StarshipsListScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfinite,
    isError: isErrorInfinite,
    error: errorInfinite,
    refetch: refetchInfinite,
  } = useStarshipsInfinite();

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch,
    refetch: refetchSearch,
  } = useSearchStarships(searchQuery, searchQuery.length >= 2);

  const isSearching = searchQuery.length >= 2;
  const isLoading = isSearching ? isLoadingSearch : isLoadingInfinite;
  const isError = isSearching ? isErrorSearch : isErrorInfinite;
  const error = isSearching ? errorSearch : errorInfinite;

  const starships = isSearching
    ? (searchData?.results ?? [])
    : (infiniteData?.pages.flatMap((page) => page.results) ?? []);

  const handleLoadMore = () => {
    if (!isSearching && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleStarshipPress = (starshipUrl: string, starshipName: string) => {
    const id = extractIdFromUrl(starshipUrl);
    navigation.navigate("StarshipDetail", { id, name: starshipName });
  };

  if (isLoading && starships.length === 0) {
    return <LoadingState message="Loading starships..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || "Failed to load starships"}
        onRetry={isSearching ? refetchSearch : refetchInfinite}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Starships</Text>
          <Text style={styles.subtitle}>
            {isSearching
              ? `${starships.length} results`
              : `${infiniteData?.pages[0]?.count || 0} total`}
          </Text>
        </View>

        <SearchBar
          placeholder="Search starships..."
          onSearch={setSearchQuery}
        />

        <FlatList
          data={starships}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <StarshipCard
              starship={item}
              onPress={() => handleStarshipPress(item.url, item.name)}
            />
          )}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <EmptyState
              title="No starships found"
              message={
                isSearching
                  ? "Try a different search term"
                  : "Unable to load starships"
              }
              emoji="🚀"
            />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.footer}>
                <LoadingState message="Loading more..." size="small" />
              </View>
            ) : null
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
    paddingBottom: 8,
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
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#1a1a1a",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
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
    marginBottom: 6,
  },
  cardStats: {
    flexDirection: "row",
    gap: 12,
  },
  statText: {
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
  footer: {
    paddingVertical: 20,
  },
});
