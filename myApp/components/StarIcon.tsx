import React from 'react';
import { View, StyleSheet } from 'react-native';

// Four-pointed star icon with dark fill and light outline
export default function StarIcon({ size = 100 }: { size?: number }) {
  const pointSize = size * 0.35;
  const centerSize = size * 0.3;
  const outlineWidth = 2;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Center square */}
      <View style={[styles.centerSquare, { 
        width: centerSize, 
        height: centerSize,
        backgroundColor: '#2a2a2a',
      }]} />
      
      {/* Top point */}
      <View style={[styles.point, styles.topPoint, { 
        width: 0,
        height: 0,
        borderLeftWidth: pointSize / 2,
        borderRightWidth: pointSize / 2,
        borderBottomWidth: pointSize,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#2a2a2a',
      }]} />
      
      {/* Bottom point */}
      <View style={[styles.point, styles.bottomPoint, { 
        width: 0,
        height: 0,
        borderLeftWidth: pointSize / 2,
        borderRightWidth: pointSize / 2,
        borderTopWidth: pointSize,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#2a2a2a',
      }]} />
      
      {/* Left point */}
      <View style={[styles.point, styles.leftPoint, { 
        width: 0,
        height: 0,
        borderTopWidth: pointSize / 2,
        borderBottomWidth: pointSize / 2,
        borderRightWidth: pointSize,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#2a2a2a',
      }]} />
      
      {/* Right point */}
      <View style={[styles.point, styles.rightPoint, { 
        width: 0,
        height: 0,
        borderTopWidth: pointSize / 2,
        borderBottomWidth: pointSize / 2,
        borderLeftWidth: pointSize,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#2a2a2a',
      }]} />
      
      {/* Outline - Top */}
      <View style={[styles.outline, styles.outlineTop, { 
        width: 0,
        height: 0,
        borderLeftWidth: pointSize / 2 + outlineWidth,
        borderRightWidth: pointSize / 2 + outlineWidth,
        borderBottomWidth: pointSize + outlineWidth,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#e0e0e0',
      }]} />
      
      {/* Outline - Bottom */}
      <View style={[styles.outline, styles.outlineBottom, { 
        width: 0,
        height: 0,
        borderLeftWidth: pointSize / 2 + outlineWidth,
        borderRightWidth: pointSize / 2 + outlineWidth,
        borderTopWidth: pointSize + outlineWidth,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#e0e0e0',
      }]} />
      
      {/* Outline - Left */}
      <View style={[styles.outline, styles.outlineLeft, { 
        width: 0,
        height: 0,
        borderTopWidth: pointSize / 2 + outlineWidth,
        borderBottomWidth: pointSize / 2 + outlineWidth,
        borderRightWidth: pointSize + outlineWidth,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#e0e0e0',
      }]} />
      
      {/* Outline - Right */}
      <View style={[styles.outline, styles.outlineRight, { 
        width: 0,
        height: 0,
        borderTopWidth: pointSize / 2 + outlineWidth,
        borderBottomWidth: pointSize / 2 + outlineWidth,
        borderLeftWidth: pointSize + outlineWidth,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#e0e0e0',
      }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSquare: {
    position: 'absolute',
    zIndex: 2,
  },
  point: {
    position: 'absolute',
    zIndex: 1,
  },
  topPoint: {
    top: 0,
  },
  bottomPoint: {
    bottom: 0,
  },
  leftPoint: {
    left: 0,
  },
  rightPoint: {
    right: 0,
  },
  outline: {
    position: 'absolute',
    zIndex: 0,
  },
  outlineTop: {
    top: -2,
  },
  outlineBottom: {
    bottom: -2,
  },
  outlineLeft: {
    left: -2,
  },
  outlineRight: {
    right: -2,
  },
});

