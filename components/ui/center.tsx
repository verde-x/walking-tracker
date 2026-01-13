import { View, ViewProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledView = cssInterop(View, { className: 'style' });

export interface CenterProps extends ViewProps {
  className?: string;
}

export function Center({ className, ...props }: CenterProps) {
  return (
    <StyledView
      className={`items-center justify-center ${className || ''}`}
      {...props}
    />
  );
}
