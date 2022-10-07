import React, {createContext} from "react";
import { MoodOptionType, MoodOptionWithTimestamp } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage'

type AppData = {
  moods: MoodOptionWithTimestamp[];
}

const dataKey = 'my-app-data';

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(appData))
  } catch {}
}

const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey)
    if(result) {
      return JSON.parse(result)
    }
  }catch{
    console.log('getAppData error')
  }

  return null;
}

type AppContextType =  {
  moods: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  children?: React.ReactNode;
  handleDeleteMood: (moodToDelete: MoodOptionWithTimestamp) => void
}

const AppContext = createContext<AppContextType>({
  moods: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {}

})

export const AppProvider: React.FC<AppContextType> = ({children}) =>  {
  const [moods, setMoods] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = React.useCallback((mood: MoodOptionType) => {
    setMoods(current => {
      const newMoods = [
        ...current,
        { mood: mood, timeStamp: Date.now()}
      ]

      setAppData({moods: newMoods})
      return newMoods

    })
  }, [])

  const handleDeleteMood = React.useCallback((mood: MoodOptionWithTimestamp) => {
    setMoods(current => {
      const newMoods = current.filter(val => val.timeStamp !== mood.timeStamp)

      setAppData({moods: newMoods})
      return newMoods
    })
  }, [])

  React.useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if(data) {
        console.log(data.moods[0]);
        setMoods(data.moods)
      }
    };

    fetchAppData();
  }, [])
  
  return (
    <AppContext.Provider value={{moods, handleSelectMood, handleDeleteMood}}>
       {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => React.useContext(AppContext)