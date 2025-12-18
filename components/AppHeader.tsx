import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

function AppHeader() {
  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView 
        edges={["top"]} 
        style={{ backgroundColor: 'black' }}
      >
        <LinearGradient
          colors={['#1e40af', '#3730a3', '#7e22ce']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="h-16 justify-center items-center pt-4"
        >
          <View className="items-center">
            <Text className="text-white text-3xl font-black tracking-wider mb-2 shadow-lg shadow-black/30">
              Codingmart Technologies
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}

export default AppHeader;