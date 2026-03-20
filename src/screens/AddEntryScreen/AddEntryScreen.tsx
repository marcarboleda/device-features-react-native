import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAddEntryLogic } from './AddEntryScreen.logic';
import { createStyles } from './AddEntryScreen.styles';

const AddEntryScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={handleBack}
          activeOpacity={0.7}
          disabled={saving}
        >
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>New Entry</Text>
          <Text style={styles.headerSubtitle}>Capture this moment</Text>
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
            <Text style={styles.saveBtnText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.photoSection, !!photoError && styles.photoSectionError]}>
          {!imageUri ? (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoPlaceholderEmoji}>📷</Text>
              <Text style={styles.photoPlaceholderTitle}>No Photo Taken</Text>
              <Text style={styles.photoPlaceholderSub}>
                Take a photo to capture and tag this travel moment
              </Text>
              <TouchableOpacity
                style={styles.openCameraBtn}
                onPress={takePicture}
                activeOpacity={0.85}
                disabled={saving}
              >
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
              <TouchableOpacity
                style={styles.retakeBtn}
                onPress={retakePicture}
                activeOpacity={0.8}
                disabled={saving || loadingLocation}
              >
                <Text>🔄</Text>
                <Text style={styles.retakeBtnText}>Retake</Text>
              </TouchableOpacity>
              <View style={styles.addressBar}>
                <Text>📍</Text>
                {loadingLocation ? (
                  <>
                    <Text style={styles.addressBarLoading}>Getting your location…</Text>
                    <ActivityIndicator size="small" color={colors.accent} />
                  </>
                ) : (
                  <Text style={styles.addressBarText} numberOfLines={2}>
                    {address || 'Location unavailable'}
                  </Text>
                )}
              </View>
            </>
          )}
        </View>

        {!!photoError && (
          <Text style={styles.photoErrorText}>{photoError}</Text>
        )}

        <View style={styles.formSection}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Entry Title *</Text>
            <Text style={styles.fieldHint}>Give this memory a meaningful name</Text>
            <TextInput
              style={[
                styles.input,
                titleFocused && styles.inputFocused,
                !!titleError && styles.inputError,
              ]}
              placeholder="e.g. Sunset at Palawan Beach"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={handleTitleChange}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              maxLength={60}
              returnKeyType="next"
              editable={!saving}
            />
            <View style={styles.charRow}>
              {titleError ? (
                <Text style={styles.fieldError}>{titleError}</Text>
              ) : (
                <Text
                  style={[
                    styles.charCount,
                    title.length > 50 && styles.charCountWarn,
                  ]}
                >
                  {title.length}/60
                </Text>
              )}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Description</Text>
            <Text style={styles.fieldHint}>
              Describe what made this place special (optional)
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                descFocused && styles.inputFocused,
              ]}
              placeholder="Share your thoughts, feelings, or memorable details about this place…"
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
              onFocus={() => setDescFocused(true)}
              onBlur={() => setDescFocused(false)}
              multiline
              maxLength={300}
              returnKeyType="done"
              blurOnSubmit
              editable={!saving}
            />
            <View style={styles.charRow}>
              <Text
                style={[
                  styles.charCount,
                  description.length > 260 && styles.charCountWarn,
                ]}
              >
                {description.length}/300
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxIcon}>ℹ️</Text>
          <Text style={styles.infoBoxText}>
            Your location is automatically captured when you take a photo. Going back without saving will discard this entry.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEntryScreen;
