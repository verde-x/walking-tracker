import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { WalkingProvider } from "@/contexts/WalkingContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

function AppContent() {
  const { paperTheme } = useTheme();

  return (
    <PaperProvider theme={paperTheme}>
      <WalkingProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </WalkingProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
