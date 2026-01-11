import "../global.css";
import { Stack } from "expo-router";
import { WalkingProvider } from "@/contexts/WalkingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <WalkingProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </WalkingProvider>
    </ThemeProvider>
  );
}
