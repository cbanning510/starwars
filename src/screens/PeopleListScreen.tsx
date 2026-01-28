import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/swapi";
import { usePeopleInfinite, useSearchPeople } from "../hooks/usePeople";
import { PersonCard } from "../components/PersonCard";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { extractIdFromUrl } from "../utils/helpers";

type Props = NativeStackScreenProps<RootStackParamList, "PeopleList">;

export const PeopleListScreen: React.FC<Props> = ({ navigation }) => {
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
  } = usePeopleInfinite();

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch,
    refetch: refetchSearch,
  } = useSearchPeople(searchQuery, searchQuery.length >= 2);

  const isSearching = searchQuery.length >= 2;
  const isLoading = isSearching ? isLoadingSearch : isLoadingInfinite;
  const isError = isSearching ? isErrorSearch : isErrorInfinite;
  const error = isSearching ? errorSearch : errorInfinite;

  const people = isSearching
    ? (searchData?.results ?? [])
    : (infiniteData?.pages.flatMap((page) => page.results) ?? []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    if (!isSearching && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handlePersonPress = (personUrl: string, personName: string) => {
    const id = extractIdFromUrl(personUrl);
    navigation.navigate("PersonDetail", { id, name: personName });
  };

  const handleRetry = () => {
    if (isSearching) {
      refetchSearch();
    } else {
      refetchInfinite();
    }
  };

  if (isLoading && people.length === 0) {
    return <LoadingState message="Loading characters..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || "Failed to load characters"}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Characters</Text>
          <Text style={styles.subtitle}>
            {isSearching
              ? `${people.length} results`
              : `${infiniteData?.pages[0]?.count || 0} total`}
          </Text>
        </View>

        <SearchBar
          placeholder="Search characters..."
          onSearch={handleSearch}
          debounceMs={300}
        />

        <FlatList
          data={people}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <PersonCard
              person={item}
              onPress={() => handlePersonPress(item.url, item.name)}
            />
          )}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <EmptyState
              title="No characters found"
              message={
                isSearching
                  ? "Try a different search term"
                  : "Unable to load characters"
              }
              emoji="👤"
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
  footer: {
    paddingVertical: 20,
  },
});
