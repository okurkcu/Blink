import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PageIndicatorProps {
  totalPages: number;
  currentPage: number;
}

export default function PageIndicator({ totalPages, currentPage }: PageIndicatorProps) {
  return (
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
  );
}

const styles = StyleSheet.create({
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

