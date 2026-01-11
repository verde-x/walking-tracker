import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { WalkingStats } from '@/components/WalkingStats';
import { MoodSelector } from '@/components/MoodSelector';
import { MoodType } from '@/types/walking';

// MD3 Button specs
const BUTTON_HEIGHT = 40;
const BUTTON_RADIUS = 20; // Full rounded (height / 2)
const ICON_SIZE = 18;

export default function ResultScreen() {
  const router = useRouter();
  const { currentRecord, saveWithMood } = useWalkingContext();
  const { colors, typography, spacing, stateLayerOpacity } = useTheme();
  const [selectedMood, setSelectedMood] = useState<MoodType>();

  useEffect(() => {
    if (!currentRecord) {
      router.replace('/' as never);
    }
  }, [currentRecord, router]);

  const handleSave = async () => {
    await saveWithMood(selectedMood);
    router.replace('/' as never);
  };

  const handleSkip = async () => {
    await saveWithMood(undefined);
    router.replace('/' as never);
  };

  if (!currentRecord) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with success icon */}
      <View style={[styles.header, { paddingTop: spacing.xxxl + 8 }]}>
        <View
          style={[
            styles.successIcon,
            { backgroundColor: colors.primaryContainer },
          ]}
        >
          <Ionicons name="checkmark" size={32} color={colors.onPrimaryContainer} />
        </View>
        <Text
          style={[
            typography.headlineSmall,
            { color: colors.onBackground, marginTop: spacing.md },
          ]}
        >
          お疲れさまでした！
        </Text>
        <Text
          style={[
            typography.bodyMedium,
            { color: colors.onSurfaceVariant, marginTop: spacing.xs },
          ]}
        >
          ウォーキングが完了しました
        </Text>
      </View>

      {/* Stats and Mood */}
      <View style={styles.content}>
        <WalkingStats
          elapsedTime={currentRecord.duration || 0}
          distance={currentRecord.distance || 0}
        />

        <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
      </View>

      {/* Action Buttons - MD3 inline style */}
      <View style={[styles.footer, { paddingBottom: spacing.xxxl }]}>
        <View style={styles.buttonRow}>
          {/* MD3 Text Button (tertiary action) */}
          <Pressable
            onPress={handleSkip}
            accessible={true}
            accessibilityLabel="スキップ"
            accessibilityRole="button"
          >
            {({ pressed }) => (
              <View style={styles.textButton}>
                {pressed && (
                  <View
                    style={[
                      styles.stateLayer,
                      { backgroundColor: colors.primary, opacity: stateLayerOpacity.pressed },
                    ]}
                  />
                )}
                <Text style={[typography.labelLarge, { color: colors.primary }]}>
                  スキップ
                </Text>
              </View>
            )}
          </Pressable>

          {/* MD3 Filled Button (primary action) */}
          <Pressable
            onPress={handleSave}
            accessible={true}
            accessibilityLabel="保存"
            accessibilityRole="button"
          >
            {({ pressed }) => (
              <View
                style={[
                  styles.filledButton,
                  { backgroundColor: colors.primary },
                ]}
              >
                {pressed && (
                  <View
                    style={[
                      styles.stateLayer,
                      { backgroundColor: colors.onPrimary, opacity: stateLayerOpacity.pressed },
                    ]}
                  />
                )}
                <Ionicons name="checkmark" size={ICON_SIZE} color={colors.onPrimary} />
                <Text style={[typography.labelLarge, { color: colors.onPrimary }]}>
                  保存
                </Text>
              </View>
            )}
          </Pressable>
        </View>
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
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  footer: {
    paddingHorizontal: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  filledButton: {
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16, // MD3: with icon
    paddingRight: 24,
    gap: 8,
    overflow: 'hidden',
  },
  textButton: {
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_RADIUS,
    paddingHorizontal: 12, // MD3: text button padding
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stateLayer: {
    ...StyleSheet.absoluteFillObject,
  },
});
