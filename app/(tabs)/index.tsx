import { View, Text } from 'react-native'
import React from 'react'

const Index = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <View className="items-center px-6">
        <Text className='text-5xl text-gray-800 font-semibold text-center mb-10'>
          Welcome To
        </Text>
        
        <Text className="text-6xl font-black text-center leading-tight">
          <Text className="text-purple-800">
            Codingmart
          </Text>
          {'\n'}
          <Text className="text-purple-800">
            Technologies
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default Index