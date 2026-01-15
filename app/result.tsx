import { MoodSelector } from '@/components/MoodSelector';
import { Text } from '@/components/ui';
import { WalkingStats } from '@/components/WalkingStats';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { MoodType } from '@/types/walking';
import { useRouter } from 'expo-router';
import { Check, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ResultScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentRecord, saveWithMood } = useWalkingContext();
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
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Main Content */}
      <View className="flex-1 flex-col gap-6 w-full px-8 justify-center">
        {/* Header */}
        <Text
          className="text-foreground mb-8 w-full"
          style={{ fontSize: 44, fontWeight: '600', lineHeight: 60 }}
        >
          Great Job!
        </Text>

        {/* Stats */}
        <WalkingStats
          elapsedTime={currentRecord.duration || 0}
          distance={currentRecord.distance || 0}
        />

        {/* Mood Selector */}
        <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
      </View>

      {/* Action Buttons - Fixed at bottom */}
      <View className="flex-row justify-center gap-4 pb-8 px-8">
        <Pressable
          onPress={handleSkip}
          accessibilityLabel="スキップ"
          accessibilityRole="button"
          className="flex-row items-center justify-center gap-2 rounded-full px-6 py-4 bg-secondary"
        >
          <View>
            <X size={20} color="hsl(240 5.9% 10%)" />
          </View>
          <Text className="text-base font-medium text-secondary-foreground">
            Skip
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          accessibilityLabel="保存"
          accessibilityRole="button"
          className="flex-row items-center justify-center gap-2 rounded-full px-6 py-4 bg-primary"
        >
          <View>
            <Check size={20} color="hsl(0 0% 98%)" />
          </View>
          <Text className="text-base font-medium text-primary-foreground">
            Save
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
