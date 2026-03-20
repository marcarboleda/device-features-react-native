import React, { useState, useRef } from 'react';
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
  TouchableWithoutFeedback,
  TextInput,
  Animated,
  StyleSheet,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { TravelEntry } from '../../types';
import { useHomeLogic } from './HomeScreen.logic';
import { createStyles } from './HomeScreen.styles';

// ── SwipeableCard — proper component so useRef is valid ──────────────────────
interface SwipeableCardProps {
  item: TravelEntry;
  colors: any;
  styles: any;
  openSwipeableRef: React.MutableRefObject<Swipeable | null>;
  onPress: () => void;
  onOptions: () => void;
  onDelete: () => void;
  formatDate: (ts: number) => string;
}

const SwipeableCard = ({
  item,
  colors,
  styles,
  openSwipeableRef,
  onPress,
  onOptions,
  onDelete,
  formatDate,
}: SwipeableCardProps) => {
  const swipeRef = useRef<Swipeable | null>(null);

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });
    return (
      <Animated.View style={[styles.swipeDeleteWrap, { transform: [{ translateX }] }]}>
        <TouchableOpacity
          style={styles.swipeDeleteBtn}
          activeOpacity={0.85}
          onPress={() => {
            swipeRef.current?.close();
            onDelete();
          }}
        >
          <Ionicons name="trash" size={22} color="#FFFFFF" />
          <Text style={styles.swipeDeleteText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={() => {
        if (
          openSwipeableRef.current &&
          openSwipeableRef.current !== swipeRef.current
        ) {
          openSwipeableRef.current.close();
        }
        openSwipeableRef.current = swipeRef.current;
      }}
      onSwipeableClose={() => {
        if (openSwipeableRef.current === swipeRef.current) {
          openSwipeableRef.current = null;
        }
      }}
      containerStyle={styles.swipeableContainer}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.88}
      >
        <View style={styles.cardImageWrap}>
          {item.imageUri ? (
            <Image source={{ uri: item.imageUri }} style={styles.cardImage} resizeMode="cover" />
          ) : (
            <View style={styles.cardImagePlaceholder}>
              <Ionicons name="image-outline" size={28} color={colors.textMuted} />
              <Text style={styles.cardImagePlaceholderText}>NO PHOTO</Text>
            </View>
          )}
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title || 'Untitled'}
            </Text>
            <TouchableOpacity
              style={styles.optionsBtn}
              onPress={onOptions}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="ellipsis-horizontal" size={17} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          {item.description?.trim().length > 0 && (
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
          <View style={styles.cardFooter}>
            <Ionicons name="location-outline" size={12} color={colors.accent} />
            <Text style={styles.cardAddress} numberOfLines={1}>
              {item.address || 'Location unavailable'}
            </Text>
            <Ionicons name="calendar-outline" size={11} color={colors.textMuted} />
            <Text style={styles.cardDate}>{formatDate(item.timestamp)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

// ── HomeScreen ────────────────────────────────────────────────────────────────
const HomeScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = createStyles(colors);
  const [searchFocused, setSearchFocused] = useState(false);
  const openSwipeableRef = useRef<Swipeable | null>(null);

  const {
    entries,
    filteredEntries,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
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
    handleEditEntry,
    handleRemove,
    handleNavigateToAdd,
  } = useHomeLogic();

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const renderItem = ({ item }: { item: TravelEntry }) => (
    <SwipeableCard
      item={item}
      colors={colors}
      styles={styles}
      openSwipeableRef={openSwipeableRef}
      onPress={() => handleOpenEntry(item)}
      onOptions={() => handleOpenOptions(item)}
      onDelete={() => handleRemove(item)}
      formatDate={formatDate}
    />
  );

  const renderEmpty = () => {
    if (entries.length === 0) {
      return (
        <View style={styles.emptyWrapper}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="map-outline" size={38} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No Entries Yet</Text>
          <Text style={styles.emptyBody}>
            Start documenting your travels.{'\n'}Every journey deserves to be remembered.
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            onPress={handleNavigateToAdd}
            activeOpacity={0.85}
          >
            <Ionicons name="add" size={18} color={colors.white} />
            <Text style={styles.emptyBtnText}>Add First Entry</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.emptyWrapper}>
        <View style={styles.emptyIconWrap}>
          <Ionicons name="search-outline" size={38} color={colors.textMuted} />
        </View>
        <Text style={styles.emptyTitle}>Nothing Matched</Text>
        <Text style={styles.emptyBody}>
          No entries found for "{searchQuery}".{'\n'}
          Try a different title, location, or date.
        </Text>
        <TouchableOpacity
          style={styles.clearSearchBtn}
          onPress={handleClearSearch}
          activeOpacity={0.85}
        >
          <Ionicons name="close-circle-outline" size={18} color={colors.accent} />
          <Text style={styles.clearSearchBtnText}>Clear Search</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingWrapper]}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Loading Lakbay Co…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.appName}>
            Lakbay<Text style={styles.appNameAccent}> Co.</Text>
          </Text>
          <Text style={styles.appTagline}>Your personal travel journal</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleTheme} activeOpacity={0.7}>
            <Ionicons
              name={isDark ? 'sunny-outline' : 'moon-outline'}
              size={17}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Search bar ── */}
      {entries.length > 0 && (
        <View style={styles.searchContainer}>
          <View style={[styles.searchWrap, searchFocused && styles.searchWrapActive]}>
            <Ionicons
              name="search-outline"
              size={17}
              color={searchFocused ? colors.accent : colors.textMuted}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by title, location, or date…"
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              returnKeyType="search"
              clearButtonMode="never"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.searchClearBtn}
                onPress={handleClearSearch}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close" size={12} color={colors.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          filteredEntries.length === 0 ? { flex: 1 } : styles.listContent
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
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />

      {/* ── FAB ── */}
      <TouchableOpacity style={styles.fab} onPress={handleNavigateToAdd} activeOpacity={0.85}>
        <Ionicons name="add" size={20} color="#FFFFFF" />
        <Text style={styles.fabText}>New</Text>
      </TouchableOpacity>

      {/* ── Options bottom sheet ─────────────────────────── */}
      <Modal
        visible={optionsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseOptions}
      >
        <TouchableWithoutFeedback onPress={handleCloseOptions}>
          <View style={styles.optionsOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.optionsSheet}>
                <View style={styles.optionsHandle} />
                <Text style={styles.optionsTitle} numberOfLines={1}>
                  {optionsEntry?.title ?? 'Entry Options'}
                </Text>
                <TouchableOpacity style={styles.optionRow} onPress={handleEdit} activeOpacity={0.8}>
                  <View style={[styles.optionIconWrap, { backgroundColor: colors.accentDim }]}>
                    <Ionicons name="pencil-outline" size={18} color={colors.accent} />
                  </View>
                  <Text style={styles.optionText}>Edit Entry</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.optionRow, styles.optionRowBorder]}
                  onPress={() => optionsEntry && handleRemove(optionsEntry)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.optionIconWrap, { backgroundColor: colors.dangerDim }]}>
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                  </View>
                  <Text style={[styles.optionText, styles.optionTextDanger]}>Delete Entry</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionCancelRow}
                  onPress={handleCloseOptions}
                  activeOpacity={0.8}
                >
                  <Text style={styles.optionCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* ── Detail modal ─────────────────────────────────── */}
      <Modal
        visible={detailModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseDetailModal}
      >
        <View style={styles.detailOverlay}>
          <TouchableWithoutFeedback onPress={handleCloseDetailModal}>
            <View style={styles.detailBackdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.detailSheet}>
            {selectedEntry && (
              <ScrollView
                style={styles.detailScroll}
                contentContainerStyle={styles.detailScrollContent}
                showsVerticalScrollIndicator={false}
                bounces
              >
                <View style={styles.detailImageWrap}>
                  {selectedEntry.imageUri ? (
                    <Image
                      source={{ uri: selectedEntry.imageUri }}
                      style={styles.detailImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.detailImagePlaceholder}>
                      <Ionicons name="image-outline" size={40} color={colors.textMuted} />
                      <Text style={styles.detailImagePlaceholderText}>NO PHOTO</Text>
                    </View>
                  )}
                  <View style={styles.detailImageAbsoluteBar}>
                    <TouchableOpacity
                      style={styles.detailCloseBtn}
                      onPress={handleCloseDetailModal}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="close" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.detailBody}>
                  <Text style={styles.detailTitle}>{selectedEntry.title}</Text>
                  {selectedEntry.description?.trim().length > 0 && (
                    <Text style={styles.detailDescription}>
                      {selectedEntry.description}
                    </Text>
                  )}
                  <View style={styles.detailDivider} />
                  <View style={styles.detailMetaCard}>
                    <View style={styles.detailMetaRow}>
                      <View style={styles.detailMetaIconWrap}>
                        <Ionicons name="location" size={16} color={colors.accent} />
                      </View>
                      <View style={styles.detailMetaContent}>
                        <Text style={styles.detailMetaLabel}>Location</Text>
                        <Text style={[styles.detailMetaValue, styles.detailMetaAccent]}>
                          {selectedEntry.address || 'Unavailable'}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.detailMetaRow, styles.detailMetaRowBorder]}>
                      <View style={styles.detailMetaIconWrap}>
                        <Ionicons name="calendar" size={16} color={colors.accent} />
                      </View>
                      <View style={styles.detailMetaContent}>
                        <Text style={styles.detailMetaLabel}>Date</Text>
                        <Text style={styles.detailMetaValue}>
                          {formatDate(selectedEntry.timestamp)}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.detailMetaRow, styles.detailMetaRowBorder]}>
                      <View style={styles.detailMetaIconWrap}>
                        <Ionicons name="time" size={16} color={colors.accent} />
                      </View>
                      <View style={styles.detailMetaContent}>
                        <Text style={styles.detailMetaLabel}>Time</Text>
                        <Text style={styles.detailMetaValue}>
                          {formatTime(selectedEntry.timestamp)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.detailActionRow}>
                    <TouchableOpacity
                      style={styles.detailEditBtn}
                      onPress={() => handleEditEntry(selectedEntry)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="pencil-outline" size={15} color={colors.accent} />
                      <Text style={styles.detailEditBtnText}>Edit Entry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.detailRemoveBtn}
                      onPress={() => handleRemove(selectedEntry)}
                      activeOpacity={0.75}
                    >
                      <Ionicons name="trash-outline" size={15} color={colors.danger} />
                      <Text style={styles.detailRemoveBtnText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;