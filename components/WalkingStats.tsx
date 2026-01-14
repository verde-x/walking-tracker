import { formatDuration, formatDistanceWithUnit } from '@/utils/format';
import { HStack, Text, VStack } from '@/components/ui';

type Props = {
  elapsedTime: number;
  distance: number;
};

type StatItemProps = {
  label: string;
  value: string;
  unit?: string;
};

function StatItem({ label, value, unit }: StatItemProps) {
  return (
    <VStack className="items-start">
      <Text className="text-body-medium text-on-surface-variant mb-1">{label}</Text>
      <HStack className="items-baseline">
        <Text
          className="text-on-surface"
          style={{ fontSize: 72, lineHeight: 80, fontWeight: '300' }}
        >
          {value}
        </Text>
        {unit && (
          <Text
            className="text-on-surface-variant ml-2"
            style={{ fontSize: 24, lineHeight: 32 }}
          >
            {unit}
          </Text>
        )}
      </HStack>
    </VStack>
  );
}

export function WalkingStats({ elapsedTime, distance }: Props) {
  const { value: distanceValue, unit: distanceUnit } = formatDistanceWithUnit(distance);

  return (
    <VStack
      className="w-full"
      space="xl"
      accessible={true}
      accessibilityLabel={`経過時間 ${formatDuration(elapsedTime)}, 距離 ${distanceValue} ${distanceUnit}`}
    >
      <StatItem label="Distance" value={distanceValue} unit={distanceUnit} />
      <StatItem label="Time" value={formatDuration(elapsedTime)} />
    </VStack>
  );
}
