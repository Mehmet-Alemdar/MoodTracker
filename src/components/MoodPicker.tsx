import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { theme } from "../theme";
import { MoodOptionType } from "../types";

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

const imageSrc = require('../../assets/butterflies.png')

type MoodPickerProps = {
  handleSelectMood: (moodOption: MoodOptionType) => void;
}

export const MoodPicker: React.FC<MoodPickerProps> = ({handleSelectMood}) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = React.useState(false);

  const handleSelect = React.useCallback(() => {
    if(selectedMood) {
      handleSelectMood(selectedMood)
      setSelectedMood(undefined)
      setHasSelected(true)
    }
  }, [handleSelectMood, selectedMood])

  if(hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image}/>
        <Pressable 
          style={styles.chooseButton}
          onPress={() => setHasSelected(false)}>
          <Text style={styles.chooseButtonText}>Choose another!</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you right now?</Text>
      <View style={styles.moodOptions}>
        {moodOptions.map(option => (
        <View key={option.emoji}>
          <Pressable 
            onPress={() => setSelectedMood(option)} 
            style={[
              styles.moodItem, 
              selectedMood?.emoji === option.emoji 
                ? styles.selectedMood
                : undefined
              ]}>
            <Text key={option.emoji}>{option.emoji}</Text>
          </Pressable>
          <Text style={styles.descriptionText}>{option.emoji === selectedMood?.emoji
                  ? option.description
                  : undefined}
          </Text>
        </View>
      ))}</View>
      <Pressable 
        style={styles.chooseButton}
        onPress={() => handleSelect()}>
        <Text style={styles.chooseButtonText}>Choose</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#454c73',
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colorWhite
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  moodItem: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMood: {
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: '#454C73',
  },
  descriptionText: {
    color: '#454C73',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10
  },
  chooseButton: {
    backgroundColor: '#454c73',
    width: 150,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  chooseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  image: {
    alignSelf: 'center'
  }
})