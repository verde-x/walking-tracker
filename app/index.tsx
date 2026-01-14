import { WalkingButton } from '@/components/WalkingButton';
import { WalkingStats } from '@/components/WalkingStats';
import { Box, Text, VStack } from '@/components/ui';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { state, elapsedTime, distance, start, stop } = useWalkingContext();

  const handleStop = () => {
    stop();
    router.push('/result' as never);
  };

  return (
    <Box
      className="flex-1 bg-surface"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Main Content - Left aligned minimal design */}
      <VStack className="flex-1 px-8 justify-center" space="xl">
        {/* Header */}
        <Text
          className="text-on-surface mb-12"
          style={{ fontSize: 36, fontWeight: '600' }}
        >
          Walking Tracker
        </Text>

        {/* Stats */}
        <WalkingStats elapsedTime={elapsedTime} distance={distance} />
      </VStack>

      {/* Action Button - Fixed at bottom */}
      <Box className="items-center pb-8 px-8">
        <WalkingButton
          isWalking={state === 'walking'}
          onStart={start}
          onStop={handleStop}
        />
      </Box>
    </Box>
  );
}
