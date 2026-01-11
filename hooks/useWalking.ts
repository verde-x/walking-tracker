import { useState, useRef, useCallback, useEffect } from 'react';
import * as Crypto from 'expo-crypto';
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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
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
