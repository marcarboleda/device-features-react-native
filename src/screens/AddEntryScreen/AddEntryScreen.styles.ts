import { StyleSheet, Platform, Dimensions } from 'react-native';
import { ThemeColors } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      paddingTop: Platform.OS === 'ios' ? 58 : 42,
      paddingBottom: 14,
      paddingHorizontal: 18,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      backgroundColor: colors.headerBg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surfaceElevated,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerCenter: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    headerTitle: {
      fontSize: 17,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: -0.4,
    },
    headerSub: {
      fontSize: 11,
      color: colors.textMuted,
      marginTop: 1,
    },
    saveBtn: {
      backgroundColor: colors.accent,
      paddingHorizontal: 20,
      paddingVertical: 9,
      borderRadius: 50,
      minWidth: 76,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6,
    },
    saveBtnDisabled: {
      opacity: 0.45,
    },
    saveBtnText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '800',
    },

    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 80 },

    photoSection: {
      margin: 16,
      borderRadius: 20,
      overflow: 'hidden',
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      backgroundColor: colors.surfaceElevated,
    },
    photoSectionError: {
      borderColor: colors.danger,
      borderWidth: 1.5,
    },

    photoPlaceholder: {
      height: 240,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      paddingHorizontal: 32,
    },
    photoPlaceholderIconCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.accentDim,
      borderWidth: 1.5,
      borderColor: colors.accent + '44',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    photoPlaceholderTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: -0.2,
    },
    photoPlaceholderSub: {
      fontSize: 13,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 18,
    },
    openCameraBtn: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      backgroundColor: colors.accent,
      paddingHorizontal: 24,
      paddingVertical: 11,
      borderRadius: 50,
    },
    openCameraBtnText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '700',
    },

    photoPreview: {
      width: '100%',
      height: 260,
    },
    photoOverlayRow: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: 'rgba(0,0,0,0.55)',
    },
    addressRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginRight: 8,
    },
    addressText: {
      flex: 1,
      fontSize: 12,
      color: '#FFFFFF',
      fontWeight: '500',
    },
    addressLoading: {
      flex: 1,
      fontSize: 12,
      color: 'rgba(255,255,255,0.7)',
      fontStyle: 'italic',
    },
    retakeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: 'rgba(255,255,255,0.15)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
    },
    retakeBtnText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },

    photoErrorText: {
      fontSize: 12,
      color: colors.danger,
      marginHorizontal: 16,
      marginTop: -8,
      marginBottom: 4,
    },

    formContainer: {
      marginHorizontal: 16,
      marginTop: 4,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    formField: {
      paddingHorizontal: 16,
      paddingTop: 14,
      paddingBottom: 10,
    },
    formFieldBorder: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
    },
    fieldLabelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    fieldLabelLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    fieldLabel: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.9,
    },
    fieldRequired: {
      fontSize: 10,
      color: colors.danger,
      fontWeight: '700',
      backgroundColor: colors.dangerDim,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
    },
    fieldOptional: {
      fontSize: 10,
      color: colors.textMuted,
      fontWeight: '600',
    },
    fieldHint: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 8,
    },
    input: {
      fontSize: 15,
      color: colors.text,
      paddingVertical: 0,
      minHeight: 24,
    },
    textArea: {
      height: 90,
      textAlignVertical: 'top',
    },
    fieldFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 6,
    },
    fieldError: {
      fontSize: 12,
      color: colors.danger,
    },
    charCount: {
      fontSize: 11,
      color: colors.textMuted,
    },
    charCountWarn: {
      color: colors.danger,
    },

    infoBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      marginHorizontal: 16,
      marginTop: 14,
      padding: 14,
      backgroundColor: colors.surfaceElevated,
      borderRadius: 14,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    infoBoxTextWrap: {
      flex: 1,
    },
    infoBoxTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 2,
    },
    infoBoxText: {
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 18,
    },
  });