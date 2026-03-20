import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { usePermissions } from './src/hooks/usePermissions';

const AppContent = () => {
  const { colors, isDark } = useTheme();
  const { loading } = usePermissions();

  if (loading) {
    return (
      <View style={[styles.splash, { backgroundColor: colors.background }]}>
        <Text style={styles.splashEmoji}>🗺️</Text>
        <Text style={[styles.splashTitle, { color: colors.text }]}>Travel Diary</Text>
        <Text style={[styles.splashSub, { color: colors.textSecondary }]}>
          Your personal journey journal
        </Text>
        <ActivityIndicator
          size="small"
          color={colors.accent}
          style={styles.splashSpinner}
        />
        <Text style={[styles.splashNote, { color: colors.textMuted }]}>
          Requesting permissions…
        </Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  splashEmoji: {
    fontSize: 58,
    marginBottom: 16,
  },
  splashTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  splashSub: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  splashSpinner: {
    marginTop: 36,
  },
  splashNote: {
    fontSize: 12,
    marginTop: 10,
  },
});