import { Stack } from "expo-router";
import "./globals.css";
import AppHeader from "../components/AppHeader";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
        name="(tabs)"
        options={{
          header: () => <AppHeader />,
        }}
      />
    </Stack>
    </SafeAreaProvider>
  );
}
