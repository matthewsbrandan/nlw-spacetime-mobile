import * as SecureStore from 'expo-secure-store';

import { StatusBar } from 'expo-status-bar'
import { ImageBackground, View } from 'react-native'
import { styled } from 'nativewind'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      console.log(!!token);
      setIsUserAuthenticated(!!token);
    })
  },[]);

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) return <SplashScreen/>

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <View className="absolute inset-y-0 left-2 flex-1 items-center justify-center">
        <StyledStripes />
      </View>

      <StatusBar style="light" translucent/>

      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' }
      }}>
        <Stack.Screen name="index" redirect={isUserAuthenticated}/>
        <Stack.Screen name="memories"/>
        <Stack.Screen name="new"/>
      </Stack>
    </ImageBackground>
  )
}