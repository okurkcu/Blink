import React from 'react';
import { View, StyleSheet } from 'react-native';
import StarIcon from './StarIcon';

export default function StarIconScreen() {
  return (
    <View style={styles.container}>
      <StarIcon size={120} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


