import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppProvider } from "./App.provider";
import { BottomTabsNavigator } from "./screens/BottomTabs.navigator";
import { MoodOptionType } from "./types";

export const App: React.FC = () => {
  return (
    <AppProvider moods={[]} handleSelectMood={function (mood: MoodOptionType): void {
      throw new Error("Function not implemented.");
    }}>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  )
}
