/**
 * 秒を H:MM:SS 形式にフォーマット
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 距離を数値と単位に分けて返す
 */
export function formatDistanceWithUnit(meters: number): { value: string; unit: string } {
  if (meters < 1000) {
    return { value: Math.round(meters).toString(), unit: 'm' };
  }
  return { value: (meters / 1000).toFixed(1), unit: 'km' };
}

/**
 * メートルを適切な単位で表示（旧API互換）
 */
export function formatDistance(meters: number): string {
  const { value, unit } = formatDistanceWithUnit(meters);
  return `${value} ${unit}`;
}
