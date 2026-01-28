import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/swapi";

import { HomeScreen } from "../screens/HomeScreen";
import { PeopleListScreen } from "../screens/PeopleListScreen";
import { PersonDetailScreen } from "../screens/PersonDetailScreen";
import { FilmsListScreen } from "../screens/FilmsListScreen";
import { FilmDetailScreen } from "../screens/FilmDetailScreen";
import { PlanetsListScreen } from "../screens/PlanetsListScreen";
import { PlanetDetailScreen } from "../screens/PlanetDetailScreen";
import { StarshipsListScreen } from "../screens/StarshipsListScreen";
import { StarshipDetailScreen } from "../screens/StarshipDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#FFE81F",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
          },
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: "#000",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PeopleList"
          component={PeopleListScreen}
          options={{
            title: "Characters",
          }}
        />
        <Stack.Screen
          name="PersonDetail"
          component={PersonDetailScreen}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />

        <Stack.Screen
          name="FilmsList"
          component={FilmsListScreen}
          options={{
            title: "Films",
          }}
        />
        <Stack.Screen
          name="FilmDetail"
          component={FilmDetailScreen}
          options={({ route }) => ({
            title: route.params.title,
          })}
        />

        <Stack.Screen
          name="PlanetsList"
          component={PlanetsListScreen}
          options={{
            title: "Planets",
          }}
        />
        <Stack.Screen
          name="PlanetDetail"
          component={PlanetDetailScreen}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
        <Stack.Screen
          name="StarshipsList"
          component={StarshipsListScreen}
          options={{
            title: "Starships",
          }}
        />
        <Stack.Screen
          name="StarshipDetail"
          component={StarshipDetailScreen}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
