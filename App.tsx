import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950">
      <Text className="text-5xl text-zinc-200">Hi Matth!</Text>
      <Text className="text-lg text-zinc-400">Never Stop Learning!</Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
