import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDuration, formatDistance } from '@/utils/format';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  elapsedTime: number;
  distance: number;
};

export function WalkingStats({ elapsedTime, distance }: Props) {
  const { colors, typography, shape } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          // MD3 Filled Card: surfaceContainerHighest, no shadow
          backgroundColor: colors.surfaceContainerHighest,
          borderRadius: shape.medium, // 12dp
        },
      ]}
      accessible={true}
      accessibilityLabel={`経過時間 ${formatDuration(elapsedTime)}, 距離 ${formatDistance(distance)}`}
    >
      {/* Time Stat */}
      <View style={styles.statCard}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: colors.primaryContainer,
              borderRadius: shape.medium,
            },
          ]}
        >
          <Ionicons name="time-outline" size={24} color={colors.onPrimaryContainer} />
        </View>
        <View style={styles.statText}>
          <Text style={[typography.labelMedium, { color: colors.onSurfaceVariant }]}>
            経過時間
          </Text>
          <Text style={[typography.headlineMedium, { color: colors.onSurface }]}>
            {formatDuration(elapsedTime)}
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />

      {/* Distance Stat */}
      <View style={styles.statCard}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: colors.secondaryContainer,
              borderRadius: shape.medium,
            },
          ]}
        >
          <Ionicons name="footsteps-outline" size={24} color={colors.onSecondaryContainer} />
        </View>
        <View style={styles.statText}>
          <Text style={[typography.labelMedium, { color: colors.onSurfaceVariant }]}>
            距離
          </Text>
          <Text style={[typography.headlineMedium, { color: colors.onSurface }]}>
            {formatDistance(distance)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 320,
    padding: 16, // MD3 card padding
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statText: {
    flex: 1,
    gap: 2,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
});
