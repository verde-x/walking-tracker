import { useState, useRef, useCallback, useEffect } from 'react';
import * as Crypto from 'expo-crypto';
import { WalkingState, WalkingRecord, LocationPoint, MoodType } from '@/types/walking';
import { startLocationTracking, requestLocationPermission, getCurrentLocation } from '@/services/location';
import { startPedometerTracking } from '@/services/pedometer';
import { calculateTotalDistance } from '@/utils/distance';
import { saveRecord } from '@/services/storage';

export function useWalking() {
  const [state, setState] = useState<WalkingState>('idle');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentRecord, setCurrentRecord] = useState<Partial<WalkingRecord> | null>(null);

  const startTimeRef = useRef<Date | null>(null);
  const locationsRef = useRef<LocationPoint[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const locationTrackerRef = useRef<{ stop: () => void } | null>(null);
  const pedometerTrackerRef = useRef<{ stop: () => void } | null>(null);

  // GPS距離と歩数計距離を追跡
  const gpsDistanceRef = useRef(0);
  const pedometerDistanceRef = useRef(0);

  // 表示距離を更新（GPSと歩数計の大きい方を使用）
  const updateDistance = useCallback(() => {
    const newDistance = Math.max(gpsDistanceRef.current, pedometerDistanceRef.current);
    setDistance(newDistance);
  }, []);

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
      return false;
    }

    startTimeRef.current = new Date();
    locationsRef.current = [];
    gpsDistanceRef.current = 0;
    pedometerDistanceRef.current = 0;
    setElapsedTime(0);
    setDistance(0);
    setState('walking');

    // 開始時に最初の位置を取得
    const initialLocation = await getCurrentLocation();
    if (initialLocation) {
      locationsRef.current.push(initialLocation);
    }

    // GPS追跡を開始
    locationTrackerRef.current = startLocationTracking((location) => {
      locationsRef.current.push(location);
      gpsDistanceRef.current = calculateTotalDistance(locationsRef.current);
      updateDistance();
    });

    // 歩数計追跡を開始
    pedometerTrackerRef.current = startPedometerTracking((_steps, pedometerDistance) => {
      pedometerDistanceRef.current = pedometerDistance;
      updateDistance();
    });

    return true;
  }, [updateDistance]);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (locationTrackerRef.current) locationTrackerRef.current.stop();
    if (pedometerTrackerRef.current) pedometerTrackerRef.current.stop();

    const endTime = new Date();
    const record: Partial<WalkingRecord> = {
      id: Crypto.randomUUID(),
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
    setElapsedTime(0);
    setDistance(0);
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
