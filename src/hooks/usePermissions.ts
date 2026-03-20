import { useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export interface PermissionStatus {
  camera: boolean;
  location: boolean;
  notifications: boolean;
}

export const usePermissions = () => {
  const [permissions, setPermissions] = useState<PermissionStatus>({
    camera: false,
    location: false,
    notifications: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setupNotifications();
    requestAllPermissions();
  }, []);

  const setupNotifications = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  };

  const requestAllPermissions = async () => {
    setLoading(true);

    const camera = await requestCameraPermission();
    const location = await requestLocationPermission();
    const notifications = await requestNotificationPermission();

    const denied: string[] = [];
    if (!camera) denied.push('• Camera — needed to take travel photos');
    if (!location) denied.push('• Location — needed to tag your current address');
    if (!notifications) denied.push('• Notifications — needed to confirm saved entries');

    if (denied.length > 0) {
      Alert.alert(
        'Permissions Needed',
        `Some permissions were denied:\n\n${denied.join('\n')}\n\nGo to Settings to enable them for the full experience.`,
        [{ text: 'OK' }]
      );
    }

    setPermissions({ camera, location, notifications });
    setLoading(false);
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  };

  const requestLocationPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    try {
      if (!Device.isDevice) return false;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('travel-diary', {
          name: 'Travel Diary',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#1DA1F2',
          sound: 'default',
        });
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      if (existingStatus === 'granted') return true;

      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch {
      return false;
    }
  };

  return { permissions, loading };
};