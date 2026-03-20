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
import { Ionicons } from '@expo/vector-icons';
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
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              <Text style={styles.saveBtnText}>Post</Text>
            </>
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
              <View style={styles.photoPlaceholderIconCircle}>
                <Ionicons name="camera" size={30} color={colors.accent} />
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
                <Ionicons name="camera-outline" size={16} color="#FFFFFF" />
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
                      <Ionicons name="location" size={13} color="#FFFFFF" />
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
                  <Ionicons name="camera-reverse-outline" size={14} color="#FFFFFF" />
                  <Text style={styles.retakeBtnText}>Retake</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {!!photoError && (
          <Text style={styles.photoErrorText}>{photoError}</Text>
        )}

        <View style={styles.formContainer}>
          <View style={styles.formField}>
            <View style={styles.fieldLabelRow}>
              <View style={styles.fieldLabelLeft}>
                <Ionicons name="create-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.fieldLabel}>Title</Text>
              </View>
              <Text style={styles.fieldRequired}>Required</Text>
            </View>
            <Text style={styles.fieldHint}>Give this memory a meaningful name</Text>
            <TextInput
              style={[styles.input, titleFocused && { color: colors.accent }]}
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
            <View style={styles.fieldFooter}>
              {titleError ? (
                <Text style={styles.fieldError}>{titleError}</Text>
              ) : (
                <Text />
              )}
              <Text style={[styles.charCount, title.length > 50 && styles.charCountWarn]}>
                {title.length}/60
              </Text>
            </View>
          </View>

          <View style={[styles.formField, styles.formFieldBorder]}>
            <View style={styles.fieldLabelRow}>
              <View style={styles.fieldLabelLeft}>
                <Ionicons name="document-text-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.fieldLabel}>Description</Text>
              </View>
              <Text style={styles.fieldOptional}>Optional</Text>
            </View>
            <Text style={styles.fieldHint}>What made this place special?</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Share your thoughts, feelings, or memorable details…"
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
            <View style={styles.fieldFooter}>
              <Text />
              <Text style={[styles.charCount, description.length > 260 && styles.charCountWarn]}>
                {description.length}/300
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={18} color={colors.accent} />
          <View style={styles.infoBoxTextWrap}>
            <Text style={styles.infoBoxTitle}>Auto-tagged Location</Text>
            <Text style={styles.infoBoxText}>
              Your current location is captured automatically when you take a photo. Going back without saving discards this entry.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEntryScreen;