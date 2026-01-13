---
name: material-design
description: Material Design 3 (Material You) コンポーネントガイドライン。React Native/Expoアプリ向けのUI実装時に使用。ボタン、カード、FAB、テキストフィールド、ナビゲーション等のコンポーネント設計に対応。
allowed_urls:
  - https://m3.material.io/*
  - https://fonts.google.com/icons*
---

# Material Design 3 コンポーネントガイド

Material Design 3 は30以上のUIコンポーネントを提供します。このスキルはReact Native/Expo向けの実装ガイドラインです。

公式ドキュメント: https://m3.material.io/components

---

## コンポーネント一覧

### アクション

| コンポーネント | 説明 |
|----------------|------|
| **Common buttons** | Elevated, Filled, Filled tonal, Outlined, Text |
| **FAB** | Small, Regular, Large, Extended |
| **Icon buttons** | Standard, Filled, Filled tonal, Outlined |
| **Segmented buttons** | 複数選択肢から選ぶボタングループ |

### コミュニケーション

| コンポーネント | 説明 |
|----------------|------|
| **Badges** | 通知数などの小さなインジケーター |
| **Progress indicators** | Linear, Circular（確定/不確定） |
| **Snackbar** | 一時的なフィードバックメッセージ |

### コンテインメント

| コンポーネント | 説明 |
|----------------|------|
| **Bottom sheets** | Standard, Modal |
| **Cards** | Elevated, Filled, Outlined |
| **Dialogs** | Basic, Full-screen |
| **Dividers** | コンテンツの区切り線 |
| **Lists** | 1行、2行、3行リスト |
| **Side sheets** | サイドパネル |

### ナビゲーション

| コンポーネント | 説明 |
|----------------|------|
| **Bottom app bar** | 下部アクションバー |
| **Navigation bar** | 下部タブナビゲーション |
| **Navigation drawer** | サイドメニュー |
| **Navigation rail** | タブレット向けサイドナビ |
| **Tabs** | Primary, Secondary タブ |
| **Top app bar** | 上部アプリバー |

### セレクション

| コンポーネント | 説明 |
|----------------|------|
| **Checkbox** | 複数選択 |
| **Chips** | Assist, Filter, Input, Suggestion |
| **Date pickers** | 日付選択 |
| **Menus** | ドロップダウンメニュー |
| **Radio button** | 単一選択 |
| **Sliders** | Continuous, Discrete, Centered, Range |
| **Switch** | オン/オフ切替 |
| **Time pickers** | 時刻選択 |

### テキスト入力

| コンポーネント | 説明 |
|----------------|------|
| **Text fields** | Filled, Outlined |
| **Search** | 検索バー |

---

## ボタン (Buttons)

### タイプと使い分け

| タイプ | 用途 | 強調度 |
|--------|------|--------|
| **Filled** | 最も重要なアクション（CTA） | 最高 |
| **Filled tonal** | 重要だが主要ではないアクション | 高 |
| **Elevated** | Filledより控えめ、影付き | 中高 |
| **Outlined** | 代替アクション | 中 |
| **Text** | 最も控えめなアクション | 低 |

### 仕様

- 高さ: 40dp
- パディング: 左右24dp（アイコン付きは16dp/24dp）
- 角丸: 20dp (full)
- テキスト: Sentence case（ALL CAPSではない）
- 最小タッチターゲット: 48dp

### React Native実装

```tsx
import { Pressable, Text, StyleSheet } from 'react-native';

// Filled Button
export function FilledButton({ label, onPress, disabled }) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled
            ? `${colors.onSurface}1F`
            : colors.primary,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <Text style={[
        styles.label,
        { color: disabled ? `${colors.onSurface}61` : colors.onPrimary }
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

// Filled Tonal Button
export function FilledTonalButton({ label, onPress, disabled }) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled
            ? `${colors.onSurface}1F`
            : colors.secondaryContainer,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <Text style={[
        styles.label,
        { color: disabled ? `${colors.onSurface}61` : colors.onSecondaryContainer }
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

// Outlined Button
export function OutlinedButton({ label, onPress, disabled }) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        styles.outlined,
        {
          borderColor: disabled ? `${colors.onSurface}1F` : colors.outline,
          backgroundColor: pressed ? `${colors.primary}14` : 'transparent',
        },
      ]}
    >
      <Text style={[
        styles.label,
        { color: disabled ? `${colors.onSurface}61` : colors.primary }
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

// Text Button
export function TextButton({ label, onPress, disabled }) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.textButton,
        {
          backgroundColor: pressed ? `${colors.primary}14` : 'transparent',
        },
      ]}
    >
      <Text style={[
        styles.label,
        { color: disabled ? `${colors.onSurface}61` : colors.primary }
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 24,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  outlined: {
    borderWidth: 1,
  },
  textButton: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
```

---

## FAB (Floating Action Button)

画面で最も重要なアクションを表現します。

### タイプ

| タイプ | サイズ | 用途 |
|--------|--------|------|
| **Small** | 40dp | 補助的なFAB |
| **Regular** | 56dp | 標準的なFAB |
| **Large** | 96dp | 大きな画面向け |
| **Extended** | 56dp高さ | テキスト付きFAB |

### 仕様

- 角丸: 16dp（Large: 28dp）
- エレベーション: Level 3
- 色: primaryContainer / onPrimaryContainer

### React Native実装

```tsx
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function FAB({ icon, label, size = 'regular', onPress }) {
  const colors = useThemeColors();

  const sizeStyles = {
    small: { width: 40, height: 40, iconSize: 24, radius: 12 },
    regular: { width: 56, height: 56, iconSize: 24, radius: 16 },
    large: { width: 96, height: 96, iconSize: 36, radius: 28 },
  };

  const config = sizeStyles[size];
  const isExtended = !!label;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label || 'アクション'}
      style={({ pressed }) => [
        isExtended ? styles.extendedFab : styles.fab,
        elevation[3],
        {
          width: isExtended ? undefined : config.width,
          height: isExtended ? 56 : config.height,
          borderRadius: isExtended ? 16 : config.radius,
          backgroundColor: colors.primaryContainer,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <Ionicons
        name={icon}
        size={config.iconSize}
        color={colors.onPrimaryContainer}
      />
      {label && (
        <Text style={[styles.fabLabel, { color: colors.onPrimaryContainer }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  extendedFab: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fabLabel: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
```

---

## カード (Cards)

関連する情報をグループ化するコンテナです。

### タイプ

| タイプ | 特徴 |
|--------|------|
| **Elevated** | 影付き、surfaceContainerLow背景 |
| **Filled** | 影なし、surfaceContainerHighest背景 |
| **Outlined** | 影なし、outline境界線 |

### 仕様

- 角丸: 12dp (medium)
- パディング: 16dp
- エレベーション: Level 1（Elevatedのみ）

### React Native実装

```tsx
export function ElevatedCard({ children, onPress }) {
  const colors = useThemeColors();

  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        elevation[1],
        {
          backgroundColor: colors.surfaceContainerLow,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      {children}
    </Container>
  );
}

export function FilledCard({ children, onPress }) {
  const colors = useThemeColors();

  return (
    <View style={[
      styles.card,
      { backgroundColor: colors.surfaceContainerHighest }
    ]}>
      {children}
    </View>
  );
}

export function OutlinedCard({ children, onPress }) {
  const colors = useThemeColors();

  return (
    <View style={[
      styles.card,
      styles.outlinedCard,
      {
        backgroundColor: colors.surface,
        borderColor: colors.outlineVariant,
      }
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
  },
  outlinedCard: {
    borderWidth: 1,
  },
});
```

---

## テキストフィールド (Text Fields)

### タイプ

| タイプ | 特徴 | 使用場面 |
|--------|------|----------|
| **Filled** | 下線のみ、上部角丸 | 視覚的に目立つ場所 |
| **Outlined** | 全周の境界線 | フォームなど多数配置する場所 |

### 仕様

- 高さ: 56dp
- 角丸: Filled=上部4dp / Outlined=4dp全周
- ラベル: フローティングラベル（フォーカス時に上に移動）
- サポートテキスト: 入力フィールド下に表示

### 状態

- Default / Focused / Error / Disabled
- フォーカス時: primary色のボーダー/ラベル
- エラー時: error色のボーダー/ラベル/サポートテキスト

### React Native実装

```tsx
import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';

export function OutlinedTextField({
  label,
  value,
  onChangeText,
  error,
  supportingText,
  placeholder,
}) {
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
        accessibilityLabel={label}
        style={[
          styles.input,
          {
            borderColor,
            borderWidth: isFocused ? 2 : 1,
            color: colors.onSurface,
          },
        ]}
      />
      {(supportingText || error) && (
        <Text style={[
          styles.supportingText,
          { color: error ? colors.error : colors.onSurfaceVariant }
        ]}>
          {error || supportingText}
        </Text>
      )}
    </View>
  );
}

export function FilledTextField({
  label,
  value,
  onChangeText,
  error,
  supportingText,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const colors = useThemeColors();

  const indicatorColor = error
    ? colors.error
    : isFocused
    ? colors.primary
    : colors.onSurfaceVariant;

  return (
    <View style={styles.container}>
      <View style={[
        styles.filledContainer,
        { backgroundColor: colors.surfaceContainerHighest }
      ]}>
        <Text style={[
          styles.filledLabel,
          { color: error ? colors.error : colors.onSurfaceVariant }
        ]}>
          {label}
        </Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={label}
          style={[styles.filledInput, { color: colors.onSurface }]}
        />
        <View style={[
          styles.indicator,
          {
            backgroundColor: indicatorColor,
            height: isFocused ? 2 : 1,
          }
        ]} />
      </View>
      {(supportingText || error) && (
        <Text style={[
          styles.supportingText,
          { color: error ? colors.error : colors.onSurfaceVariant }
        ]}>
          {error || supportingText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    marginLeft: 16,
  },
  input: {
    height: 56,
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  filledContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  filledLabel: {
    fontSize: 12,
  },
  filledInput: {
    height: 40,
    fontSize: 16,
    paddingVertical: 0,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  supportingText: {
    fontSize: 12,
    marginLeft: 16,
  },
});
```

---

## チップ (Chips)

コンテキスト内の選択肢やフィルターを表現します。

### タイプ

| タイプ | 用途 |
|--------|------|
| **Assist** | スマートアクション提案 |
| **Filter** | コンテンツのフィルタリング |
| **Input** | ユーザー入力の表示（タグなど） |
| **Suggestion** | 入力候補の提案 |

### 仕様

- 高さ: 32dp
- 角丸: 8dp
- パディング: 左右16dp（アイコン付きは8dp/16dp）

### React Native実装

```tsx
export function FilterChip({ label, selected, onPress }) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected
            ? colors.secondaryContainer
            : 'transparent',
          borderColor: selected
            ? colors.secondaryContainer
            : colors.outline,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      {selected && (
        <Ionicons
          name="checkmark"
          size={18}
          color={colors.onSecondaryContainer}
        />
      )}
      <Text style={[
        styles.chipLabel,
        { color: selected ? colors.onSecondaryContainer : colors.onSurfaceVariant }
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function InputChip({ label, onRemove }) {
  const colors = useThemeColors();

  return (
    <View style={[
      styles.chip,
      { borderColor: colors.outline }
    ]}>
      <Text style={[styles.chipLabel, { color: colors.onSurfaceVariant }]}>
        {label}
      </Text>
      <Pressable onPress={onRemove} hitSlop={8}>
        <Ionicons name="close" size={18} color={colors.onSurfaceVariant} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chipLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});
```

---

## ナビゲーションバー (Navigation Bar)

画面下部のタブナビゲーションです。

### 仕様

- 高さ: 80dp
- アイテム数: 3〜5個
- アイコン: 24dp
- アクティブ状態: primaryContainer背景のピル形状

### React Native実装

```tsx
export function NavigationBar({ items, activeIndex, onSelect }) {
  const colors = useThemeColors();

  return (
    <View style={[
      styles.navBar,
      elevation[2],
      { backgroundColor: colors.surfaceContainer }
    ]}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(index)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={styles.navItem}
          >
            <View style={[
              styles.navIndicator,
              {
                backgroundColor: isActive
                  ? colors.secondaryContainer
                  : 'transparent',
              }
            ]}>
              <Ionicons
                name={isActive ? item.iconActive : item.icon}
                size={24}
                color={isActive ? colors.onSecondaryContainer : colors.onSurfaceVariant}
              />
            </View>
            <Text style={[
              styles.navLabel,
              {
                color: isActive ? colors.onSurface : colors.onSurfaceVariant,
                fontWeight: isActive ? '600' : '500',
              }
            ]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 80,
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 16,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navIndicator: {
    width: 64,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
```

---

## スナックバー (Snackbar)

一時的なフィードバックメッセージを表示します。

### 仕様

- 高さ: 48dp（1行）/ 68dp（2行）
- 角丸: 4dp
- 表示時間: 4〜10秒
- エレベーション: Level 3
- 位置: 画面下部（FABの上）

### React Native実装

```tsx
export function Snackbar({ message, action, onAction, visible }) {
  const colors = useThemeColors();

  if (!visible) return null;

  return (
    <View style={[
      styles.snackbar,
      elevation[3],
      { backgroundColor: colors.inverseSurface }
    ]}>
      <Text style={[styles.snackbarText, { color: colors.inverseOnSurface }]}>
        {message}
      </Text>
      {action && (
        <Pressable onPress={onAction}>
          <Text style={[styles.snackbarAction, { color: colors.inversePrimary }]}>
            {action}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    minHeight: 48,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  snackbarText: {
    fontSize: 14,
    flex: 1,
  },
  snackbarAction: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});
```

---

## プログレスインジケーター (Progress Indicators)

処理状況を示すインジケーターです。

### タイプ

| タイプ | 用途 |
|--------|------|
| **Linear** | 水平方向のプログレス |
| **Circular** | 円形のプログレス |

各タイプに確定（determinate）と不確定（indeterminate）があります。

### 仕様（2024年更新）

- Linear: 丸みのある端、トラックとの間にギャップ
- ストップインジケーター付き
- 波形（wavy）オプション

### React Native実装

```tsx
import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export function LinearProgress({ progress, indeterminate }) {
  const colors = useThemeColors();
  const translateX = useSharedValue(-100);

  useEffect(() => {
    if (indeterminate) {
      translateX.value = withRepeat(
        withTiming(100, { duration: 1500 }),
        -1,
        false
      );
    }
  }, [indeterminate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));

  return (
    <View style={[styles.linearTrack, { backgroundColor: colors.surfaceContainerHighest }]}>
      {indeterminate ? (
        <Animated.View
          style={[
            styles.linearIndicator,
            { backgroundColor: colors.primary, width: '30%' },
            animatedStyle,
          ]}
        />
      ) : (
        <View
          style={[
            styles.linearIndicator,
            { backgroundColor: colors.primary, width: `${progress * 100}%` }
          ]}
        />
      )}
    </View>
  );
}

export function CircularProgress({ progress, indeterminate, size = 48 }) {
  const colors = useThemeColors();
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (indeterminate) {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1,
        false
      );
    }
  }, [indeterminate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // 簡易実装（ActivityIndicatorを使用）
  return (
    <ActivityIndicator
      size={size > 36 ? 'large' : 'small'}
      color={colors.primary}
    />
  );
}

const styles = StyleSheet.create({
  linearTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  linearIndicator: {
    height: '100%',
    borderRadius: 2,
  },
});
```

---

## 共通ユーティリティ

### テーマカラーフック

```tsx
import { useColorScheme } from 'react-native';

// ライトテーマ
const lightColors = {
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005E',
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1E192B',
  surface: '#FEF7FF',
  onSurface: '#1D1B20',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainer: '#F3EDF7',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainerHighest: '#E6E0E9',
  onSurfaceVariant: '#49454E',
  outline: '#79747E',
  outlineVariant: '#CAC4D0',
  error: '#B3261E',
  onError: '#FFFFFF',
  inverseSurface: '#322F35',
  inverseOnSurface: '#F5EFF7',
  inversePrimary: '#D0BCFF',
};

// ダークテーマ
const darkColors = {
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',
  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',
  surface: '#141218',
  onSurface: '#E6E0E9',
  surfaceContainerLowest: '#0F0D13',
  surfaceContainerLow: '#1D1B20',
  surfaceContainer: '#211F26',
  surfaceContainerHigh: '#2B2930',
  surfaceContainerHighest: '#36343B',
  onSurfaceVariant: '#CAC4D0',
  outline: '#948F99',
  outlineVariant: '#49454E',
  error: '#F2B8B5',
  onError: '#601410',
  inverseSurface: '#E6E0E9',
  inverseOnSurface: '#322F35',
  inversePrimary: '#6750A4',
};

export function useThemeColors() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkColors : lightColors;
}
```

### エレベーション

```tsx
export const elevation = {
  0: {},
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
};
```

---

## 参考リソース

- [Material Design 3 Components](https://m3.material.io/components)
- [All Buttons](https://m3.material.io/components/all-buttons)
- [Cards](https://m3.material.io/components/cards)
- [Text Fields](https://m3.material.io/components/text-fields/guidelines)
- [Navigation Bar](https://m3.material.io/components/navigation-bar/specs)
- [Progress Indicators](https://m3.material.io/components/progress-indicators/guidelines)
