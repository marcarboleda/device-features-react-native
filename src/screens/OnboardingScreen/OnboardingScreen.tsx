import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    icon: 'map' as const,
    title: 'Welcome to\nLakbay Co.',
    body: 'Your personal travel journal. Capture every destination, memory, and moment — all in one place.',
    accent: true,
  },
  {
    id: '2',
    icon: 'camera' as const,
    title: 'Capture the\nMoment',
    body: 'Take a photo and your location is automatically tagged. No manual input needed — just snap and go.',
    accent: false,
  },
  {
    id: '3',
    icon: 'compass' as const,
    title: 'Relive Your\nJourney',
    body: 'Browse your entries, search by place or date, and keep every adventure alive in vivid detail.',
    accent: false,
  },
];

interface OnboardingScreenProps {
  onFinish: () => void;
}

const OnboardingScreen = ({ onFinish }: OnboardingScreenProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      const next = activeIndex + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setActiveIndex(next);
    } else {
      onFinish();
    }
  };

  const goToSlide = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setActiveIndex(index);
  };

  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Skip button */}
      {!isLast && (
        <TouchableOpacity style={styles.skipBtn} onPress={onFinish} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.slideScroll}
      >
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            {/* Icon illustration */}
            <View style={[styles.iconWrap, index === 0 && styles.iconWrapAccent]}>
              <View style={styles.iconInner}>
                <Ionicons
                  name={slide.icon}
                  size={56}
                  color={index === 0 ? '#FFFFFF' : colors.accent}
                />
              </View>
            </View>

            {/* Text */}
            <Text style={styles.slideTitle}>{slide.title}</Text>
            <Text style={styles.slideBody}>{slide.body}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom area: dots + button */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
              onPress={() => goToSlide(i)}
              activeOpacity={0.7}
            />
          ))}
        </View>

        {/* CTA button */}
        <TouchableOpacity
          style={[styles.ctaBtn, isLast && styles.ctaBtnLast]}
          onPress={goToNext}
          activeOpacity={0.85}
        >
          {isLast ? (
            <>
              <Ionicons name="map" size={18} color="#FFFFFF" />
              <Text style={styles.ctaBtnText}>Start Exploring</Text>
            </>
          ) : (
            <>
              <Text style={styles.ctaBtnText}>Next</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    skipBtn: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 58 : 42,
      right: 24,
      zIndex: 10,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    skipText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMuted,
    },
    slideScroll: {
      flex: 1,
    },
    slide: {
      width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      paddingTop: Platform.OS === 'ios' ? 100 : 80,
      paddingBottom: 40,
    },
    iconWrap: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: colors.accentDim,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 48,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 6,
    },
    iconWrapAccent: {
      backgroundColor: colors.accent,
      shadowOpacity: 0.35,
    },
    iconInner: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    slideTitle: {
      fontSize: 36,
      fontWeight: '900',
      color: colors.text,
      textAlign: 'center',
      letterSpacing: -1,
      lineHeight: 42,
      marginBottom: 18,
    },
    slideBody: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 25,
      fontWeight: '400',
    },
    bottom: {
      paddingHorizontal: 28,
      paddingBottom: Platform.OS === 'ios' ? 52 : 36,
      alignItems: 'center',
      gap: 28,
    },
    dots: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.border,
    },
    dotActive: {
      width: 24,
      backgroundColor: colors.accent,
    },
    ctaBtn: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: colors.accent,
      paddingVertical: 17,
      borderRadius: 50,
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
      elevation: 6,
    },
    ctaBtnLast: {
      shadowOpacity: 0.45,
    },
    ctaBtnText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: 0.1,
    },
  });

export default OnboardingScreen;