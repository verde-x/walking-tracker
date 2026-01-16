import { Text } from '@/components/ui';
import { Play, Square } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type Props = {
  isWalking: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function WalkingButton({ isWalking, onStart, onStop }: Props) {
  return (
    <Pressable
      onPress={isWalking ? onStop : onStart}
      accessibilityLabel={isWalking ? 'End walking' : 'Start walking'}
      accessibilityRole="button"
      className="flex-row items-center justify-center gap-3 rounded-full px-8 py-4 bg-primary"
    >
      <View>
        {isWalking ? (
          <Square size={20} color="hsl(0 0% 98%)" fill="hsl(0 0% 98%)" />
        ) : (
          <Play size={20} color="hsl(0 0% 98%)" fill="hsl(0 0% 98%)" />
        )}
      </View>
      <Text className="text-base font-medium text-primary-foreground">
        {isWalking ? 'End' : 'Start'}
      </Text>
    </Pressable>
  );
}
