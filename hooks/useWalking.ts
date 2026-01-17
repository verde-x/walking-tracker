import { useState, useRef, useCallback, useEffect } from 'react';
import * as Crypto from 'expo-crypto';
import { WalkingState, WalkingRecord, LocationPoint, MoodType } from '@/types/walking';
import { startLocationTracking, requestLocationPermission, getCurrentLocation } from '@/services/location';
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

  // 一時停止機能用のref
  const accumulatedTimeRef = useRef(0); // 一時停止前の累積時間
  const resumeTimeRef = useRef<number | null>(null); // 再開時刻

  // タイマー更新
  useEffect(() => {
    if (state === 'walking') {
      timerRef.current = setInterval(() => {
        if (resumeTimeRef.current !== null) {
          const timeSinceResume = Math.floor((Date.now() - resumeTimeRef.current) / 1000);
          setElapsedTime(accumulatedTimeRef.current + timeSinceResume);
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
    accumulatedTimeRef.current = 0;
    resumeTimeRef.current = Date.now();
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
      const totalDistance = calculateTotalDistance(locationsRef.current);
      setDistance(totalDistance);
    });

    return true;
  }, []);

  const pause = useCallback(() => {
    // タイマーを停止
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // GPS追跡を停止
    if (locationTrackerRef.current) {
      locationTrackerRef.current.stop();
      locationTrackerRef.current = null;
    }

    // 累積時間を保存
    if (resumeTimeRef.current !== null) {
      const timeSinceResume = Math.floor((Date.now() - resumeTimeRef.current) / 1000);
      accumulatedTimeRef.current += timeSinceResume;
      resumeTimeRef.current = null;
    }

    setState('paused');
  }, []);

  const resume = useCallback(async () => {
    // 再開時刻を記録
    resumeTimeRef.current = Date.now();
    setState('walking');

    // GPS追跡を再開
    locationTrackerRef.current = startLocationTracking((location) => {
      locationsRef.current.push(location);
      const totalDistance = calculateTotalDistance(locationsRef.current);
      setDistance(totalDistance);
    });
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (locationTrackerRef.current) locationTrackerRef.current.stop();

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
    accumulatedTimeRef.current = 0;
    resumeTimeRef.current = null;
  }, []);

  return {
    state,
    elapsedTime,
    distance,
    currentRecord,
    start,
    pause,
    resume,
    stop,
    saveWithMood,
    reset,
  };
}
