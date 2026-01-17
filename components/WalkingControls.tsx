import { Text } from '@/components/ui';
import { WalkingState } from '@/types/walking';
import { Pause, Play, Square } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type Props = {
  state: WalkingState;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
};

export function WalkingControls({ state, onStart, onPause, onResume, onStop }: Props) {
  if (state === 'idle' || state === 'finished') {
    return (
      <Pressable
        onPress={onStart}
        accessibilityLabel="Start walking"
        accessibilityRole="button"
        className="flex-row items-center justify-center gap-3 rounded-full px-8 py-4 bg-primary"
      >
        <View>
          <Play size={20} color="hsl(0 0% 98%)" fill="hsl(0 0% 98%)" />
        </View>
        <Text className="text-base font-medium text-primary-foreground">
          Start
        </Text>
      </Pressable>
    );
  }

  if (state === 'walking') {
    return (
      <View className="flex-row gap-4">
        <Pressable
          onPress={onPause}
          accessibilityLabel="Pause walking"
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center gap-3 rounded-full px-6 py-4 bg-secondary"
        >
          <View>
            <Pause size={20} color="hsl(240 5.9% 10%)" fill="hsl(240 5.9% 10%)" />
          </View>
          <Text className="text-base font-medium text-secondary-foreground">
            Pause
          </Text>
        </Pressable>
        <Pressable
          onPress={onStop}
          accessibilityLabel="End walking"
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center gap-3 rounded-full px-6 py-4 bg-primary"
        >
          <View>
            <Square size={20} color="hsl(0 0% 98%)" fill="hsl(0 0% 98%)" />
          </View>
          <Text className="text-base font-medium text-primary-foreground">
            End
          </Text>
        </Pressable>
      </View>
    );
  }

  if (state === 'paused') {
    return (
      <View className="flex-row gap-4">
        <Pressable
          onPress={onResume}
          accessibilityLabel="Resume walking"
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center gap-3 rounded-full px-6 py-4 bg-primary"
        >
          <View>
            <Play size={20} color="hsl(0 0% 98%)" fill="hsl(0 0% 98%)" />
          </View>
          <Text className="text-base font-medium text-primary-foreground">
            Resume
          </Text>
        </Pressable>
        <Pressable
          onPress={onStop}
          accessibilityLabel="End walking"
          accessibilityRole="button"
          className="flex-1 flex-row items-center justify-center gap-3 rounded-full px-6 py-4 bg-secondary"
        >
          <View>
            <Square size={20} color="hsl(240 5.9% 10%)" fill="hsl(240 5.9% 10%)" />
          </View>
          <Text className="text-base font-medium text-secondary-foreground">
            End
          </Text>
        </Pressable>
      </View>
    );
  }

  return null;
}
