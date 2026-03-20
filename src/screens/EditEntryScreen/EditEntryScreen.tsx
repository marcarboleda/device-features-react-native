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
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useEditEntryLogic } from './EditEntryScreen.logic';
import { createStyles } from '../AddEntryScreen/AddEntryScreen.styles';

const EditEntryScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const local = localStyles(colors);
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

  const scrollToEnd = (delay = 300) => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, delay);
  };

  return (
    <View style={styles.container}>
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

        <TouchableOpacity
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
          onPress={handleSave}
          activeOpacity={0.85}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="checkmark" size={15} color="#FFFFFF" />
              <Text style={styles.saveBtnText}>Save</Text>
            </>
          )}
        </TouchableOpacity>
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
        <View style={local.photoPreviewWrap}>
          {entry.imageUri ? (
            <Image
              source={{ uri: entry.imageUri }}
              style={local.photoPreview}
              resizeMode="cover"
            />
          ) : (
            <View style={local.photoPlaceholder}>
              <Ionicons name="image-outline" size={32} color={colors.textMuted} />
              <Text style={local.photoPlaceholderText}>No Photo</Text>
            </View>
          )}
          <View style={local.photoOverlay}>
            <Ionicons name="location" size={12} color="#FFFFFF" />
            <Text style={local.photoOverlayText} numberOfLines={1}>
              {entry.address || 'Location unavailable'}
            </Text>
          </View>
          <View style={local.readonlyBadge}>
            <Ionicons name="lock-closed" size={10} color={colors.textMuted} />
            <Text style={local.readonlyText}>Photo and location cannot be changed</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <View
            style={[
              styles.fieldCard,
              titleFocused && styles.fieldCardFocused,
              !!titleError && styles.fieldCardError,
            ]}
          >
            <View style={styles.fieldHeader}>
              <View style={styles.fieldLabelRow}>
                <Ionicons
                  name="create-outline"
                  size={15}
                  color={titleFocused ? colors.accent : colors.textSecondary}
                />
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
              onFocus={() => {
                setTitleFocused(true);
                scrollToEnd(250);
              }}
              onBlur={() => setTitleFocused(false)}
              maxLength={60}
              returnKeyType="next"
              editable={!saving}
            />
            <View style={styles.fieldFooter}>
              {titleError ? (
                <Text style={styles.fieldError}>{titleError}</Text>
              ) : (
                <Text style={styles.fieldError} />
              )}
              <Text style={[styles.charCount, title.length > 50 && styles.charCountWarn]}>
                {title.length}/60
              </Text>
            </View>
          </View>

          <View style={[styles.fieldCard, descFocused && styles.fieldCardFocused]}>
            <View style={styles.fieldHeader}>
              <View style={styles.fieldLabelRow}>
                <Ionicons
                  name="document-text-outline"
                  size={15}
                  color={descFocused ? colors.accent : colors.textSecondary}
                />
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
              onFocus={() => {
                setDescFocused(true);
                scrollToEnd(250);
              }}
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
    </View>
  );
};

const localStyles = (colors: any) =>
  StyleSheet.create({
    photoPreviewWrap: {
      marginHorizontal: 16,
      marginTop: 14,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    photoPreview: {
      width: '100%',
      height: 170,
    },
    photoPlaceholder: {
      height: 170,
      backgroundColor: colors.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    photoPlaceholderText: {
      fontSize: 13,
      color: colors.textMuted,
    },
    photoOverlay: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    photoOverlayText: {
      flex: 1,
      fontSize: 11,
      color: '#FFFFFF',
      fontWeight: '500',
    },
    readonlyBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      paddingVertical: 7,
      backgroundColor: colors.surfaceElevated,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    readonlyText: {
      fontSize: 11,
      color: colors.textMuted,
    },
  });

export default EditEntryScreen;