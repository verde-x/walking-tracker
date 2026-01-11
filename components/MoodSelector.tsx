import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MoodType, MOODS } from '@/types/walking';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
};

export function MoodSelector({ selectedMood, onSelect }: Props) {
  const { colors, typography, isDark } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.surfaceContainer : '#FFFFFF',
          borderColor: isDark ? 'transparent' : '#E0E0E0',
          borderWidth: isDark ? 0 : 1,
        },
      ]}
    >
      <Text style={[typography.titleMedium, styles.title, { color: colors.onSurface }]}>
        今の気分は？
      </Text>
      <View style={styles.moodRow}>
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.type;
          return (
            <Pressable
              key={mood.type}
              onPress={() => onSelect(mood.type)}
              accessible={true}
              accessibilityLabel={`気分: ${mood.emoji}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              style={[
                styles.moodButton,
                isSelected ? styles.moodButtonSelected : styles.moodButtonDefault,
              ]}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 280,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  moodButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  moodButtonDefault: {
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  moodButtonSelected: {
    backgroundColor: '#7AF8D8',
    borderWidth: 3,
    borderColor: '#006B5A',
    transform: [{ scale: 1.1 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  emoji: {
    fontSize: 26,
  },
});
