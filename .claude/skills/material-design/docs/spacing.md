# Material Design 3 スペーシングとレイアウト

## 8dpグリッドシステム

Material Design はすべてのスペーシングに8dpグリッドを使用します。4dpは小さな調整に使用可能です。

## スペーシング定義

```typescript
export const spacing = {
  none: 0,
  xs: 4,    // 0.5単位 - 最小の調整
  sm: 8,    // 1単位 - 小さな間隔
  md: 16,   // 2単位 - 標準的な間隔
  lg: 24,   // 3単位 - セクション間
  xl: 32,   // 4単位 - 大きな間隔
  xxl: 48,  // 6単位 - ページ余白
  xxxl: 64, // 8単位 - 大きなセクション間
};
```

## コンポーネント別の推奨スペーシング

### コンテナパディング

| コンポーネント | パディング |
|----------------|------------|
| スクリーン | 16dp (md) |
| カード | 16dp (md) |
| ダイアログ | 24dp (lg) |
| ボトムシート | 16dp (md) |
| リストアイテム | 16dp 水平 / 8dp 垂直 |

### 要素間のギャップ

| 要素 | ギャップ |
|------|----------|
| テキスト行間 | 4dp (xs) |
| 関連要素間 | 8dp (sm) |
| セクション間 | 16-24dp (md-lg) |
| カード間 | 8-16dp (sm-md) |

## レイアウトグリッド

### 推奨マージン

```typescript
export const layoutMargins = {
  // コンパクト（スマートフォン縦向き）
  compact: 16,
  // ミディアム（タブレット）
  medium: 24,
  // エクスパンデッド（大画面）
  expanded: 24,
};
```

### 最大コンテンツ幅

```typescript
export const maxContentWidth = {
  compact: '100%',
  medium: 840,
  expanded: 1200,
};
```

## 実装例

### 画面レイアウト

```typescript
import { View, StyleSheet } from 'react-native';

function ScreenLayout({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md, // 16dp
  },
});
```

### カードレイアウト

```typescript
const cardStyles = StyleSheet.create({
  card: {
    padding: spacing.md, // 16dp
    borderRadius: shape.medium, // 12dp
    gap: spacing.sm, // 8dp
  },
  cardHeader: {
    marginBottom: spacing.sm, // 8dp
  },
  cardContent: {
    gap: spacing.xs, // 4dp
  },
  cardActions: {
    marginTop: spacing.md, // 16dp
    flexDirection: 'row',
    gap: spacing.sm, // 8dp
  },
});
```

### リストレイアウト

```typescript
const listStyles = StyleSheet.create({
  list: {
    gap: spacing.sm, // 8dp
  },
  listItem: {
    paddingHorizontal: spacing.md, // 16dp
    paddingVertical: spacing.sm, // 8dp
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md, // 16dp
  },
  listItemContent: {
    flex: 1,
    gap: spacing.xs, // 4dp
  },
});
```

## タッチターゲット

アクセシビリティのため、最小タッチターゲットは48×48dpです。

```typescript
export const touchTarget = {
  min: 48,
  recommended: 56, // FABなど
};

// ボタンの最小高さ
const buttonStyles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: spacing.lg, // 24dp
  },
});
```
