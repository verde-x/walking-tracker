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
