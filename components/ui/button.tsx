import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View, type PressableProps } from 'react-native';

const variantStyles = {
  solid: 'bg-primary active:bg-primary/90',
  outline: 'border border-outline bg-transparent active:bg-surface-container',
  ghost: 'bg-transparent active:bg-surface-container',
} as const;

const actionStyles = {
  primary: '',
  secondary: '',
  error: 'bg-error active:bg-error/90',
} as const;

interface ButtonProps extends PressableProps {
  className?: string;
  variant?: keyof typeof variantStyles;
  action?: keyof typeof actionStyles;
}

export function Button({
  className,
  variant = 'solid',
  action = 'primary',
  children,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(
        'flex-row items-center justify-center gap-2 rounded-full px-6 py-3',
        variantStyles[variant],
        action === 'error' && actionStyles[action],
        className
      )}
      {...props}
    >
      {children}
    </Pressable>
  );
}

interface ButtonTextProps {
  className?: string;
  children: React.ReactNode;
}

export function ButtonText({ className, children }: ButtonTextProps) {
  return (
    <Text className={cn('text-base font-medium text-primary-on', className)}>
      {children}
    </Text>
  );
}

interface ButtonIconProps {
  as: LucideIcon;
  className?: string;
}

export function ButtonIcon({ as: IconComponent, className }: ButtonIconProps) {
  return (
    <View className={className}>
      <IconComponent size={20} color="#FFFFFF" />
    </View>
  );
}
