import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWalkingContext } from '@/contexts/WalkingContext';
import { WalkingStats } from '@/components/WalkingStats';
import { MoodSelector } from '@/components/MoodSelector';
import { MoodType } from '@/types/walking';
import { Box, Text, HStack, VStack, Icon, Button, ButtonText, ButtonIcon, Pressable } from '@/components/ui';
import { CheckCircle, ChevronLeft, Check } from 'lucide-react-native';

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
    <Box className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <HStack className="px-2 py-3 bg-white items-center shadow-sm">
        <Pressable
          className="p-2 rounded-full active:bg-gray-100"
          onPress={() => router.replace('/' as never)}
        >
          <Icon as={ChevronLeft} size="md" color="#374151" />
        </Pressable>
        <Text className="text-lg font-semibold text-gray-900 ml-2">ウォーキング完了</Text>
      </HStack>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <VStack className="items-center py-8 px-6 bg-primary-100 mb-2" space="md">
          <Box className="mb-2">
            <Icon as={CheckCircle} size="2xl" color="#0077E6" />
          </Box>
          <Text className="text-xl font-semibold text-primary-900">
            お疲れさまでした！
          </Text>
          <Text className="text-primary-700 opacity-80">
            ウォーキングが完了しました
          </Text>
        </VStack>

        {/* Stats */}
        <Box className="px-4 py-4">
          <Text className="text-base font-semibold text-gray-900 mb-3 ml-1">
            記録
          </Text>
          <WalkingStats
            elapsedTime={currentRecord.duration || 0}
            distance={currentRecord.distance || 0}
          />
        </Box>

        {/* Mood Selector */}
        <Box className="px-4 py-2">
          <Text className="text-base font-semibold text-gray-900 mb-3 ml-1">
            気分を記録
          </Text>
          <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
        </Box>
      </ScrollView>

      {/* Action Buttons */}
      <HStack
        className="px-4 pt-4 bg-white justify-end shadow-lg"
        space="md"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <Button
          action="secondary"
          variant="outline"
          onPress={handleSkip}
          className="min-w-24"
        >
          <ButtonText>スキップ</ButtonText>
        </Button>
        <Button
          action="primary"
          onPress={handleSave}
          className="min-w-24"
        >
          <ButtonIcon as={Check} />
          <ButtonText>保存</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
}
