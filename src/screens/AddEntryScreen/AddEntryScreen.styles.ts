import { StyleSheet, Platform } from 'react-native';
import { ThemeColors } from '../../context/ThemeContext';

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
      borderWidth: 1,
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
      paddingHorizontal: 18,
      paddingVertical: 9,
      borderRadius: 50,
      minWidth: 72,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 6,
    },
    saveBtnDisabled: { opacity: 0.45 },
    saveBtnText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '800',
    },

    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 120 },

    infoBar: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginHorizontal: 16,
      marginTop: 14,
      marginBottom: 2,
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: colors.accentDim,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.accent + '33',
    },
    infoBarText: {
      flex: 1,
      fontSize: 12,
      color: colors.accent,
      fontWeight: '500',
      lineHeight: 17,
    },

    photoSection: {
      marginHorizontal: 16,
      marginTop: 12,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surfaceElevated,
    },
    photoSectionError: {
      borderColor: colors.danger,
      borderWidth: 1.5,
    },
    photoPlaceholder: {
      height: 190,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingHorizontal: 32,
    },
    photoPlaceholderIconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.accentDim,
      borderWidth: 1.5,
      borderColor: colors.accent + '44',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 2,
    },
    photoPlaceholderTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.text,
    },
    photoPlaceholderSub: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 17,
    },
    openCameraBtn: {
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: colors.accent,
      paddingHorizontal: 22,
      paddingVertical: 10,
      borderRadius: 50,
    },
    openCameraBtnText: {
      color: colors.white,
      fontSize: 13,
      fontWeight: '700',
    },

    photoPreview: {
      width: '100%',
      height: 190,
    },
    photoOverlayRow: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    addressRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginRight: 8,
    },
    addressText: {
      flex: 1,
      fontSize: 11,
      color: '#FFFFFF',
      fontWeight: '500',
    },
    addressLoading: {
      flex: 1,
      fontSize: 11,
      color: 'rgba(255,255,255,0.7)',
      fontStyle: 'italic',
    },
    retakeBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(255,255,255,0.18)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.3)',
    },
    retakeBtnText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '700',
    },

    photoErrorText: {
      fontSize: 12,
      color: colors.danger,
      marginHorizontal: 16,
      marginTop: 5,
    },

    formSection: {
      marginHorizontal: 16,
      marginTop: 16,
      gap: 14,
    },

    // Each field is a clearly visible card with a background + border
    fieldCard: {
      backgroundColor: colors.inputBg,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: colors.inputBorder,
      paddingHorizontal: 16,
      paddingTop: 13,
      paddingBottom: 10,
    },
    fieldCardFocused: {
      borderColor: colors.accent,
      borderWidth: 2,
    },
    fieldCardError: {
      borderColor: colors.danger,
      borderWidth: 2,
    },

    fieldHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 1,
    },
    fieldLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    fieldLabel: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.text,
      letterSpacing: 0.1,
    },
    fieldBadge: {
      fontSize: 10,
      fontWeight: '700',
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 5,
    },
    fieldBadgeRequired: {
      color: colors.danger,
      backgroundColor: colors.dangerDim,
    },
    fieldBadgeOptional: {
      color: colors.textMuted,
      backgroundColor: colors.surfaceElevated,
    },
    fieldHint: {
      fontSize: 12,
      color: colors.textMuted,
      marginBottom: 10,
      lineHeight: 16,
      marginTop: 3,
    },

    // The actual input — clearly separated from label with a visible bottom line
    input: {
      fontSize: 15,
      color: colors.text,
      paddingVertical: 10,
      paddingHorizontal: 12,
      minHeight: 44,
      backgroundColor: colors.surfaceElevated,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputFocused: {
      borderColor: colors.accent,
      backgroundColor: colors.accentDim,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
      paddingTop: 10,
    },

    fieldFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    fieldError: {
      fontSize: 11,
      color: colors.danger,
      flex: 1,
    },
    charCount: {
      fontSize: 11,
      color: colors.textMuted,
    },
    charCountWarn: { color: colors.danger },
  });