import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PageIndicatorProps {
  totalPages: number;
  currentPage: number;
}

export default function PageIndicator({ totalPages, currentPage }: PageIndicatorProps) {
  return (
    <LinearGradient
      colors={['rgba(250, 249, 246, 0.95)', 'rgba(250, 249, 246, 0)']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <View style={styles.container}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentPage ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
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

