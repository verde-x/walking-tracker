import { cn } from '@/lib/utils';
import { Pressable as RNPressable, type PressableProps as RNPressableProps } from 'react-native';

interface PressableProps extends RNPressableProps {
  className?: string;
}

export function Pressable({ className, ...props }: PressableProps) {
  return <RNPressable className={cn(className)} {...props} />;
}
