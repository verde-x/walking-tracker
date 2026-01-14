import { Pressable, Text } from '@/components/ui';
import { Play, Square } from 'lucide-react-native';
import { View } from 'react-native';

type Props = {
  isWalking: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function WalkingButton({ isWalking, onStart, onStop }: Props) {
  return (
    <Pressable
      onPress={isWalking ? onStop : onStart}
      accessibilityLabel={isWalking ? 'ウォーキングを終了する' : 'ウォーキングを開始する'}
      accessibilityRole="button"
      className={`flex-row items-center justify-center gap-3 rounded-full px-8 py-4 ${
        isWalking
          ? 'bg-on-surface'
          : 'bg-on-surface'
      }`}
    >
      <View>
        {isWalking ? (
          <Square size={20} color="#EFEFEF" fill="#EFEFEF" />
        ) : (
          <Play size={20} color="#EFEFEF" fill="#EFEFEF" />
        )}
      </View>
      <Text className="text-body-large font-medium text-surface">
        {isWalking ? 'End' : 'Start'}
      </Text>
    </Pressable>
  );
}
