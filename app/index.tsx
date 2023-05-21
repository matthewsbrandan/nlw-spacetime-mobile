import * as SecureStore from 'expo-secure-store';

import { View, Text, TouchableOpacity } from 'react-native'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useEffect } from 'react'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'

import { api } from '../src/lib/api'
import { useRouter } from 'expo-router';

const GITHUB_CLIENT_ID = 'f196524f232b1a697fb9';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_CLIENT_ID}`,
};

export default function App() {
  const router = useRouter();

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [request, response, signInWithGithub] = useAuthRequest({
    clientId: GITHUB_CLIENT_ID,
    scopes: ['identity'],
    redirectUri: makeRedirectUri({
      scheme: 'nlwspacetime'
    }),
  },discovery);

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  async function handleGithubOAuthCode(code: string){
    const response = await api.post('/register', {
      code, isMobile: true
    });
    
    const { token } = response.data
    
    await SecureStore.setItemAsync('token', token);

    router.push('/memories');
  }

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com ❤ no NLW da Rocketseat
      </Text>
    </View>
  )
}