---
name: material-design
description: Create modern, beautiful UIs following Google Material Design 3 (Material You) guidelines for React Native/Expo apps. Use when designing components, implementing themes, choosing colors, working with typography, animations, or creating accessible mobile interfaces with Material Design aesthetics.
---

# Material Design for React Native/Expo

This skill helps you create beautiful, modern mobile applications following Google's Material Design 3 (Material You) principles in React Native and Expo projects.

## When to Use This Skill

Use this skill when:
- Creating new UI components following Material Design guidelines
- Implementing Material Design color systems and theming
- Setting up typography following Material Design type scale
- Designing layout and spacing based on Material Design grid system
- Adding elevation, shadows, and surface styling
- Implementing Material Design motion and animations
- Creating accessible, touch-friendly interfaces
- Designing navigation patterns (bottom tabs, navigation drawers, etc.)
- Working with Material Design icons and iconography

## Core Material Design 3 Principles

### 1. Material You (Personalization)
- Dynamic color generation from user preferences
- Adaptive theming with light/dark mode support
- Tonal palettes for cohesive color systems

### 2. Design Tokens
- Color roles (primary, secondary, tertiary, surface, etc.)
- Elevation through shadow and tonal surfaces
- State layers for interaction feedback
- Shape system (rounded corners, pill shapes)

### 3. Components
- Follow Material Design component specifications
- Consistent interaction patterns
- Accessibility-first approach

## Material Design 3 Color System

### Color Roles

```typescript
// Material Design 3 Color Scheme
interface MaterialColors {
  // Primary colors
  primary: string;           // Main brand color
  onPrimary: string;         // Text/icons on primary
  primaryContainer: string;  // Less prominent primary
  onPrimaryContainer: string;

  // Secondary colors
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  // Tertiary colors
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error colors
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Surface colors
  surface: string;           // Background
  onSurface: string;         // Text on background
  surfaceVariant: string;    // Alternative surface
  onSurfaceVariant: string;

  // Outline
  outline: string;
  outlineVariant: string;

  // Other
  background: string;
  onBackground: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
}
```

### Example Color Palette (Light Theme)

```typescript
const lightColors: MaterialColors = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005E',

  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1E192B',

  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#370B1E',

  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',

  surface: '#FEF7FF',
  onSurface: '#1D1B20',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454E',

  outline: '#79747E',
  outlineVariant: '#C4C7C5',

  background: '#FEF7FF',
  onBackground: '#1D1B20',
  inverseSurface: '#322F35',
  inverseOnSurface: '#F5EFF7',
  inversePrimary: '#D0BCFF',
  shadow: '#000000',
  scrim: '#000000',
};
```

### Example Color Palette (Dark Theme)

```typescript
const darkColors: MaterialColors = {
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',

  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',

  tertiary: '#EFB8C8',
  onTertiary: '#4A2532',
  tertiaryContainer: '#633B48',
  onTertiaryContainer: '#FFD8E4',

  error: '#F2B8B5',
  onError: '#601410',
  errorContainer: '#8C1D18',
  onErrorContainer: '#F9DEDC',

  surface: '#141218',
  onSurface: '#E6E0E9',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',

  outline: '#948F99',
  outlineVariant: '#49454E',

  background: '#141218',
  onBackground: '#E6E0E9',
  inverseSurface: '#E6E0E9',
  inverseOnSurface: '#322F35',
  inversePrimary: '#6750A4',
  shadow: '#000000',
  scrim: '#000000',
};
```

## Typography System

Material Design uses a type scale with predefined text styles:

```typescript
interface MaterialTypography {
  displayLarge: TextStyle;
  displayMedium: TextStyle;
  displaySmall: TextStyle;

  headlineLarge: TextStyle;
  headlineMedium: TextStyle;
  headlineSmall: TextStyle;

  titleLarge: TextStyle;
  titleMedium: TextStyle;
  titleSmall: TextStyle;

  bodyLarge: TextStyle;
  bodyMedium: TextStyle;
  bodySmall: TextStyle;

  labelLarge: TextStyle;
  labelMedium: TextStyle;
  labelSmall: TextStyle;
}

// Example implementation
const typography: MaterialTypography = {
  displayLarge: {
    fontFamily: 'System',
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400',
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: 'System',
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400',
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: 'System',
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
    letterSpacing: 0,
  },

  headlineLarge: {
    fontFamily: 'System',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: 'System',
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: 'System',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
    letterSpacing: 0,
  },

  titleLarge: {
    fontFamily: 'System',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },

  bodyLarge: {
    fontFamily: 'System',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
  },

  labelLarge: {
    fontFamily: 'System',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: 'System',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: 'System',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
};
```

## Spacing and Layout

Material Design uses an 8dp grid system (8-point grid):

```typescript
const spacing = {
  xs: 4,    // 0.5 units
  sm: 8,    // 1 unit
  md: 16,   // 2 units
  lg: 24,   // 3 units
  xl: 32,   // 4 units
  xxl: 48,  // 6 units
  xxxl: 64, // 8 units
};

// Common usage
const styles = {
  container: {
    padding: spacing.md,  // 16
    gap: spacing.sm,      // 8
  },
  header: {
    marginBottom: spacing.lg, // 24
  },
};
```

## Elevation and Shadows

Material Design 3 uses elevation levels (0-5):

```typescript
// Elevation shadows for Android
const elevation = {
  0: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  4: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  5: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};
```

## Shape System

Material Design 3 uses rounded corners with specific values:

```typescript
const shape = {
  none: 0,
  extraSmall: 4,   // Small components
  small: 8,        // Buttons, chips
  medium: 12,      // Cards, dialogs
  large: 16,       // Bottom sheets
  extraLarge: 28,  // Featured content
  full: 9999,      // Pills, FABs
};
```

## Component Examples

### Filled Button (Primary)

```typescript
import { Pressable, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
}

export function FilledButton({ onPress, label, disabled = false }: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled
            ? colors.onSurface + '1F' // 12% opacity
            : colors.primary,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: disabled ? colors.onSurface + '61' : colors.onPrimary, // 38% opacity
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 20, // shape.full
    justifyContent: 'center',
    alignItems: 'center',
    // elevation.1 (from elevation system)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
```

### Material Card

```typescript
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  elevated?: boolean;
}

export function MaterialCard({ title, subtitle, children, elevated = false }: CardProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
        },
        elevated && elevation[1],
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12, // shape.medium
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    marginTop: 4,
  },
  content: {
    marginTop: 8,
  },
});
```

### Floating Action Button (FAB)

```typescript
import { Pressable, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FABProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'medium' | 'large';
}

export function FAB({ onPress, icon, size = 'medium' }: FABProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  const sizeConfig = {
    small: { container: 40, icon: 24 },
    medium: { container: 56, icon: 24 },
    large: { container: 96, icon: 36 },
  };

  const config = sizeConfig[size];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        {
          width: config.container,
          height: config.container,
          backgroundColor: colors.primaryContainer,
          opacity: pressed ? 0.9 : 1,
        },
        elevation[3],
      ]}
    >
      <Ionicons
        name={icon}
        size={config.icon}
        color={colors.onPrimaryContainer}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    borderRadius: 9999, // shape.full
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Text Input (Outlined)

```typescript
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useColorScheme } from 'react-native';

interface OutlinedTextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  placeholder?: string;
}

export function OutlinedTextField({
  label,
  value,
  onChangeText,
  error,
  placeholder,
}: OutlinedTextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  const borderColor = error
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.outline;

  const labelColor = error
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.onSurfaceVariant;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: labelColor }]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant}
        style={[
          styles.input,
          {
            borderColor,
            color: colors.onSurface,
            backgroundColor: colors.surface,
          },
        ]}
      />
      {error && (
        <Text style={[styles.supportingText, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 4, // shape.extraSmall
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  supportingText: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
    marginHorizontal: 16,
  },
});
```

## State Layers (Interaction States)

Apply overlay colors for interaction states:

```typescript
const stateLayerOpacity = {
  hover: 0.08,    // 8%
  focus: 0.12,    // 12%
  pressed: 0.12,  // 12%
  dragged: 0.16,  // 16%
};

// Usage example
<Pressable
  style={({ pressed }) => [
    styles.surface,
    {
      backgroundColor: pressed
        ? `${colors.primary}${Math.round(stateLayerOpacity.pressed * 255).toString(16)}`
        : colors.surface,
    },
  ]}
>
  {/* Content */}
</Pressable>
```

## Motion and Animation

Material Design uses standard easing curves:

```typescript
import { Easing } from 'react-native-reanimated';

const materialEasing = {
  // Standard: Most common, use for simple transitions
  standard: Easing.bezier(0.2, 0.0, 0, 1.0),

  // Emphasized: Use for important or large transitions
  emphasized: Easing.bezier(0.2, 0.0, 0, 1.0),

  // Decelerated: Entering elements
  decelerated: Easing.bezier(0.0, 0.0, 0, 1.0),

  // Accelerated: Exiting elements
  accelerated: Easing.bezier(0.3, 0.0, 1.0, 1.0),
};

// Standard durations
const duration = {
  short1: 50,   // Small simple transitions
  short2: 100,  // Simple transitions
  short3: 150,  // Simple transitions
  short4: 200,  // Simple transitions
  medium1: 250, // Medium transitions
  medium2: 300, // Medium transitions
  medium3: 350, // Medium transitions
  medium4: 400, // Medium transitions
  long1: 450,   // Large/complex transitions
  long2: 500,   // Large/complex transitions
  long3: 550,   // Large/complex transitions
  long4: 600,   // Large/complex transitions
};
```

## Accessibility Best Practices

1. **Touch Targets**: Minimum 48x48 dp
2. **Color Contrast**: Follow WCAG 2.1 AA standards (4.5:1 for normal text)
3. **Screen Readers**: Provide meaningful accessibility labels
4. **Focus Indicators**: Clear visual feedback for focus states

```typescript
// Example accessible button
<Pressable
  accessible={true}
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit the form"
  accessibilityRole="button"
  style={styles.button}
>
  <Text>Submit</Text>
</Pressable>
```

## AI Assistant Instructions

When this skill is activated:

1. **Always use Material Design 3 color roles** instead of arbitrary colors. Use primary/secondary/tertiary with their containers and on-colors.

2. **Follow the type scale** for typography. Don't create custom font sizes - use the predefined type scale (displayLarge, headlineMedium, bodySmall, etc.).

3. **Use the 8dp spacing system** for all margins, padding, and gaps. Stick to multiples of 4 or 8.

4. **Apply proper elevation** using the predefined shadow/elevation system instead of custom shadows.

5. **Implement dark mode support** by using the theme colors and `useColorScheme()` hook.

6. **Follow Material Design shape system** for border radius (extraSmall: 4, small: 8, medium: 12, large: 16, extraLarge: 28, full: 9999).

7. **Add state layers** for interactive components (pressed, focused states) using the opacity values.

8. **Ensure accessibility** with minimum 48dp touch targets and proper accessibility props.

9. **Use Material Design motion** with the standard easing curves and duration values.

10. **Create responsive layouts** that adapt to different screen sizes while maintaining Material Design principles.

Always:
- Provide both light and dark theme support
- Include TypeScript types for component props
- Use functional components with hooks
- Include proper accessibility props
- Follow React Native best practices
- Use Expo vector icons (@expo/vector-icons) for icons

Never:
- Use arbitrary colors not from the Material palette
- Create custom shadows without using the elevation system
- Ignore dark mode theming
- Skip accessibility considerations
- Use pixel values instead of the 8dp grid

## Additional Resources

- [Material Design 3 Guidelines](https://m3.material.io/)
- [Material Design Color System](https://m3.material.io/styles/color/overview)
- [Material Design Typography](https://m3.material.io/styles/typography/overview)
- [Material Components](https://m3.material.io/components)
- [Material Theme Builder](https://m3.material.io/theme-builder)
- [React Native Paper](https://reactnativepaper.com/) - Material Design library for React Native
