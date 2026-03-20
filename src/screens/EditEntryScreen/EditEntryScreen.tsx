import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useEditEntryLogic } from './EditEntryScreen.logic';
import { createStyles } from '../AddEntryScreen/AddEntryScreen.styles';

const EditEntryScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const scrollRef = useRef<ScrollView>(null);

  const {
    entry,
    title,
    description,
    saving,
    titleError,
    handleTitleChange,
    setDescription,
    handleSave,
    handleBack,
  } = useEditEntryLogic();

  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  // Disabled if nothing changed or title is empty
  const hasChanges =
    title.trim() !== (entry.title ?? '').trim() ||
    description.trim() !== (entry.description ?? '').trim();
  const canSave = hasChanges && title.trim().length > 0;

  const scrollToEnd = (delay = 300) => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, delay);
  };

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleBack}
          activeOpacity={0.7}
          disabled={saving}
        >
          <Ionicons name="arrow-back" size={20} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Edit Entry</Text>
          <Text style={styles.headerSub}>Update this memory</Text>
        </View>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      >
        <View style={styles.formSection}>

          {/* ── Photo card (locked) ── */}
          <View style={styles.fieldCard}>
            <View style={styles.fieldHeader}>
              <View style={styles.fieldLabelRow}>
                <View style={styles.fieldIconWrap}>
                  <Ionicons name="image" size={14} color={colors.accent} />
                </View>
                <Text style={styles.fieldLabel}>Photo</Text>
              </View>
              <Text style={[styles.fieldBadge, styles.fieldBadgeLocked]}>Locked</Text>
            </View>
            <Text style={styles.fieldHint}>Photo and location cannot be changed</Text>
            <View style={styles.cameraInner}>
              {entry.imageUri ? (
                <Image
                  source={{ uri: entry.imageUri }}
                  style={styles.photoPreview}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="image-outline" size={32} color={colors.textMuted} />
                  <Text style={styles.photoPlaceholderTitle}>No Photo</Text>
                </View>
              )}
              <View style={styles.photoOverlayRow}>
                <View style={styles.addressRow}>
                  <Ionicons name="location" size={12} color="#FFFFFF" />
                  <Text style={styles.addressText} numberOfLines={1}>
                    {entry.address || 'Location unavailable'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.readonlyBadge}>
              <Ionicons name="lock-closed" size={10} color={colors.textMuted} />
              <Text style={styles.readonlyText}>Photo and location cannot be changed</Text>
            </View>
          </View>

          {/* ── Title card ── */}
          <View
            style={[
              styles.fieldCard,
              titleFocused && styles.fieldCardFocused,
              !!titleError && styles.fieldCardError,
            ]}
          >
            <View style={styles.fieldHeader}>
              <View style={styles.fieldLabelRow}>
                <View style={styles.fieldIconWrap}>
                  <Ionicons name="create" size={14} color={colors.accent} />
                </View>
                <Text style={styles.fieldLabel}>Title</Text>
              </View>
              <Text style={[styles.fieldBadge, styles.fieldBadgeRequired]}>Required</Text>
            </View>
            <Text style={styles.fieldHint}>Give this memory a meaningful name</Text>
            <TextInput
              style={[styles.input, titleFocused && styles.inputFocused]}
              placeholder="e.g. Sunset at Palawan Beach"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={handleTitleChange}
              onFocus={() => { setTitleFocused(true); scrollToEnd(250); }}
              onBlur={() => setTitleFocused(false)}
              maxLength={60}
              returnKeyType="next"
              editable={!saving}
            />
            <View style={styles.fieldFooter}>
              {titleError
                ? <Text style={styles.fieldError}>{titleError}</Text>
                : <Text style={styles.fieldError} />
              }
              <Text style={[styles.charCount, title.length > 50 && styles.charCountWarn]}>
                {title.length}/60
              </Text>
            </View>
          </View>

          {/* ── Description card ── */}
          <View style={[styles.fieldCard, descFocused && styles.fieldCardFocused]}>
            <View style={styles.fieldHeader}>
              <View style={styles.fieldLabelRow}>
                <View style={styles.fieldIconWrap}>
                  <Ionicons name="document-text" size={14} color={colors.accent} />
                </View>
                <Text style={styles.fieldLabel}>Description</Text>
              </View>
              <Text style={[styles.fieldBadge, styles.fieldBadgeOptional]}>Optional</Text>
            </View>
            <Text style={styles.fieldHint}>What made this place special?</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Share your thoughts, feelings, or memorable details…"
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
              onFocus={() => { setDescFocused(true); scrollToEnd(250); }}
              onBlur={() => setDescFocused(false)}
              multiline
              maxLength={300}
              returnKeyType="done"
              blurOnSubmit
              editable={!saving}
            />
            <View style={styles.fieldFooter}>
              <Text style={styles.fieldError} />
              <Text style={[styles.charCount, description.length > 260 && styles.charCountWarn]}>
                {description.length}/300
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* ── Bottom save bar ── */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.saveBtn,
            (!canSave || saving) && styles.saveBtnDisabled,
          ]}
          onPress={handleSave}
          activeOpacity={canSave ? 0.85 : 1}
          disabled={!canSave || saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default EditEntryScreen;