import { View, ViewProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledView = cssInterop(View, { className: 'style' });

export interface BoxProps extends ViewProps {
  className?: string;
}

export function Box({ className, ...props }: BoxProps) {
  return <StyledView className={className} {...props} />;
}
