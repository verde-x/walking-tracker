# Material Design 3 コンポーネント実装例

## ボタン

### Filled Button（塗りつぶしボタン）

```typescript
import { Pressable, Text, StyleSheet } from 'react-native';

interface FilledButtonProps {
  onPress: () => void;
  label: string;
  disabled?: boolean;
}

export function FilledButton({ onPress, label, disabled = false }: FilledButtonProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.filledButton,
        {
          backgroundColor: disabled
            ? `${colors.onSurface}1F` // 12% opacity
            : colors.primary,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <Text
        style={[
          typography.labelLarge,
          { color: disabled ? `${colors.onSurface}61` : colors.onPrimary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filledButton: {
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 20, // full
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Outlined Button（アウトラインボタン）

```typescript
export function OutlinedButton({ onPress, label, disabled = false }: FilledButtonProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.outlinedButton,
        {
          borderColor: disabled ? `${colors.onSurface}1F` : colors.outline,
          backgroundColor: pressed ? `${colors.primary}1F` : 'transparent',
        },
      ]}
    >
      <Text
        style={[
          typography.labelLarge,
          { color: disabled ? `${colors.onSurface}61` : colors.primary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outlinedButton: {
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## カード

### Elevated Card

```typescript
interface CardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function ElevatedCard({ title, subtitle, children }: CardProps) {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, elevation[1], { backgroundColor: colors.surface }]}>
      <View style={styles.cardHeader}>
        <Text style={[typography.titleMedium, { color: colors.onSurface }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[typography.bodySmall, { color: colors.onSurfaceVariant }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {children && <View style={styles.cardContent}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
  },
  cardHeader: {
    gap: 4,
  },
  cardContent: {
    marginTop: 16,
  },
});
```

### Outlined Card

```typescript
export function OutlinedCard({ title, subtitle, children }: CardProps) {
  const colors = useThemeColors();

  return (
    <View style={[
      styles.outlinedCard,
      {
        backgroundColor: colors.surface,
        borderColor: colors.outlineVariant,
      }
    ]}>
      <View style={styles.cardHeader}>
        <Text style={[typography.titleMedium, { color: colors.onSurface }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[typography.bodySmall, { color: colors.onSurfaceVariant }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {children && <View style={styles.cardContent}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  outlinedCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
});
```

## FAB（フローティングアクションボタン）

```typescript
import { Ionicons } from '@expo/vector-icons';

interface FABProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  label?: string;
}

export function FAB({ onPress, icon, label }: FABProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label || 'アクション'}
      style={({ pressed }) => [
        label ? styles.extendedFab : styles.fab,
        elevation[3],
        {
          backgroundColor: colors.primaryContainer,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <Ionicons name={icon} size={24} color={colors.onPrimaryContainer} />
      {label && (
        <Text style={[typography.labelLarge, { color: colors.onPrimaryContainer }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extendedFab: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
```

## テキストフィールド

### Outlined TextField

```typescript
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

interface TextFieldProps {
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
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const colors = useThemeColors();

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
    <View style={styles.textFieldContainer}>
      <Text style={[typography.bodySmall, { color: labelColor }]}>
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.onSurfaceVariant}
        accessible={true}
        accessibilityLabel={label}
        style={[
          styles.textInput,
          typography.bodyLarge,
          {
            borderColor,
            color: colors.onSurface,
            backgroundColor: colors.surface,
          },
        ]}
      />
      {error && (
        <Text style={[typography.bodySmall, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textFieldContainer: {
    gap: 4,
  },
  textInput: {
    height: 56,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
  },
});
```

## リストアイテム

```typescript
interface ListItemProps {
  title: string;
  subtitle?: string;
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export function ListItem({ title, subtitle, leadingIcon, onPress }: ListItemProps) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole={onPress ? 'button' : 'text'}
      style={({ pressed }) => [
        styles.listItem,
        { backgroundColor: pressed ? `${colors.onSurface}0D` : 'transparent' },
      ]}
    >
      {leadingIcon && (
        <Ionicons name={leadingIcon} size={24} color={colors.onSurfaceVariant} />
      )}
      <View style={styles.listItemContent}>
        <Text style={[typography.bodyLarge, { color: colors.onSurface }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[typography.bodyMedium, { color: colors.onSurfaceVariant }]}>
            {subtitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 56,
    gap: 16,
  },
  listItemContent: {
    flex: 1,
    gap: 2,
  },
});
```

## 共通インポート

これらのコンポーネントで使用する共通のインポートとユーティリティ：

```typescript
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// カラーとタイポグラフィは別ファイルからインポート
import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { elevation } from './elevation';
import { spacing, shape } from './spacing';

function useThemeColors() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
}
```
