import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cssInterop } from 'nativewind';

const StyledText = cssInterop(RNText, { className: 'style' });

export interface TextProps extends RNTextProps {
  className?: string;
}

export function Text({ className, ...props }: TextProps) {
  return <StyledText className={className} {...props} />;
}
