import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { useTheme } from '@/contexts/ThemeContext';
import { WalkingStats } from '@/components/WalkingStats';
import { MoodSelector } from '@/components/MoodSelector';
import { MoodType } from '@/types/walking';

export default function ResultScreen() {
  const router = useRouter();
  const { currentRecord, saveWithMood } = useWalkingContext();
  const { colors, typography, spacing, isDark } = useTheme();
  const [selectedMood, setSelectedMood] = useState<MoodType>();

  const GREEN = '#10B981';
  const GREEN_DARK = '#059669';

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
    <View style={[styles.container, { backgroundColor: isDark ? colors.background : '#FAFAFA' }]}>
      {/* Header with success icon */}
      <View style={[styles.header, { paddingTop: spacing.xxxl }]}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: GREEN,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Ionicons name="checkmark" size={40} color="#FFFFFF" />
        </View>
        <Text
          style={[
            typography.headlineMedium,
            { color: colors.onBackground, fontWeight: '700', marginTop: spacing.md },
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
      <View style={[styles.content, { gap: spacing.lg, paddingHorizontal: spacing.lg }]}>
        <WalkingStats
          elapsedTime={currentRecord.duration || 0}
          distance={currentRecord.distance || 0}
        />

        <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
      </View>

      {/* Action Buttons */}
      <View style={[styles.footer, { gap: spacing.md, paddingBottom: spacing.xxxl }]}>
        {/* Primary Button - Save */}
        <Pressable
          onPress={handleSave}
          accessible={true}
          accessibilityLabel="保存"
          accessibilityRole="button"
        >
          {({ pressed }) => (
            <View
              style={{
                height: 56,
                backgroundColor: pressed ? GREEN_DARK : GREEN,
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 6,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              }}
            >
              <Ionicons name="save-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFFFFF' }}>
                保存する
              </Text>
            </View>
          )}
        </Pressable>

        {/* Secondary Button - Skip */}
        <Pressable
          onPress={handleSkip}
          accessible={true}
          accessibilityLabel="スキップ"
          accessibilityRole="button"
        >
          {({ pressed }) => (
            <View
              style={{
                height: 48,
                borderRadius: 16,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: pressed
                  ? (isDark ? colors.surfaceContainerHigh : '#F0F0F0')
                  : (isDark ? 'transparent' : '#FFFFFF'),
                borderColor: isDark ? colors.outline : '#BDBDBD',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '500', color: colors.onSurface }}>
                スキップ
              </Text>
            </View>
          )}
        </Pressable>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 24,
  },
});
