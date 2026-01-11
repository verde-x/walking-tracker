import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDuration, formatDistance } from '@/utils/format';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  elapsedTime: number;
  distance: number;
};

export function WalkingStats({ elapsedTime, distance }: Props) {
  const { colors, typography, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.surfaceContainer : '#FFFFFF',
          borderColor: isDark ? 'transparent' : '#E0E0E0',
          borderWidth: isDark ? 0 : 1,
        },
      ]}
      accessible={true}
      accessibilityLabel={`経過時間 ${formatDuration(elapsedTime)}, 距離 ${formatDistance(distance)}`}
    >
      {/* Time Stat */}
      <View style={styles.statCard}>
        <View style={styles.timeIconContainer}>
          <Ionicons name="time-outline" size={28} color="#006B5A" />
        </View>
        <View style={styles.statText}>
          <Text style={[typography.labelMedium, { color: colors.onSurfaceVariant }]}>
            経過時間
          </Text>
          <Text style={[typography.headlineLarge, styles.statValue, { color: colors.onSurface }]}>
            {formatDuration(elapsedTime)}
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.outlineVariant }]} />

      {/* Distance Stat */}
      <View style={styles.statCard}>
        <View style={styles.distanceIconContainer}>
          <Ionicons name="footsteps-outline" size={28} color="#4B635B" />
        </View>
        <View style={styles.statText}>
          <Text style={[typography.labelMedium, { color: colors.onSurfaceVariant }]}>
            距離
          </Text>
          <Text style={[typography.headlineLarge, styles.statValue, { color: colors.onSurface }]}>
            {formatDistance(distance)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 280,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  timeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#7AF8D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  distanceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#CDE9DD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statText: {
    flex: 1,
  },
  statValue: {
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
});
