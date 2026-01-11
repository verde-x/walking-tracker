# ウォーキングトラッカー 実装手順書

## 概要

本ドキュメントは[要求定義書](requirements.md)に基づいた実装手順を定義する。

---

## Phase 1: MVP 実装

### Step 1: 環境構築

#### 1.1 NativeWind のセットアップ

```bash
npm install nativewind tailwindcss
npx tailwindcss init
```

**tailwind.config.js:**
```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**babel.config.js に追加:**
```javascript
plugins: ["nativewind/babel"],
```

#### 1.2 必要パッケージのインストール

```bash
# 位置情報
npx expo install expo-location

# ローカルストレージ
npx expo install @react-native-async-storage/async-storage

# UUID生成
npm install uuid
npm install -D @types/uuid
```

---

### Step 2: 型定義の作成

**ファイル:** `types/walking.ts`

```typescript
// 気分タイプ
export type MoodType = 'excellent' | 'good' | 'normal' | 'not_good' | 'bad';

// 気分の定義
export const MOODS: { type: MoodType; label: string; emoji: string }[] = [
  { type: 'excellent', label: 'とても良い', emoji: '😊' },
  { type: 'good', label: '良い', emoji: '🙂' },
  { type: 'normal', label: '普通', emoji: '😐' },
  { type: 'not_good', label: 'あまり良くない', emoji: '😕' },
  { type: 'bad', label: '良くない', emoji: '😞' },
];

// ウォーキング記録
export interface WalkingRecord {
  id: string;
  startTime: string;      // ISO 8601 形式
  endTime: string;        // ISO 8601 形式
  duration: number;       // 秒
  distance: number;       // メートル
  mood?: MoodType;
  createdAt: string;      // ISO 8601 形式
}

// 位置情報ポイント
export interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy?: number;
}

// ウォーキング状態
export type WalkingState = 'idle' | 'walking' | 'finished';
```

---

### Step 3: ユーティリティ関数の作成

**ファイル:** `utils/distance.ts`

```typescript
import { LocationPoint } from '@/types/walking';

/**
 * 2点間の距離を計算（Haversine formula）
 * @returns 距離（メートル）
 */
export function calculateDistance(
  point1: LocationPoint,
  point2: LocationPoint
): number {
  const R = 6371e3; // 地球の半径（メートル）
  const φ1 = (point1.latitude * Math.PI) / 180;
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * 位置情報配列から総距離を計算
 */
export function calculateTotalDistance(points: LocationPoint[]): number {
  if (points.length < 2) return 0;

  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += calculateDistance(points[i - 1], points[i]);
  }
  return total;
}
```

**ファイル:** `utils/format.ts`

```typescript
/**
 * 秒を MM:SS 形式にフォーマット
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * メートルを適切な単位で表示
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
}
```

---

### Step 4: ストレージサービスの作成

**ファイル:** `services/storage.ts`

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalkingRecord } from '@/types/walking';

const STORAGE_KEY = 'walking_records';

export async function saveRecord(record: WalkingRecord): Promise<void> {
  const records = await getRecords();
  records.unshift(record);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export async function getRecords(): Promise<WalkingRecord[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function getLatestRecord(): Promise<WalkingRecord | null> {
  const records = await getRecords();
  return records[0] || null;
}
```

---

### Step 5: 位置情報サービスの作成

**ファイル:** `services/location.ts`

```typescript
import * as Location from 'expo-location';
import { LocationPoint } from '@/types/walking';

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentLocation(): Promise<LocationPoint | null> {
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp,
      accuracy: location.coords.accuracy ?? undefined,
    };
  } catch {
    return null;
  }
}

export function startLocationTracking(
  callback: (location: LocationPoint) => void,
  intervalMs: number = 5000
): { stop: () => void } {
  let subscription: Location.LocationSubscription | null = null;

  Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: intervalMs,
      distanceInterval: 5,
    },
    (location) => {
      callback({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp,
        accuracy: location.coords.accuracy ?? undefined,
      });
    }
  ).then((sub) => {
    subscription = sub;
  });

  return {
    stop: () => subscription?.remove(),
  };
}
```

---

### Step 6: カスタムフックの作成

**ファイル:** `hooks/useWalking.ts`

```typescript
import { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WalkingState, WalkingRecord, LocationPoint, MoodType } from '@/types/walking';
import { startLocationTracking, requestLocationPermission } from '@/services/location';
import { calculateTotalDistance } from '@/utils/distance';
import { saveRecord } from '@/services/storage';

export function useWalking() {
  const [state, setState] = useState<WalkingState>('idle');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentRecord, setCurrentRecord] = useState<Partial<WalkingRecord> | null>(null);

  const startTimeRef = useRef<Date | null>(null);
  const locationsRef = useRef<LocationPoint[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const locationTrackerRef = useRef<{ stop: () => void } | null>(null);

  // タイマー更新
  useEffect(() => {
    if (state === 'walking') {
      timerRef.current = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current.getTime()) / 1000);
          setElapsedTime(elapsed);
        }
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state]);

  const start = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      // TODO: エラーハンドリング
      return false;
    }

    startTimeRef.current = new Date();
    locationsRef.current = [];
    setElapsedTime(0);
    setDistance(0);
    setState('walking');

    locationTrackerRef.current = startLocationTracking((location) => {
      locationsRef.current.push(location);
      setDistance(calculateTotalDistance(locationsRef.current));
    });

    return true;
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (locationTrackerRef.current) locationTrackerRef.current.stop();

    const endTime = new Date();
    const record: Partial<WalkingRecord> = {
      id: uuidv4(),
      startTime: startTimeRef.current?.toISOString(),
      endTime: endTime.toISOString(),
      duration: elapsedTime,
      distance: distance,
      createdAt: endTime.toISOString(),
    };

    setCurrentRecord(record);
    setState('finished');
  }, [elapsedTime, distance]);

  const saveWithMood = useCallback(async (mood?: MoodType) => {
    if (!currentRecord) return;

    const finalRecord: WalkingRecord = {
      ...currentRecord,
      mood,
    } as WalkingRecord;

    await saveRecord(finalRecord);
    setCurrentRecord(null);
    setState('idle');
  }, [currentRecord]);

  const reset = useCallback(() => {
    setCurrentRecord(null);
    setState('idle');
    setElapsedTime(0);
    setDistance(0);
  }, []);

  return {
    state,
    elapsedTime,
    distance,
    currentRecord,
    start,
    stop,
    saveWithMood,
    reset,
  };
}
```

---

### Step 7: コンポーネントの作成

#### 7.1 開始/終了ボタン

**ファイル:** `components/WalkingButton.tsx`

```typescript
import { Pressable, Text } from 'react-native';

type Props = {
  isWalking: boolean;
  onStart: () => void;
  onStop: () => void;
};

export function WalkingButton({ isWalking, onStart, onStop }: Props) {
  return (
    <Pressable
      onPress={isWalking ? onStop : onStart}
      className={`w-40 h-40 rounded-full items-center justify-center ${
        isWalking ? 'bg-red-500' : 'bg-green-500'
      }`}
    >
      <Text className="text-white text-2xl font-bold">
        {isWalking ? '終了' : '開始'}
      </Text>
    </Pressable>
  );
}
```

#### 7.2 経過時間・距離表示

**ファイル:** `components/WalkingStats.tsx`

```typescript
import { View, Text } from 'react-native';
import { formatDuration, formatDistance } from '@/utils/format';

type Props = {
  elapsedTime: number;
  distance: number;
};

export function WalkingStats({ elapsedTime, distance }: Props) {
  return (
    <View className="items-center gap-4">
      <View className="items-center">
        <Text className="text-gray-500 text-sm">経過時間</Text>
        <Text className="text-4xl font-bold">{formatDuration(elapsedTime)}</Text>
      </View>
      <View className="items-center">
        <Text className="text-gray-500 text-sm">距離</Text>
        <Text className="text-4xl font-bold">{formatDistance(distance)}</Text>
      </View>
    </View>
  );
}
```

#### 7.3 気分選択

**ファイル:** `components/MoodSelector.tsx`

```typescript
import { View, Text, Pressable } from 'react-native';
import { MoodType, MOODS } from '@/types/walking';

type Props = {
  selectedMood?: MoodType;
  onSelect: (mood: MoodType) => void;
};

export function MoodSelector({ selectedMood, onSelect }: Props) {
  return (
    <View className="gap-2">
      <Text className="text-center text-lg font-semibold mb-2">
        今の気分は？
      </Text>
      <View className="flex-row justify-center gap-4">
        {MOODS.map((mood) => (
          <Pressable
            key={mood.type}
            onPress={() => onSelect(mood.type)}
            className={`w-14 h-14 rounded-full items-center justify-center ${
              selectedMood === mood.type ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100'
            }`}
          >
            <Text className="text-2xl">{mood.emoji}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
```

---

### Step 8: 画面の実装

#### 8.1 ホーム画面

**ファイル:** `app/index.tsx`

```typescript
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useWalking } from '@/hooks/useWalking';
import { WalkingButton } from '@/components/WalkingButton';
import { WalkingStats } from '@/components/WalkingStats';

export default function HomeScreen() {
  const router = useRouter();
  const { state, elapsedTime, distance, start, stop } = useWalking();

  const handleStop = () => {
    stop();
    router.push('/result');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white gap-8">
      <Text className="text-2xl font-bold">ウォーキングトラッカー</Text>

      {state === 'walking' && (
        <WalkingStats elapsedTime={elapsedTime} distance={distance} />
      )}

      <WalkingButton
        isWalking={state === 'walking'}
        onStart={start}
        onStop={handleStop}
      />
    </View>
  );
}
```

#### 8.2 記録結果画面

**ファイル:** `app/result.tsx`

```typescript
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useWalking } from '@/hooks/useWalking';
import { WalkingStats } from '@/components/WalkingStats';
import { MoodSelector } from '@/components/MoodSelector';
import { MoodType } from '@/types/walking';

export default function ResultScreen() {
  const router = useRouter();
  const { currentRecord, saveWithMood } = useWalking();
  const [selectedMood, setSelectedMood] = useState<MoodType>();

  const handleSave = async () => {
    await saveWithMood(selectedMood);
    router.replace('/');
  };

  if (!currentRecord) {
    router.replace('/');
    return null;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white gap-8 p-4">
      <Text className="text-2xl font-bold">記録完了</Text>

      <WalkingStats
        elapsedTime={currentRecord.duration || 0}
        distance={currentRecord.distance || 0}
      />

      <MoodSelector
        selectedMood={selectedMood}
        onSelect={setSelectedMood}
      />

      <View className="flex-row gap-4">
        <Pressable
          onPress={() => saveWithMood(undefined)}
          className="px-6 py-3 bg-gray-200 rounded-lg"
        >
          <Text className="text-gray-700">スキップ</Text>
        </Pressable>
        <Pressable
          onPress={handleSave}
          className="px-6 py-3 bg-blue-500 rounded-lg"
        >
          <Text className="text-white font-semibold">保存</Text>
        </Pressable>
      </View>
    </View>
  );
}
```

---

## ディレクトリ構成（完成後）

```
app/
  _layout.tsx         # ルートレイアウト
  index.tsx           # ホーム画面
  result.tsx          # 記録結果画面
components/
  WalkingButton.tsx   # 開始/終了ボタン
  WalkingStats.tsx    # 統計表示
  MoodSelector.tsx    # 気分選択
hooks/
  useWalking.ts       # ウォーキング状態管理
services/
  location.ts         # 位置情報サービス
  storage.ts          # ストレージサービス
types/
  walking.ts          # 型定義
utils/
  distance.ts         # 距離計算
  format.ts           # フォーマット
```

---

## 実装チェックリスト

### 環境構築
- [ ] NativeWind セットアップ
- [ ] expo-location インストール
- [ ] AsyncStorage インストール
- [ ] uuid インストール

### 型・ユーティリティ
- [ ] types/walking.ts 作成
- [ ] utils/distance.ts 作成
- [ ] utils/format.ts 作成

### サービス
- [ ] services/storage.ts 作成
- [ ] services/location.ts 作成

### フック
- [ ] hooks/useWalking.ts 作成

### コンポーネント
- [ ] components/WalkingButton.tsx 作成
- [ ] components/WalkingStats.tsx 作成
- [ ] components/MoodSelector.tsx 作成

### 画面
- [ ] app/index.tsx 実装
- [ ] app/result.tsx 実装

### テスト
- [ ] iOS シミュレータで動作確認
- [ ] Android エミュレータで動作確認
- [ ] 位置情報権限の動作確認
- [ ] データ保存の動作確認
