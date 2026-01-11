import { useEffect } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  isWalking: boolean;
  onStart: () => void;
  onStop: () => void;
};

// MD3 FAB Sizes: Regular (56dp), Medium (80dp), Large (96dp)
const FAB_SIZE = 96; // Large FAB

export function WalkingButton({ isWalking, onStart, onStop }: Props) {
  const { colors, elevation, stateLayerOpacity } = useTheme();
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (isWalking) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 1000, easing: Easing.out(Easing.ease) }),
          withTiming(1, { duration: 0 })
        ),
        -1
      );
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) }),
          withTiming(0.3, { duration: 0 })
        ),
        -1
      );
    } else {
      pulseScale.value = withTiming(1, { duration: 200 });
      pulseOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isWalking, pulseScale, pulseOpacity]);

  const pulseRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  // MD3 FAB colors: primaryContainer/onPrimaryContainer (default)
  // For stop action: errorContainer/onErrorContainer
  const containerColor = isWalking ? colors.errorContainer : colors.primaryContainer;
  const contentColor = isWalking ? colors.onErrorContainer : colors.onPrimaryContainer;

  return (
    <View style={styles.wrapper}>
      {/* Pulse ring for walking state */}
      {isWalking && (
        <Animated.View
          style={[
            styles.pulseRing,
            pulseRingStyle,
            { backgroundColor: colors.errorContainer },
          ]}
        />
      )}

      <Pressable
        onPress={isWalking ? onStop : onStart}
        accessible={true}
        accessibilityLabel={isWalking ? 'ウォーキングを終了する' : 'ウォーキングを開始する'}
        accessibilityRole="button"
      >
        {({ pressed }) => (
          <View
            style={[
              styles.fab,
              elevation[3],
              { backgroundColor: containerColor },
            ]}
          >
            {/* MD3 State layer overlay */}
            {pressed && (
              <View
                style={[
                  styles.stateLayer,
                  { backgroundColor: contentColor, opacity: stateLayerOpacity.pressed },
                ]}
              />
            )}

            <Ionicons
              name={isWalking ? 'stop' : 'play'}
              size={36}
              color={contentColor}
            />
            <Text style={[styles.label, { color: contentColor }]}>
              {isWalking ? '終了' : '開始'}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: FAB_SIZE + 40,
    height: FAB_SIZE + 40,
  },
  pulseRing: {
    position: 'absolute',
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: 28, // MD3 Large FAB uses extraLarge shape (28dp)
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stateLayer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginTop: 4,
  },
});
