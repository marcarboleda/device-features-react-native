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
import { useAddEntryLogic } from './AddEntryScreen.logic';
import { createStyles } from './AddEntryScreen.styles';

const AddEntryScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const scrollRef = useRef<ScrollView>(null);

  const {
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
  } = useAddEntryLogic();

  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  const scrollToBottom = (delay = 300) => {
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
          <Text style={styles.headerTitle}>New Entry</Text>
          <Text style={styles.headerSub}>Capture this moment</Text>
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
              <Text style={styles.saveBtnText}>Post</Text>
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
        {/* ── Info bar ── */}
        <View style={styles.infoBar}>
          <Ionicons name="information-circle" size={16} color={colors.accent} />
          <Text style={styles.infoBarText}>
            Location is auto-tagged when you take a photo. Going back without saving discards this entry.
          </Text>
        </View>

        <View style={styles.formSection}>

          {/* ── Photo card ── */}
          <View style={[styles.fieldCard, !!photoError && styles.fieldCardError]}>
            <View style={styles.fieldHeader}>
              <View style={styles.fieldLabelRow}>
                <View style={styles.fieldIconWrap}>
                  <Ionicons name="camera" size={14} color={colors.accent} />
                </View>
                <Text style={styles.fieldLabel}>Photo</Text>
              </View>
              <Text style={[styles.fieldBadge, styles.fieldBadgeRequired]}>Required</Text>
            </View>
            <Text style={styles.fieldHint}>Take a photo to capture this travel moment</Text>

            <View style={styles.cameraInner}>
              {!imageUri ? (
                <View style={styles.photoPlaceholder}>
                  <View style={styles.photoPlaceholderIconCircle}>
                    <Ionicons name="camera" size={28} color={colors.accent} />
                  </View>
                  <Text style={styles.photoPlaceholderTitle}>Add a Photo</Text>
                  <Text style={styles.photoPlaceholderSub}>
                    Take a photo to capture and tag this travel moment
                  </Text>
                  <TouchableOpacity
                    style={styles.openCameraBtn}
                    onPress={takePicture}
                    activeOpacity={0.85}
                    disabled={saving}
                  >
                    <Ionicons name="camera-outline" size={15} color="#FFFFFF" />
                    <Text style={styles.openCameraBtnText}>Open Camera</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.photoPreview}
                    resizeMode="cover"
                  />
                  <View style={styles.photoOverlayRow}>
                    <View style={styles.addressRow}>
                      {loadingLocation ? (
                        <>
                          <ActivityIndicator size="small" color="#FFFFFF" />
                          <Text style={styles.addressLoading}>Getting location…</Text>
                        </>
                      ) : (
                        <>
                          <Ionicons name="location" size={12} color="#FFFFFF" />
                          <Text style={styles.addressText} numberOfLines={1}>
                            {address || 'Location unavailable'}
                          </Text>
                        </>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.retakeBtn}
                      onPress={retakePicture}
                      activeOpacity={0.8}
                      disabled={saving || loadingLocation}
                    >
                      <Ionicons name="camera-reverse-outline" size={13} color="#FFFFFF" />
                      <Text style={styles.retakeBtnText}>Retake</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>

            {!!photoError && (
              <Text style={styles.photoErrorText}>{photoError}</Text>
            )}
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
              onFocus={() => { setTitleFocused(true); scrollToBottom(300); }}
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
              placeholder="Share your thoughts, feelings, or memorable details about this place…"
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
              onFocus={() => { setDescFocused(true); scrollToBottom(300); }}
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

export default AddEntryScreen;