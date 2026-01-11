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
  const { colors, typography, spacing, isDark } = useTheme();

  const handleStop = () => {
    stop();
    router.push('/result' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.background : '#FAFAFA' }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: spacing.xxxl, paddingHorizontal: spacing.lg }]}>
        <View style={styles.titleRow}>
          <View style={styles.iconBadge}>
            <Ionicons name="walk" size={28} color="#FFFFFF" />
          </View>
          <Text
            style={[
              typography.headlineMedium,
              { color: colors.onBackground, fontWeight: '700', marginLeft: spacing.sm },
            ]}
          >
            ウォーキング
          </Text>
        </View>
        <Text
          style={[
            typography.bodyMedium,
            { color: colors.onSurfaceVariant, marginTop: spacing.xs },
          ]}
        >
          {state === 'walking' ? '記録中...' : '開始ボタンを押してウォーキングを始めましょう'}
        </Text>
      </View>

      {/* Main Content */}
      <View style={[styles.content, { gap: spacing.xl }]}>
        {state === 'walking' && (
          <WalkingStats elapsedTime={elapsedTime} distance={distance} />
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
              {
                backgroundColor: isDark ? colors.surfaceContainer : '#FFFFFF',
                borderColor: isDark ? 'transparent' : '#E0E0E0',
                borderWidth: isDark ? 0 : 1,
              },
            ]}
          >
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
            <Text
              style={[
                typography.bodySmall,
                { color: colors.onSurfaceVariant, marginLeft: spacing.sm, flex: 1 },
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
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  footer: {
    paddingHorizontal: 24,
  },
  hintCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
