import { useEffect } from 'react';
import { Play, Square } from 'lucide-react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Button, ButtonText, ButtonIcon, Box } from '@/components/ui';

type Props = {
  isWalking: boolean;
  onStart: () => void;
  onStop: () => void;
};

const FAB_SIZE = 80;

export function WalkingButton({ isWalking, onStart, onStop }: Props) {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (isWalking) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.4, { duration: 1200, easing: Easing.out(Easing.ease) }),
          withTiming(1, { duration: 0 })
        ),
        -1
      );
      pulseOpacity.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 1200, easing: Easing.out(Easing.ease) }),
          withTiming(0.4, { duration: 0 })
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

  return (
    <Box className="items-center justify-center w-36 h-36">
      {/* Pulse ring for walking state */}
      {isWalking && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: FAB_SIZE,
              height: FAB_SIZE,
              borderRadius: 28,
              backgroundColor: '#dc2626',
            },
            pulseRingStyle,
          ]}
        />
      )}

      <Button
        action={isWalking ? 'negative' : 'primary'}
        size="xl"
        onPress={isWalking ? onStop : onStart}
        className="rounded-3xl min-w-32"
        accessibilityLabel={isWalking ? 'ウォーキングを終了する' : 'ウォーキングを開始する'}
      >
        <ButtonIcon as={isWalking ? Square : Play} />
        <ButtonText>{isWalking ? 'END' : 'START'}</ButtonText>
      </Button>
    </Box>
  );
}
