import { Text } from '@/components/ui';
import { MOODS, MoodType } from '@/types/walking';
import { Pressable, View } from 'react-native';

type Props = {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
};

export function MoodSelector({ selectedMood, onSelect }: Props) {
  return (
    <View className="flex-col gap-3 items-start">
      <Text className="text-sm text-muted-foreground mt-8">
        How do you feel?
      </Text>
      <View className="flex-row gap-3 flex-wrap">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.type;
          return (
            <Pressable
              key={mood.type}
              onPress={() => onSelect(mood.type)}
              accessibilityLabel={`気分: ${mood.label}`}
              accessibilityState={{ selected: isSelected }}
              className={`w-14 h-14 rounded-full items-center justify-center ${
                isSelected ? 'bg-primary' : 'bg-secondary active:bg-accent'
              }`}
            >
              <Text className="text-3xl">{mood.emoji}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
