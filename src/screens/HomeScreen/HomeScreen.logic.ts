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
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [optionsEntry, setOptionsEntry] = useState<TravelEntry | null>(null);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);

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
    setDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedEntry(null);
  };

  const handleOpenOptions = (entry: TravelEntry) => {
    if (!entry || !entry.id) return;
    setOptionsEntry(entry);
    setOptionsModalVisible(true);
  };

  const handleCloseOptions = () => {
    setOptionsModalVisible(false);
    setOptionsEntry(null);
  };

  // Used by the options bottom sheet (reads optionsEntry)
  const handleEdit = () => {
    if (!optionsEntry) return;
    handleCloseOptions();
    navigation.navigate('EditEntry', { entry: optionsEntry });
  };

  // Used by the detail modal — navigates directly with the given entry,
  // no options sheet involved at all
  const handleEditEntry = (entry: TravelEntry) => {
    if (!entry || !entry.id) return;
    setDetailModalVisible(false);
    setSelectedEntry(null);
    navigation.navigate('EditEntry', { entry });
  };

  const handleRemove = (entry: TravelEntry) => {
    if (!entry || !entry.id) {
      Alert.alert('Error', 'Invalid entry.');
      return;
    }
    handleCloseOptions();
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
                if (selectedEntry?.id === entry.id) handleCloseDetailModal();
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
    detailModalVisible,
    optionsEntry,
    optionsModalVisible,
    handleRefresh,
    handleOpenEntry,
    handleCloseDetailModal,
    handleOpenOptions,
    handleCloseOptions,
    handleEdit,
    handleEditEntry,   // ← new: used by detail modal
    handleRemove,
    handleNavigateToAdd,
  };
};