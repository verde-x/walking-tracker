# Walking Tracker

日々のウォーキングを記録し、運動習慣の継続をサポートするモバイルアプリケーション。

## 機能

- ウォーキングの開始/終了を記録
- GPS による距離計測
- 経過時間のリアルタイム表示
- ウォーキング後の気分登録
- 履歴の保存

## 技術スタック

- React Native (Expo SDK ~54.0)
- TypeScript
- Expo Router (ファイルベースルーティング)
- NativeWind (Tailwind CSS for React Native)

## 開発環境のセットアップ

### 必要要件

- Node.js 18+
- npm または yarn
- iOS Simulator (Mac) または Android Emulator

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm start
```

### プラットフォーム別起動

```bash
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web ブラウザ
```

## プロジェクト構成

```
app/              # ルーティング（ファイルベース）
  _layout.tsx     # ルートレイアウト
  index.tsx       # ホーム画面
components/       # 再利用可能なコンポーネント
docs/             # ドキュメント
  requirements.md # 要求定義書
```

## ドキュメント

- [要求定義書](docs/requirements.md)

## ライセンス

Private
