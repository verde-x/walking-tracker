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
