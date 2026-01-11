import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  isWalking: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function WalkingButton({ isWalking, onStart, onStop }: Props) {
  const GREEN = '#10B981';
  const GREEN_DARK = '#059669';
  const RED = '#EF4444';
  const RED_DARK = '#DC2626';

  return (
    <Pressable
      onPress={isWalking ? onStop : onStart}
      accessible={true}
      accessibilityLabel={isWalking ? 'ウォーキングを終了する' : 'ウォーキングを開始する'}
      accessibilityRole="button"
    >
      {({ pressed }) => (
        <View
          style={{
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: isWalking
              ? (pressed ? RED_DARK : RED)
              : (pressed ? GREEN_DARK : GREEN),
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          }}
        >
          <Ionicons
            name={isWalking ? 'stop' : 'play'}
            size={48}
            color="#FFFFFF"
            style={{ marginBottom: 8 }}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            {isWalking ? '終了' : '開始'}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
