import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
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
    handleRefresh,
    handleRemove,
    handleNavigateToAdd,
  } = useHomeLogic();

  const formatDate = (timestamp: number): string => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderItem = ({ item }: { item: TravelEntry }) => (
    <View style={styles.card}>
      {item.imageUri ? (
        <Image
          source={{ uri: item.imageUri }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.cardImage, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={{ fontSize: 32 }}>🖼️</Text>
        </View>
      )}
      <View style={styles.cardBody}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title || 'Untitled Entry'}
          </Text>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => handleRemove(item)}
            activeOpacity={0.7}
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
          <Text style={styles.cardPin}>📍</Text>
          <Text style={styles.cardAddress} numberOfLines={1}>
            {item.address || 'Location unavailable'}
          </Text>
          <Text style={styles.cardDot}>·</Text>
          <Text style={styles.cardDate}>{formatDate(item.timestamp)}</Text>
        </View>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyEmoji}>🗺️</Text>
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
        <Text style={styles.loadingText}>Loading your diary…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Travel Diary</Text>
          {entries.length > 0 ? (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>
                {entries.length} {entries.length === 1 ? 'memory' : 'memories'}
              </Text>
            </View>
          ) : (
            <Text style={styles.headerSubtitle}>Your personal travel journal</Text>
          )}
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Text style={styles.iconButtonText}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleNavigateToAdd}
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>+</Text>
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
    </View>
  );
};

export default HomeScreen;
