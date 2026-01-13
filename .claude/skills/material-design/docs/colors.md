# Material Design 3 カラーシステム

## カラーロールの概要

Material Design 3 では、色を「役割（ロール）」で定義します。これにより、一貫性のあるテーマ切り替えが可能になります。

## 完全なカラースキーム

### TypeScript型定義

```typescript
interface MaterialColors {
  // Primary（主要色）
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  // Secondary（補助色）
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  // Tertiary（第三色）
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  // Error（エラー色）
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  // Surface（表面色）
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;

  // Outline（アウトライン）
  outline: string;
  outlineVariant: string;

  // その他
  background: string;
  onBackground: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
}
```

### ライトテーマ

```typescript
export const lightColors: MaterialColors = {
  // Primary
  primary: '#6750A4',
  onPrimary: '#FFFFFF',
  primaryContainer: '#EADDFF',
  onPrimaryContainer: '#21005E',

  // Secondary
  secondary: '#625B71',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E8DEF8',
  onSecondaryContainer: '#1E192B',

  // Tertiary
  tertiary: '#7D5260',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FFD8E4',
  onTertiaryContainer: '#370B1E',

  // Error
  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',

  // Surface
  surface: '#FEF7FF',
  onSurface: '#1D1B20',
  surfaceVariant: '#E7E0EC',
  onSurfaceVariant: '#49454E',
  surfaceDim: '#DED8E1',
  surfaceBright: '#FEF7FF',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F7F2FA',
  surfaceContainer: '#F3EDF7',
  surfaceContainerHigh: '#ECE6F0',
  surfaceContainerHighest: '#E6E0E9',

  // Outline
  outline: '#79747E',
  outlineVariant: '#CAC4D0',

  // その他
  background: '#FEF7FF',
  onBackground: '#1D1B20',
  inverseSurface: '#322F35',
  inverseOnSurface: '#F5EFF7',
  inversePrimary: '#D0BCFF',
  shadow: '#000000',
  scrim: '#000000',
};
```

### ダークテーマ

```typescript
export const darkColors: MaterialColors = {
  // Primary
  primary: '#D0BCFF',
  onPrimary: '#381E72',
  primaryContainer: '#4F378B',
  onPrimaryContainer: '#EADDFF',

  // Secondary
  secondary: '#CCC2DC',
  onSecondary: '#332D41',
  secondaryContainer: '#4A4458',
  onSecondaryContainer: '#E8DEF8',

  // Tertiary
  tertiary: '#EFB8C8',
  onTertiary: '#4A2532',
  tertiaryContainer: '#633B48',
  onTertiaryContainer: '#FFD8E4',

  // Error
  error: '#F2B8B5',
  onError: '#601410',
  errorContainer: '#8C1D18',
  onErrorContainer: '#F9DEDC',

  // Surface
  surface: '#141218',
  onSurface: '#E6E0E9',
  surfaceVariant: '#49454F',
  onSurfaceVariant: '#CAC4D0',
  surfaceDim: '#141218',
  surfaceBright: '#3B383E',
  surfaceContainerLowest: '#0F0D13',
  surfaceContainerLow: '#1D1B20',
  surfaceContainer: '#211F26',
  surfaceContainerHigh: '#2B2930',
  surfaceContainerHighest: '#36343B',

  // Outline
  outline: '#948F99',
  outlineVariant: '#49454E',

  // その他
  background: '#141218',
  onBackground: '#E6E0E9',
  inverseSurface: '#E6E0E9',
  inverseOnSurface: '#322F35',
  inversePrimary: '#6750A4',
  shadow: '#000000',
  scrim: '#000000',
};
```

## カラーの使用ガイドライン

### 使い分け

| ロール | 用途 |
|--------|------|
| `primary` | CTAボタン、アクティブ状態、重要なアクション |
| `primaryContainer` | 選択状態の背景、FAB |
| `secondary` | フィルターチップ、補助的なボタン |
| `tertiary` | コントラストやバランスのためのアクセント |
| `surface` | カード、シート、ダイアログの背景 |
| `surfaceVariant` | テキストフィールドの背景 |
| `error` | エラーメッセージ、破壊的アクション |

### on- プレフィックスの意味

`on-` プレフィックスは、その色の上に配置するコンテンツの色を示します：

- `primary` の上のテキスト → `onPrimary`
- `surface` の上のテキスト → `onSurface`
- `errorContainer` の上のテキスト → `onErrorContainer`

## テーマフック

```typescript
import { useColorScheme } from 'react-native';

export function useThemeColors() {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkColors : lightColors;
}
```

## ステートレイヤー

インタラクション状態を表現するためのオーバーレイ：

```typescript
export const stateLayerOpacity = {
  hover: 0.08,    // 8%
  focus: 0.12,    // 12%
  pressed: 0.12,  // 12%
  dragged: 0.16,  // 16%
  disabled: 0.38, // 38%（コンテンツ）
  disabledContainer: 0.12, // 12%（コンテナ）
};
```
