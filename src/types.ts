export type MoodOptionType = {
  emoji: string;
  description: string;
}

export type MoodOptionWithTimestamp = {
  mood: MoodOptionType;
  timeStamp: number;
}