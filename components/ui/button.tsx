import { Pressable, PressableProps, Text as RNText, View } from 'react-native';
import { cssInterop } from 'nativewind';
import { ReactNode, createContext, useContext } from 'react';

const StyledPressable = cssInterop(Pressable, { className: 'style' });
const StyledText = cssInterop(RNText, { className: 'style' });
const StyledView = cssInterop(View, { className: 'style' });

type ButtonAction = 'primary' | 'secondary' | 'positive' | 'negative';
type ButtonVariant = 'solid' | 'outline' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonContextValue {
  action: ButtonAction;
  variant: ButtonVariant;
  size: ButtonSize;
  isPressed: boolean;
  isDisabled: boolean;
}

const ButtonContext = createContext<ButtonContextValue>({
  action: 'primary',
  variant: 'solid',
  size: 'md',
  isPressed: false,
  isDisabled: false,
});

const useButtonContext = () => useContext(ButtonContext);

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  className?: string;
  action?: ButtonAction;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  children?: ReactNode;
}

const actionClasses: Record<ButtonAction, Record<ButtonVariant, string>> = {
  primary: {
    solid: 'bg-primary-500 active:bg-primary-600',
    outline: 'border-2 border-primary-500 active:bg-primary-50',
    link: 'active:opacity-70',
  },
  secondary: {
    solid: 'bg-gray-500 active:bg-gray-600',
    outline: 'border-2 border-gray-500 active:bg-gray-50',
    link: 'active:opacity-70',
  },
  positive: {
    solid: 'bg-green-500 active:bg-green-600',
    outline: 'border-2 border-green-500 active:bg-green-50',
    link: 'active:opacity-70',
  },
  negative: {
    solid: 'bg-red-500 active:bg-red-600',
    outline: 'border-2 border-red-500 active:bg-red-50',
    link: 'active:opacity-70',
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 rounded',
  sm: 'px-4 py-2 rounded-md',
  md: 'px-5 py-2.5 rounded-lg',
  lg: 'px-6 py-3 rounded-lg',
  xl: 'px-8 py-4 rounded-xl',
};

export function Button({
  className,
  action = 'primary',
  variant = 'solid',
  size = 'md',
  isDisabled = false,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = `flex-row items-center justify-center gap-2 ${actionClasses[action][variant]} ${sizeClasses[size]} ${isDisabled ? 'opacity-50' : ''}`;

  return (
    <StyledPressable
      className={`${baseClasses} ${className || ''}`}
      disabled={isDisabled}
      {...props}
    >
      {({ pressed }) => (
        <ButtonContext.Provider
          value={{ action, variant, size, isPressed: pressed, isDisabled }}
        >
          {children}
        </ButtonContext.Provider>
      )}
    </StyledPressable>
  );
}

export interface ButtonTextProps {
  className?: string;
  children?: ReactNode;
}

const textSizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const textColorClasses: Record<ButtonAction, Record<ButtonVariant, string>> = {
  primary: {
    solid: 'text-white',
    outline: 'text-primary-500',
    link: 'text-primary-500',
  },
  secondary: {
    solid: 'text-white',
    outline: 'text-gray-500',
    link: 'text-gray-500',
  },
  positive: {
    solid: 'text-white',
    outline: 'text-green-500',
    link: 'text-green-500',
  },
  negative: {
    solid: 'text-white',
    outline: 'text-red-500',
    link: 'text-red-500',
  },
};

export function ButtonText({ className, children }: ButtonTextProps) {
  const { action, variant, size } = useButtonContext();

  return (
    <StyledText
      className={`font-semibold ${textSizeClasses[size]} ${textColorClasses[action][variant]} ${className || ''}`}
    >
      {children}
    </StyledText>
  );
}

export interface ButtonIconProps {
  as: React.ComponentType<{ size?: number; color?: string }>;
  className?: string;
}

const iconSizes: Record<ButtonSize, number> = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

const iconColors: Record<ButtonAction, Record<ButtonVariant, string>> = {
  primary: {
    solid: '#ffffff',
    outline: '#0077E6',
    link: '#0077E6',
  },
  secondary: {
    solid: '#ffffff',
    outline: '#6b7280',
    link: '#6b7280',
  },
  positive: {
    solid: '#ffffff',
    outline: '#22c55e',
    link: '#22c55e',
  },
  negative: {
    solid: '#ffffff',
    outline: '#ef4444',
    link: '#ef4444',
  },
};

export function ButtonIcon({ as: Icon, className }: ButtonIconProps) {
  const { action, variant, size } = useButtonContext();

  return (
    <StyledView className={className}>
      <Icon size={iconSizes[size]} color={iconColors[action][variant]} />
    </StyledView>
  );
}
