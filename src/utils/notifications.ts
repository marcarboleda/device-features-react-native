import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const sendEntrySavedNotification = async (title: string): Promise<void> => {
  try {
    if (!title || title.trim().length === 0) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📍 Entry Saved!',
        body: `"${title.trim()}" has been added to your Travel Diary.`,
        sound: true,
        ...(Platform.OS === 'android' && { channelId: 'travel-diary' }),
      },
      trigger: null,
    });
  } catch {
    // Silently fails in Expo Go on SDK 54+ — requires dev build for push tokens
  }
};