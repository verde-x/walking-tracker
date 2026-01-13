import "@/global.css";
import { WalkingProvider } from "@/contexts/WalkingContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <WalkingProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </WalkingProvider>
    </SafeAreaProvider>
  );
}
