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
      paddingHorizontal: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.border,
      backgroundColor: colors.headerBg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    backBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.surfaceElevated,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backBtnText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
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
      letterSpacing: 0.1,
    },
    saveBtn: {
      backgroundColor: colors.accent,
      paddingHorizontal: 18,
      paddingVertical: 9,
      borderRadius: 50,
      minWidth: 72,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveBtnDisabled: {
      opacity: 0.45,
    },
    saveBtnText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '800',
      letterSpacing: 0.1,
    },

    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 80,
    },

    photoSection: {
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 4,
      borderRadius: 14,
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
      height: 220,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingHorizontal: 32,
    },
    photoPlaceholderIconWrap: {
      width: 56,
      height: 56,
      borderRadius: 28,
      borderWidth: 1.5,
      borderColor: colors.borderLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    photoPlaceholderIconText: {
      fontSize: 22,
      color: colors.textMuted,
    },
    photoPlaceholderTitle: {
      fontSize: 15,
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
      backgroundColor: colors.accent,
      paddingHorizontal: 24,
      paddingVertical: 11,
      borderRadius: 50,
    },
    openCameraBtnText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 0.1,
    },

    photoPreview: {
      width: '100%',
      height: 220,
    },
    retakeBtn: {
      position: 'absolute',
      bottom: 46,
      right: 12,
      backgroundColor: 'rgba(0,0,0,0.62)',
      paddingHorizontal: 13,
      paddingVertical: 7,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },
    retakeBtnText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 0.2,
    },

    addressBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: colors.accentDim,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.border,
      gap: 8,
      minHeight: 40,
    },
    addressBarLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: colors.accent,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    addressBarText: {
      flex: 1,
      fontSize: 12,
      color: colors.accent,
      fontWeight: '500',
      lineHeight: 17,
    },
    addressBarLoading: {
      flex: 1,
      fontSize: 12,
      color: colors.textSecondary,
      fontStyle: 'italic',
    },

    photoErrorText: {
      fontSize: 12,
      color: colors.danger,
      marginHorizontal: 16,
      marginTop: 5,
      marginBottom: 2,
    },

    formSection: {
      paddingHorizontal: 16,
      marginTop: 16,
      gap: 18,
    },
    fieldGroup: {
      gap: 5,
    },
    fieldLabelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    fieldLabel: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.9,
    },
    fieldRequired: {
      fontSize: 11,
      color: colors.danger,
      fontWeight: '700',
    },
    fieldHint: {
      fontSize: 12,
      color: colors.textMuted,
      marginTop: 1,
    },
    input: {
      backgroundColor: colors.inputBg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: colors.text,
    },
    inputFocused: {
      borderColor: colors.accent,
      borderWidth: 1.5,
    },
    inputError: {
      borderColor: colors.danger,
      borderWidth: 1.5,
    },
    textArea: {
      height: 110,
      textAlignVertical: 'top',
      paddingTop: 12,
    },
    fieldFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
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

    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginVertical: 2,
    },

    infoBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      backgroundColor: colors.surfaceElevated,
      borderRadius: 10,
      padding: 14,
      marginHorizontal: 16,
      marginTop: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },
    infoBoxBar: {
      width: 3,
      borderRadius: 2,
      backgroundColor: colors.accent,
      alignSelf: 'stretch',
      minHeight: 36,
    },
    infoBoxText: {
      flex: 1,
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 18,
    },
  });