import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, TravelEntry } from '../../types';
import { addEntry } from '../../utils/storage';
import { sendEntrySavedNotification } from '../../utils/notifications';

type AddEntryNavProp = StackNavigationProp<RootStackParamList, 'AddEntry'>;

export const useAddEntryLogic = () => {
  const navigation = useNavigation<AddEntryNavProp>();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [saving, setSaving] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [photoError, setPhotoError] = useState('');

  const resetForm = () => {
    setImageUri(null);
    setAddress('');
    setTitle('');
    setDescription('');
    setTitleError('');
    setPhotoError('');
    setLoadingLocation(false);
    setSaving(false);
  };

  const fetchCurrentAddress = async () => {
    setLoadingLocation(true);
    setAddress('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Denied',
          'Location access is required to tag your entry with the current address. Please enable it in Settings.'
        );
        setAddress('Location permission denied');
        setLoadingLocation(false);
        return;
      }

      const locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      if (!locationData || !locationData.coords) {
        setAddress('Location unavailable');
        setLoadingLocation(false);
        return;
      }

      const geocoded = await Location.reverseGeocodeAsync({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
      });

      if (geocoded && geocoded.length > 0) {
        const place = geocoded[0];
        const parts = [
          place.name,
          place.street,
          place.district,
          place.city,
          place.region,
          place.country,
        ].filter((p) => p && p.trim().length > 0);
        const unique = [...new Set(parts)];
        setAddress(unique.join(', ') || 'Address not found');
      } else {
        setAddress('Address not found');
      }
    } catch {
      setAddress('Unable to get location');
      Alert.alert(
        'Location Error',
        'Unable to retrieve your current location. Make sure location services are enabled.'
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  const takePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Denied',
          'Camera access is required to take travel photos. Please enable it in Settings.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        if (!uri) {
          Alert.alert('Camera Error', 'Failed to capture photo. Please try again.');
          return;
        }
        setImageUri(uri);
        setPhotoError('');
        await fetchCurrentAddress();
      }
    } catch {
      Alert.alert('Camera Error', 'An unexpected error occurred while accessing the camera.');
    }
  };

  const retakePicture = () => {
    Alert.alert(
      'Retake Photo',
      'This will replace your current photo. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Retake',
          onPress: async () => {
            setImageUri(null);
            setAddress('');
            await takePicture();
          },
        },
      ]
    );
  };

  const validateTitle = (value: string): string => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Title is required.';
    if (trimmed.length < 3) return 'Title must be at least 3 characters.';
    if (trimmed.length > 60) return 'Title cannot exceed 60 characters.';
    return '';
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (titleError) {
      setTitleError(validateTitle(value));
    }
  };

  const validateForm = (): boolean => {
    let valid = true;

    if (!imageUri) {
      setPhotoError('A photo is required to create an entry.');
      valid = false;
    } else {
      setPhotoError('');
    }

    const tError = validateTitle(title);
    if (tError) {
      setTitleError(tError);
      valid = false;
    } else {
      setTitleError('');
    }

    return valid;
  };

  const handleSave = async () => {
    if (saving) return;

    if (!validateForm()) {
      Alert.alert('Incomplete Entry', 'Please fix the errors before saving.');
      return;
    }

    setSaving(true);
    try {
      const entry: TravelEntry = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        imageUri: imageUri!,
        address: address.trim() || 'Location not available',
        title: title.trim(),
        description: description.trim(),
        timestamp: Date.now(),
      };

      const success = await addEntry(entry);
      if (!success) {
        Alert.alert('Save Failed', 'Unable to save your entry. Please try again.');
        setSaving(false);
        return;
      }

      await sendEntrySavedNotification(entry.title);
      resetForm();
      navigation.navigate('Home');
    } catch {
      Alert.alert('Unexpected Error', 'Something went wrong while saving. Please try again.');
      setSaving(false);
    }
  };

  const handleBack = () => {
    const hasUnsavedData = imageUri || title.trim().length > 0 || description.trim().length > 0;

    if (hasUnsavedData) {
      Alert.alert(
        'Discard Entry?',
        'You have unsaved changes. Going back will discard this entry.',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              resetForm();
              navigation.navigate('Home');
            },
          },
        ]
      );
    } else {
      resetForm();
      navigation.navigate('Home');
    }
  };

  return {
    imageUri,
    address,
    title,
    description,
    loadingLocation,
    saving,
    titleError,
    photoError,
    handleTitleChange,
    setDescription,
    takePicture,
    retakePicture,
    handleSave,
    handleBack,
  };
};