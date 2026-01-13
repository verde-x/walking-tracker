import { Clock, MapPin } from 'lucide-react-native';
import { formatDuration, formatDistance } from '@/utils/format';
import { Box, Card, Text, HStack, VStack, Icon } from '@/components/ui';

type Props = {
  elapsedTime: number;
  distance: number;
};

export function WalkingStats({ elapsedTime, distance }: Props) {
  return (
    <VStack
      space="md"
      className="w-full"
      accessible={true}
      accessibilityLabel={`経過時間 ${formatDuration(elapsedTime)}, 距離 ${formatDistance(distance)}`}
    >
      {/* Time Stat Card */}
      <Card variant="elevated" className="p-4">
        <HStack space="lg" className="items-center">
          <Box className="w-14 h-14 items-center justify-center rounded-2xl bg-primary-100">
            <Icon as={Clock} size="lg" color="#0077E6" />
          </Box>
          <VStack space="xs" className="flex-1">
            <Text className="text-sm text-gray-500">経過時間</Text>
            <Text className="text-3xl font-semibold text-gray-900 tracking-tight">
              {formatDuration(elapsedTime)}
            </Text>
          </VStack>
        </HStack>
      </Card>

      {/* Distance Stat Card */}
      <Card variant="elevated" className="p-4">
        <HStack space="lg" className="items-center">
          <Box className="w-14 h-14 items-center justify-center rounded-2xl bg-green-100">
            <Icon as={MapPin} size="lg" color="#22c55e" />
          </Box>
          <VStack space="xs" className="flex-1">
            <Text className="text-sm text-gray-500">距離</Text>
            <Text className="text-3xl font-semibold text-gray-900 tracking-tight">
              {formatDistance(distance)}
            </Text>
          </VStack>
        </HStack>
      </Card>
    </VStack>
  );
}
