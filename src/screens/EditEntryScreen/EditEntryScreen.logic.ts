import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { updateEntry } from '../../utils/storage';

type EditNavProp = StackNavigationProp<RootStackParamList, 'EditEntry'>;
type EditRouteProp = RouteProp<RootStackParamList, 'EditEntry'>;

export const useEditEntryLogic = () => {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { entry } = route.params;

  const [title, setTitle] = useState(entry.title);
  const [description, setDescription] = useState(entry.description);
  const [saving, setSaving] = useState(false);
  const [titleError, setTitleError] = useState('');

  const validateTitle = (value: string): string => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return 'Title is required.';
    if (trimmed.length < 3) return 'Title must be at least 3 characters.';
    if (trimmed.length > 60) return 'Title cannot exceed 60 characters.';
    return '';
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (titleError) setTitleError(validateTitle(value));
  };

  const handleSave = async () => {
    if (saving) return;

    const tError = validateTitle(title);
    if (tError) {
      setTitleError(tError);
      Alert.alert('Incomplete', 'Please fix the errors before saving.');
      return;
    }

    setSaving(true);
    try {
      const updated = {
        ...entry,
        title: title.trim(),
        description: description.trim(),
      };
      const success = await updateEntry(updated);
      if (!success) {
        Alert.alert('Save Failed', 'Unable to update your entry. Please try again.');
        setSaving(false);
        return;
      }
      navigation.navigate('Home');
    } catch {
      Alert.alert('Error', 'Something went wrong while saving.');
      setSaving(false);
    }
  };

  const handleBack = () => {
    const hasChanges =
      title.trim() !== entry.title.trim() ||
      description.trim() !== entry.description.trim();

    if (hasChanges) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Going back will discard them.',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } else {
      navigation.navigate('Home');
    }
  };

  return {
    entry,
    title,
    description,
    saving,
    titleError,
    handleTitleChange,
    setDescription,
    handleSave,
    handleBack,
  };
};