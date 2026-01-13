# Material Design 3 タイポグラフィ

## タイプスケール

Material Design 3 では、5カテゴリ × 3サイズの合計15スタイルを定義します。

## TypeScript型定義

```typescript
import { TextStyle } from 'react-native';

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
```

## 完全な実装

```typescript
export const typography: MaterialTypography = {
  // Display - 大きな見出し、ヒーローテキスト
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400',
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400',
    letterSpacing: 0,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
    letterSpacing: 0,
  },

  // Headline - セクション見出し
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
    letterSpacing: 0,
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
    letterSpacing: 0,
  },

  // Title - カードタイトル、リストヘッダー
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },

  // Body - 本文テキスト
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
  },

  // Label - ボタン、タブ、チップ
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
};
```

## 使用ガイドライン

### カテゴリ別の用途

| カテゴリ | 用途 |
|----------|------|
| **Display** | ヒーローセクション、ランディングページの大見出し |
| **Headline** | スクリーンタイトル、セクション見出し |
| **Title** | カードタイトル、ダイアログタイトル、リストヘッダー |
| **Body** | 段落テキスト、説明文、メッセージ |
| **Label** | ボタンテキスト、タブ、チップ、キャプション |

### コンポーネント別の推奨スタイル

| コンポーネント | スタイル |
|----------------|----------|
| App Bar タイトル | titleLarge |
| カードタイトル | titleMedium |
| 本文 | bodyMedium |
| ボタン | labelLarge |
| チップ | labelMedium |
| キャプション | bodySmall |
| フォームラベル | bodySmall |
| 入力テキスト | bodyLarge |

## 使用例

```typescript
import { Text, StyleSheet } from 'react-native';

function TypographyExample() {
  const colors = useThemeColors();

  return (
    <>
      <Text style={[typography.headlineMedium, { color: colors.onSurface }]}>
        見出し
      </Text>
      <Text style={[typography.bodyMedium, { color: colors.onSurfaceVariant }]}>
        本文テキストはこのスタイルを使用します。
      </Text>
    </>
  );
}
```
