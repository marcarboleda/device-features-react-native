import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { TravelEntry } from '../../types';
import { useHomeLogic } from './HomeScreen.logic';
import { createStyles } from './HomeScreen.styles';

const HomeScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = createStyles(colors);
  const {
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
  } = useHomeLogic();

  const formatDate = (timestamp: number): string => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: number): string => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: TravelEntry }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleOpenEntry(item)}
      activeOpacity={0.92}
    >
      <View style={styles.cardImageWrap}>
        {item.imageUri ? (
          <Image
            source={{ uri: item.imageUri }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.cardImagePlaceholder}>
            <Text style={styles.cardImagePlaceholderText}>NO PHOTO</Text>
          </View>
        )}
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title || 'Untitled Entry'}
          </Text>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => handleRemove(item)}
            activeOpacity={0.75}
          >
            <Text style={styles.removeBtnText}>Remove</Text>
          </TouchableOpacity>
        </View>

        {item.description && item.description.trim().length > 0 && (
          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}

        <View style={styles.cardMeta}>
          <Text style={styles.cardAddress} numberOfLines={1}>
            {item.address || 'Location unavailable'}
          </Text>
          <View style={styles.cardMetaDot} />
          <Text style={styles.cardDate}>{formatDate(item.timestamp)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyWrapper}>
      <View style={styles.emptyIconWrap}>
        <Text style={styles.emptyIconText}>+ +</Text>
      </View>
      <Text style={styles.emptyTitle}>No Entries Yet</Text>
      <Text style={styles.emptyBody}>
        Start documenting your travels. Every journey deserves to be remembered.
      </Text>
      <TouchableOpacity
        style={styles.emptyBtn}
        onPress={handleNavigateToAdd}
        activeOpacity={0.85}
      >
        <Text style={styles.emptyBtnText}>Add First Entry</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingWrapper]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Loading Roamly…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appName}>Roamly</Text>
          <Text style={styles.appTagline}>Your travel journal</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Text style={styles.iconBtnText}>{isDark ? 'L' : 'D'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleNavigateToAdd}
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>+ New</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          entries.length === 0 ? { flex: 1 } : styles.listContent
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCloseModal}
        >
          <TouchableOpacity
            style={styles.modalSheet}
            activeOpacity={1}
            onPress={() => {}}
          >
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>Entry Detail</Text>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={handleCloseModal}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCloseBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedEntry && (
              <ScrollView
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                {selectedEntry.imageUri ? (
                  <Image
                    source={{ uri: selectedEntry.imageUri }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.modalImagePlaceholder}>
                    <Text style={styles.modalImagePlaceholderText}>NO PHOTO</Text>
                  </View>
                )}

                <View style={styles.modalBody}>
                  <Text style={styles.modalTitle}>{selectedEntry.title}</Text>

                  {selectedEntry.description && selectedEntry.description.trim().length > 0 && (
                    <Text style={styles.modalDescription}>
                      {selectedEntry.description}
                    </Text>
                  )}

                  <View style={styles.modalDivider} />

                  <View style={styles.modalMetaRow}>
                    <Text style={styles.modalMetaLabel}>Location</Text>
                    <Text style={[styles.modalMetaValue, styles.modalMetaAccent]}>
                      {selectedEntry.address || 'Location unavailable'}
                    </Text>
                  </View>

                  <View style={styles.modalMetaRow}>
                    <Text style={styles.modalMetaLabel}>Date</Text>
                    <Text style={styles.modalMetaValue}>
                      {formatDate(selectedEntry.timestamp)}
                    </Text>
                  </View>

                  <View style={styles.modalMetaRow}>
                    <Text style={styles.modalMetaLabel}>Time</Text>
                    <Text style={styles.modalMetaValue}>
                      {formatTime(selectedEntry.timestamp)}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.modalRemoveBtn}
                  onPress={() => selectedEntry && handleRemove(selectedEntry)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.modalRemoveBtnText}>Remove This Entry</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default HomeScreen;