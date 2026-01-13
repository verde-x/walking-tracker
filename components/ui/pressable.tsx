import { Pressable as RNPressable, PressableProps as RNPressableProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledPressable = cssInterop(RNPressable, { className: 'style' });

export interface PressableProps extends RNPressableProps {
  className?: string;
}

export function Pressable({ className, ...props }: PressableProps) {
  return <StyledPressable className={className} {...props} />;
}
