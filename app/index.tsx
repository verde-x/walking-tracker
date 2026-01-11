import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { WalkingButton } from '@/components/WalkingButton';
import { WalkingStats } from '@/components/WalkingStats';

export default function HomeScreen() {
  const router = useRouter();
  const { state, elapsedTime, distance, start, stop } = useWalkingContext();
  const { colors, typography, spacing, elevation, shape } = useTheme();

  const handleStop = () => {
    stop();
    router.push('/result' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: spacing.xxxl + 16 }]}>
        <View style={styles.titleRow}>
          <View
            style={[
              styles.iconBadge,
              { backgroundColor: colors.primaryContainer },
            ]}
          >
            <Ionicons name="walk" size={24} color={colors.onPrimaryContainer} />
          </View>
          <Text
            style={[
              typography.headlineSmall,
              { color: colors.onBackground, marginLeft: spacing.sm },
            ]}
          >
            ウォーキング
          </Text>
        </View>
        <Text
          style={[
            typography.bodyMedium,
            { color: colors.onSurfaceVariant, marginTop: spacing.xs, textAlign: 'center' },
          ]}
        >
          {state === 'walking' ? '記録中...' : '開始ボタンを押してウォーキングを始めましょう'}
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {state === 'walking' && (
          <View style={styles.statsContainer}>
            <WalkingStats elapsedTime={elapsedTime} distance={distance} />
          </View>
        )}

        <WalkingButton
          isWalking={state === 'walking'}
          onStart={start}
          onStop={handleStop}
        />
      </View>

      {/* Footer hint */}
      <View style={[styles.footer, { paddingBottom: spacing.xxxl }]}>
        {state !== 'walking' && (
          <View
            style={[
              styles.hintCard,
              elevation[1],
              {
                backgroundColor: colors.surfaceContainerHigh,
                borderRadius: shape.medium,
              },
            ]}
          >
            <View
              style={[
                styles.hintIconContainer,
                { backgroundColor: colors.tertiaryContainer },
              ]}
            >
              <Ionicons name="location-outline" size={18} color={colors.onTertiaryContainer} />
            </View>
            <Text
              style={[
                typography.bodySmall,
                { color: colors.onSurfaceVariant, flex: 1 },
              ]}
            >
              歩行中は位置情報を使って距離を計測します
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12, // shape.medium
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 32,
  },
  statsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 24,
  },
  hintCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  hintIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
