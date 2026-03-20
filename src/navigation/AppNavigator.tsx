import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AddEntryScreen from '../screens/AddEntryScreen/AddEntryScreen';
import EditEntryScreen from '../screens/EditEntryScreen/EditEntryScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createStackNavigator<RootStackParamList>();
const ONBOARDING_KEY = '@lakbay_onboarding_done';

const AppNavigator = () => {
  const { colors } = useTheme();
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);

//   useEffect(() => {
//   AsyncStorage.getItem(ONBOARDING_KEY)
//     .then((value) => setOnboardingDone(value === 'true'))
//     .catch(() => setOnboardingDone(true));
// }, []);

  useEffect(() => {
  AsyncStorage.removeItem(ONBOARDING_KEY).then(() =>
    setOnboardingDone(false)
  );
}, []);

  const handleOnboardingFinish = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    } catch {}
    setOnboardingDone(true);
  };

  // Still reading from AsyncStorage — show a plain spinner
  if (onboardingDone === null) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  // First launch — render onboarding outside the stack so no nav header can interfere
  if (!onboardingDone) {
    return <OnboardingScreen onFinish={handleOnboardingFinish} />;
  }

  // Normal app flow — identical to your original navigator
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddEntry" component={AddEntryScreen} />
      <Stack.Screen name="EditEntry" component={EditEntryScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;