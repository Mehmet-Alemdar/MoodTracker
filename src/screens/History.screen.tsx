import React from "react";
import { Text, View } from "react-native";
import { useAppContext } from "../App.provider";
import { MoodItemRow } from "../components/MoodItemRow";

export const History: React.FC = () => {
  const appContext = useAppContext()

  return(
    <View>
      {
        appContext.moods && (
          appContext.moods.map(item => (
            <MoodItemRow item={item} key={item.timeStamp} />
          ))
        )
      }
    </View>
  )
}