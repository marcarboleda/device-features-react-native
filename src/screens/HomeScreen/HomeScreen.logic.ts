import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TravelEntry, RootStackParamList } from '../../types';
import { loadEntries, removeEntry } from '../../utils/storage';

type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const useHomeLogic = () => {
  const navigation = useNavigation<HomeNavProp>();
  const [entries, setEntries] = useState<TravelEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TravelEntry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchEntries = async () => {
    try {
      const data = await loadEntries();
      setEntries(Array.isArray(data) ? data : []);
    } catch {
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchEntries();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchEntries();
    setRefreshing(false);
  };

  const handleOpenEntry = (entry: TravelEntry) => {
    if (!entry || !entry.id) return;
    setSelectedEntry(entry);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  const handleRemove = (entry: TravelEntry) => {
    if (!entry || !entry.id) {
      Alert.alert('Error', 'Invalid entry.');
      return;
    }

    Alert.alert(
      'Remove Entry',
      `Are you sure you want to remove "${entry.title}"?\n\nThis action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await removeEntry(entry.id);
              if (success) {
                setEntries((prev) => prev.filter((e) => e.id !== entry.id));
                if (selectedEntry?.id === entry.id) handleCloseModal();
              } else {
                Alert.alert('Error', 'Failed to remove entry. Please try again.');
              }
            } catch {
              Alert.alert('Error', 'An unexpected error occurred.');
            }
          },
        },
      ]
    );
  };

  const handleNavigateToAdd = () => {
    navigation.navigate('AddEntry');
  };

  return {
    entries,
    loading,
    refreshing,
    selectedEntry,
    modalVisible,
    handleRefresh,
    handleOpenEntry,
    handleCloseModal,
    handleRemove,
    handleNavigateToAdd,
  };
};