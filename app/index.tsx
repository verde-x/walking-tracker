import { WalkingControls } from '@/components/WalkingControls';
import { WalkingStats } from '@/components/WalkingStats';
import { Text } from '@/components/ui';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, elapsedTime, distance, start, pause, resume, stop } = useWalkingContext();

  const handleStop = () => {
    stop();
    router.push('/result' as never);
  };

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Main Content */}
      <View className="flex-1 flex-col gap-6 w-full px-8 justify-center">
        {/* Header */}
        <Text
          className="text-foreground mb-8 w-full"
          style={{ fontSize: 36, fontWeight: '600', lineHeight: 50 }}
        >
          Walking Tracker
        </Text>

        {/* Stats */}
        <WalkingStats elapsedTime={elapsedTime} distance={distance} />
      </View>

      {/* Action Buttons - Fixed at bottom */}
      <View className="items-center pb-8 px-8">
        <WalkingControls
          state={state}
          onStart={start}
          onPause={pause}
          onResume={resume}
          onStop={handleStop}
        />
      </View>
    </View>
  );
}
