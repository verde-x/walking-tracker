import { WalkingButton } from '@/components/WalkingButton';
import { WalkingStats } from '@/components/WalkingStats';
import { Box, Text, Card, HStack, VStack, Icon, Center, Pressable } from '@/components/ui';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { useRouter } from 'expo-router';
import { Footprints, Settings, MapPin, PersonStanding } from 'lucide-react-native';
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
    <Box className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <HStack className="px-4 py-3 bg-white justify-between items-center shadow-sm">
        <Text className="text-xl font-semibold text-gray-900">Walking Tracker</Text>
        <Pressable className="p-2 rounded-full active:bg-gray-100">
          <Icon as={Settings} size="md" color="#6b7280" />
        </Pressable>
      </HStack>

      {/* Status Banner */}
      <HStack className="py-3 px-4 bg-gray-100 justify-center items-center" space="sm">
        <Icon
          as={state === 'walking' ? Footprints : PersonStanding}
          size="sm"
          color="#6b7280"
        />
        <Text className="text-gray-600">
          {state === 'walking' ? '記録中...' : 'ウォーキングを始めましょう'}
        </Text>
      </HStack>

      {/* Main Content */}
      <Center className="flex-1 px-6 gap-8">
        {state === 'walking' ? (
          <WalkingStats elapsedTime={elapsedTime} distance={distance} />
        ) : (
          <Card variant="elevated" className="w-full max-w-xs py-6 px-4">
            <VStack space="lg" className="items-center">
              <Icon as={PersonStanding} size="2xl" color="#0077E6" />
              <Text className="text-xl font-semibold text-gray-900 mt-2">
                さあ、歩きましょう！
              </Text>
              <Text className="text-gray-500 text-center">
                下のボタンを押して{'\n'}ウォーキングを開始してください
              </Text>
            </VStack>
          </Card>
        )}

        <WalkingButton
          isWalking={state === 'walking'}
          onStart={start}
          onStop={handleStop}
        />
      </Center>

      {/* Footer Info Card */}
      <Box className="px-4" style={{ paddingBottom: insets.bottom + 16 }}>
        {state !== 'walking' && (
          <Card variant="outline" className="p-4 mb-2">
            <HStack space="md" className="items-center">
              <Icon as={MapPin} size="md" color="#22c55e" />
              <Text className="text-gray-500 text-sm flex-1">
                歩行中は位置情報を使って距離を計測します
              </Text>
            </HStack>
          </Card>
        )}
      </Box>
    </Box>
  );
}
