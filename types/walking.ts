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
