import { MoodType, MOODS } from '@/types/walking';
import { Box, Card, Text, HStack, Pressable } from '@/components/ui';

type Props = {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
};

export function MoodSelector({ selectedMood, onSelect }: Props) {
  return (
    <Card variant="elevated" className="w-full p-5">
      <Text className="text-center text-gray-500 font-medium mb-5">
        今の気分は？
      </Text>
      <HStack space="md" className="justify-center flex-wrap">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.type;
          return (
            <Pressable
              key={mood.type}
              onPress={() => onSelect(mood.type)}
              accessibilityLabel={`気分: ${mood.label}`}
              accessibilityState={{ selected: isSelected }}
              className={`w-14 h-14 rounded-2xl items-center justify-center border-2 ${
                isSelected
                  ? 'bg-primary-100 border-primary-500 scale-110'
                  : 'bg-gray-100 border-transparent'
              }`}
            >
              <Text className="text-3xl">{mood.emoji}</Text>
            </Pressable>
          );
        })}
      </HStack>
      {selectedMood && (
        <Box className="self-center mt-4 px-4 py-2 rounded-full bg-primary-100">
          <Text className="text-primary-700 font-medium">
            {MOODS.find(m => m.type === selectedMood)?.label || ''}
          </Text>
        </Box>
      )}
    </Card>
  );
}
