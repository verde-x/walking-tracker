import { Text } from '@/components/ui';
import { formatDistanceWithUnit, formatDuration } from '@/utils/format';
import { View } from 'react-native';

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
    <View className="flex-col items-start">
      <Text className="text-sm text-muted-foreground mb-1">{label}</Text>
      <View className="flex-row items-baseline">
        <Text
          className="text-foreground"
          style={{ fontSize: 72, lineHeight: 80, fontWeight: '300' }}
        >
          {value}
        </Text>
        {unit && (
          <Text
            className="text-muted-foreground ml-2"
            style={{ fontSize: 24, lineHeight: 32 }}
          >
            {unit}
          </Text>
        )}
      </View>
    </View>
  );
}

export function WalkingStats({ elapsedTime, distance }: Props) {
  const { value: distanceValue, unit: distanceUnit } = formatDistanceWithUnit(distance);

  return (
    <View
      className="flex-col gap-6 w-full"
      accessible={true}
      accessibilityLabel={`経過時間 ${formatDuration(elapsedTime)}, 距離 ${distanceValue} ${distanceUnit}`}
    >
      <StatItem label="Distance" value={distanceValue} unit={distanceUnit} />
      <StatItem label="Time" value={formatDuration(elapsedTime)} />
    </View>
  );
}
