import { HStack, Pressable, Text, VStack } from '@/components/ui';
import { MOODS, MoodType } from '@/types/walking';

type Props = {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
};

export function MoodSelector({ selectedMood, onSelect }: Props) {
  return (
    <VStack className="items-start" space="md">
      <Text className="text-body-medium text-on-surface-variant mt-8">
        How do you feel?
      </Text>
      <HStack space="md" className="flex-wrap">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.type;
          return (
            <Pressable
              key={mood.type}
              onPress={() => onSelect(mood.type)}
              accessibilityLabel={`気分: ${mood.label}`}
              accessibilityState={{ selected: isSelected }}
              className={`w-14 h-14 rounded-full items-center justify-center ${
                isSelected
                  ? 'bg-on-surface'
                  : 'bg-surface-container-high active:bg-surface-container-highest'
              }`}
            >
              <Text className="text-3xl">{mood.emoji}</Text>
            </Pressable>
          );
        })}
      </HStack>
    </VStack>
  );
}
