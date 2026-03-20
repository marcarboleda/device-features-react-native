import AsyncStorage from '@react-native-async-storage/async-storage';
import { TravelEntry } from '../types';

const STORAGE_KEY = '@travel_diary_entries';

export const loadEntries = async (): Promise<TravelEntry[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

export const saveEntries = async (entries: TravelEntry[]): Promise<boolean> => {
  try {
    if (!Array.isArray(entries)) return false;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
};

export const addEntry = async (entry: TravelEntry): Promise<boolean> => {
  try {
    if (!entry || !entry.id || !entry.imageUri || !entry.title) return false;
    const existing = await loadEntries();
    const updated = [entry, ...existing];
    return await saveEntries(updated);
  } catch {
    return false;
  }
};

export const removeEntry = async (id: string): Promise<boolean> => {
  try {
    if (!id) return false;
    const existing = await loadEntries();
    const updated = existing.filter((e) => e.id !== id);
    return await saveEntries(updated);
  } catch {
    return false;
  }
};

export const updateEntry = async (updated: TravelEntry): Promise<boolean> => {
  try {
    if (!updated || !updated.id) return false;
    const existing = await loadEntries();
    const mapped = existing.map((e) => (e.id === updated.id ? updated : e));
    return await saveEntries(mapped);
  } catch {
    return false;
  }
};