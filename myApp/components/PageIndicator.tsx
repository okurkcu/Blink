import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PageIndicatorProps {
  totalPages: number;
  currentPage?: number;
  // progress: 0..1 where 0 = first page active, 1 = last page active
  progress?: Animated.AnimatedInterpolation<number> | Animated.Value;
}

export default function PageIndicator({ totalPages, currentPage = 0, progress }: PageIndicatorProps) {
  const animValuesRef = useRef<Animated.Value[]>([]);

  // Initialize animated values for fallback when no progress prop provided
  if (animValuesRef.current.length !== totalPages) {
    animValuesRef.current = Array.from({ length: totalPages }).map((_, i) => new Animated.Value(i === currentPage ? 1 : 0));
  }

  useEffect(() => {
    if (!progress) {
      // animate values when currentPage changes (fallback)
      animValuesRef.current.forEach((v, i) => {
        Animated.timing(v, {
          toValue: i === currentPage ? 1 : 0,
          duration: 260,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [currentPage, progress]);

  // Helper to get an interpolation for an index
  const getActiveValue = (index: number) => {
    if (progress) {
      // For two pages we map progress directly; for more pages, center the active near progress*(n-1)
      if (totalPages === 2) {
        return index === 0
          ? (progress as Animated.AnimatedInterpolation<number>).interpolate({ inputRange: [0, 1], outputRange: [1, 0], extrapolate: 'clamp' })
          : (progress as Animated.AnimatedInterpolation<number>).interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' });
      }

      const pos = (progress as Animated.AnimatedInterpolation<number>).interpolate({ inputRange: [0, 1], outputRange: [0, (totalPages - 1)], extrapolate: 'clamp' });
      // active strength is 1 - distance, clamped
      return pos.interpolate({ inputRange: [index - 1, index, index + 1], outputRange: [0, 1, 0], extrapolate: 'clamp' });
    }

    return animValuesRef.current[index];
  };

  return (
    <LinearGradient
      colors={['rgba(250, 249, 246, 0.95)', 'rgba(250, 249, 246, 0)']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <View style={styles.container}>
        {Array.from({ length: totalPages }).map((_, index) => {
          const active = getActiveValue(index) as Animated.AnimatedInterpolation<number>;
          const scaleX = active.interpolate({
            inputRange: [0, 1],
            outputRange: [0.25, 1],
            extrapolate: 'clamp',
          });
          const backgroundColor = active.interpolate({ inputRange: [0, 1], outputRange: ['#C0C0C0', '#000000'] });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: 24,
                  height: 4,
                  borderRadius: 2,
                  backgroundColor,
                  transform: [{ scaleX }],
                },
              ]}
            />
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    width: '100%',
    paddingTop: 40,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  dot: {
    borderRadius: 2,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 4,
    backgroundColor: '#000000',
  },
  inactiveDot: {
    width: 4,
    height: 4,
    backgroundColor: '#C0C0C0',
  },
});

