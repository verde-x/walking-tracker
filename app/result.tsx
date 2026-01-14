import { MoodSelector } from '@/components/MoodSelector';
import { Box, Pressable, Text, VStack } from '@/components/ui';
import { WalkingStats } from '@/components/WalkingStats';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { MoodType } from '@/types/walking';
import { useRouter } from 'expo-router';
import { Check, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
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
    <Box
      className="flex-1 bg-surface"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Main Content - Left aligned minimal design */}
      <VStack className="flex-1 px-8 justify-center" space="xl">
        {/* Header */}
        <Text
          className="text-on-surface mb-12"
          style={{ fontSize: 36, fontWeight: '600' }}
        >
          Great Job!
        </Text>

        {/* Stats */}
        <WalkingStats
          elapsedTime={currentRecord.duration || 0}
          distance={currentRecord.distance || 0}
        />

        {/* Mood Selector */}
        <MoodSelector
         selectedMood={selectedMood} onSelect={setSelectedMood} />
      </VStack>

      {/* Action Buttons - Fixed at bottom */}
      <Box className="flex-row justify-center gap-4 pb-8 px-8">
        <Pressable
          onPress={handleSkip}
          accessibilityLabel="スキップ"
          accessibilityRole="button"
          className="flex-row items-center justify-center gap-2 rounded-full px-6 py-4 bg-surface-container-high"
        >
          <View>
            <X size={20} color="#161D1B" />
          </View>
          <Text className="text-body-large font-medium text-on-surface">
            Skip
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSave}
          accessibilityLabel="保存"
          accessibilityRole="button"
          className="flex-row items-center justify-center gap-2 rounded-full px-6 py-4 bg-on-surface"
        >
          <View>
            <Check size={20} color="#EFEFEF" />
          </View>
          <Text className="text-body-large font-medium text-surface">
            Save
          </Text>
        </Pressable>
      </Box>
    </Box>
  );
}
