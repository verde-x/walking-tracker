import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MoodType, MOODS } from '@/types/walking';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
};

export function MoodSelector({ selectedMood, onSelect }: Props) {
  const { colors, typography, shape, stateLayerOpacity } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          // MD3 Filled Card: surfaceContainerHighest, no shadow
          backgroundColor: colors.surfaceContainerHighest,
          borderRadius: shape.medium, // 12dp
        },
      ]}
    >
      <Text style={[typography.titleSmall, styles.title, { color: colors.onSurface }]}>
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
              accessibilityLabel={`気分: ${mood.label}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              {({ pressed }) => (
                <View
                  style={[
                    styles.moodButton,
                    {
                      backgroundColor: isSelected
                        ? colors.secondaryContainer
                        : colors.surfaceContainerHigh,
                      borderColor: isSelected ? colors.secondary : 'transparent',
                      borderWidth: isSelected ? 2 : 0,
                      borderRadius: shape.large, // 16dp
                    },
                  ]}
                >
                  {/* MD3 State layer */}
                  {pressed && (
                    <View
                      style={[
                        styles.stateLayer,
                        {
                          backgroundColor: isSelected
                            ? colors.onSecondaryContainer
                            : colors.onSurface,
                          opacity: stateLayerOpacity.pressed,
                          borderRadius: shape.large,
                        },
                      ]}
                    />
                  )}
                  <Text style={styles.emoji}>{mood.emoji}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
      {selectedMood && (
        <View
          style={[
            styles.selectedLabel,
            {
              backgroundColor: colors.secondaryContainer,
              borderRadius: shape.small, // 8dp
            },
          ]}
        >
          <Text style={[typography.labelSmall, { color: colors.onSecondaryContainer }]}>
            {MOODS.find(m => m.type === selectedMood)?.label || ''}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 320,
    padding: 16, // MD3 card padding
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
    width: 48, // MD3 touch target minimum
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stateLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  emoji: {
    fontSize: 22,
  },
  selectedLabel: {
    alignSelf: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
