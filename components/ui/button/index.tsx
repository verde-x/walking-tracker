'use client';
import React from 'react';
import { createButton } from '@gluestack-ui/button';
import {
  withStyleContext,
  useStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import type { LucideIcon } from 'lucide-react-native';
import {
  buttonStyle,
  buttonTextStyle,
  buttonIconStyle,
  buttonGroupStyle,
} from './styles';

const SCOPE = 'BUTTON';

const Root = withStyleContext(Pressable, SCOPE);

const UIButton = createButton({
  Root: Root,
  Text,
  Group: View,
  Spinner: ActivityIndicator,
  Icon: View,
});

type IButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof UIButton>,
  'context'
> &
  VariantProps<typeof buttonStyle> & { className?: string };

const Button = React.forwardRef<
  React.ElementRef<typeof UIButton>,
  IButtonProps
>(
  (
    { className, variant = 'solid', size = 'md', action = 'primary', ...props },
    ref
  ) => {
    return (
      <UIButton
        ref={ref}
        {...props}
        className={buttonStyle({ variant, size, action, class: className })}
        context={{ variant, size, action }}
      />
    );
  }
);

type IButtonTextProps = React.ComponentPropsWithoutRef<typeof UIButton.Text> &
  VariantProps<typeof buttonTextStyle> & { className?: string };

const ButtonText = React.forwardRef<
  React.ElementRef<typeof UIButton.Text>,
  IButtonTextProps
>(({ className, variant, size, action, ...props }, ref) => {
  const {
    variant: parentVariant,
    size: parentSize,
    action: parentAction,
  } = useStyleContext(SCOPE);

  return (
    <UIButton.Text
      ref={ref}
      {...props}
      className={buttonTextStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
          action: parentAction,
        },
        variant,
        size,
        action,
        class: className,
      })}
    />
  );
});

const ButtonSpinner = UIButton.Spinner;

type IButtonIconProps = {
  className?: string;
  as: LucideIcon | React.ComponentType<{ size?: number; color?: string }>;
  size?: number;
};

const iconSizes: Record<string, number> = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 18,
  xl: 20,
};

const ButtonIcon = React.forwardRef<React.ElementRef<typeof View>, IButtonIconProps>(
  ({ as: IconComponent, className, size: sizeProp, ...props }, ref) => {
    const {
      variant: parentVariant,
      size: parentSize,
      action: parentAction,
    } = useStyleContext(SCOPE);

    const iconSize = sizeProp ?? iconSizes[parentSize as string] ?? 18;
    const iconColor = parentVariant === 'solid' ? '#FFFFFF' : undefined;

    return (
      <View
        ref={ref}
        className={buttonIconStyle({
          parentVariants: {
            size: parentSize,
            variant: parentVariant,
            action: parentAction,
          },
          class: className,
        })}
        {...props}
      >
        <IconComponent size={iconSize} color={iconColor} />
      </View>
    );
  }
);

type IButtonGroupProps = React.ComponentPropsWithoutRef<typeof UIButton.Group> &
  VariantProps<typeof buttonGroupStyle>;

const ButtonGroup = React.forwardRef<
  React.ElementRef<typeof UIButton.Group>,
  IButtonGroupProps
>(({ className, space = 'md', isAttached = false, ...props }, ref) => {
  return (
    <UIButton.Group
      className={buttonGroupStyle({ class: className, space, isAttached })}
      {...props}
      ref={ref}
    />
  );
});

Button.displayName = 'Button';
ButtonText.displayName = 'ButtonText';
ButtonSpinner.displayName = 'ButtonSpinner';
ButtonIcon.displayName = 'ButtonIcon';
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup };
