# Material Design 3 エレベーション

## エレベーションレベル

Material Design 3 では6段階のエレベーション（0-5）を定義します。

## React Native実装

```typescript
import { ViewStyle } from 'react-native';

interface ElevationStyle extends ViewStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export const elevation: Record<number, ElevationStyle> = {
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

## コンポーネント別エレベーション

| コンポーネント | レベル | 用途 |
|----------------|--------|------|
| Surface | 0 | 基本的な背景 |
| カード（アウトライン） | 0 | 境界線で区切るカード |
| カード（エレベート） | 1 | 浮き上がったカード |
| App Bar | 0-2 | スクロールで変化 |
| FAB | 3 | フローティングボタン |
| ナビゲーションドロワー | 1 | サイドメニュー |
| ボトムシート | 1 | 下からのシート |
| ダイアログ | 3 | モーダル |
| メニュー | 2 | ドロップダウン |
| スナックバー | 3 | 通知トースト |

## トーナルエレベーション

Material Design 3 ではシャドウに加え、サーフェスの色を変えてエレベーションを表現します（特にダークテーマ）。

```typescript
// ダークテーマでのサーフェス色
export const surfaceElevation = {
  level0: '#141218', // surface
  level1: '#1D1B20', // surfaceContainerLow
  level2: '#211F26', // surfaceContainer
  level3: '#2B2930', // surfaceContainerHigh
  level4: '#36343B', // surfaceContainerHighest
  level5: '#36343B', // surfaceContainerHighest
};
```

## 使用例

### エレベーテッドカード

```typescript
import { View, StyleSheet } from 'react-native';

function ElevatedCard({ children }) {
  const colors = useThemeColors();

  return (
    <View style={[
      styles.card,
      elevation[1],
      { backgroundColor: colors.surface }
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
});
```

### FAB

```typescript
function FloatingActionButton({ onPress, icon }) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.fab,
        elevation[3],
        { backgroundColor: colors.primaryContainer }
      ]}
    >
      <Icon name={icon} color={colors.onPrimaryContainer} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: 56,
    height: 56,
    borderRadius: 16, // large shape
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## 注意事項

- iOS では `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` を使用
- Android では `elevation` プロパティを使用
- 両方を指定することでクロスプラットフォーム対応
