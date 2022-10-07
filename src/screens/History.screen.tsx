import React from "react";
import { Text, View, ScrollView } from "react-native";
import { useAppContext } from "../App.provider";
import { MoodItemRow } from "../components/MoodItemRow";

export const History: React.FC = () => {
  const appContext = useAppContext()

  return(
    <ScrollView>
      {
        appContext.moods && (
          appContext.moods.slice().reverse().map(item => (
            <MoodItemRow item={item} key={item.timeStamp} />
          ))
        )
      }
    </ScrollView>
  )
}