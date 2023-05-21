import { Link } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'

export default function Memories(){
  return (
    <View className="flex-1 justify-center items-center px-8 py-10">
      <Text className="text-center font-title text-2xl leading-tight text-gray-50 mb-6">
        Memories
      </Text>

      <Link href="/new" asChild>
        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}