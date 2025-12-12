import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import BackIcon from './BackIcon';

interface TwelfthOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
  paymentStatus?: string; // Can be "No Payments Due Now" or any other status
}

export default function TwelfthOnboardingScreen({ 
  onNext, 
  onBack, 
  paymentStatus = "No Payments Due Now" 
}: TwelfthOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_600SemiBold,
  });

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <BackIcon size={15} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Unlock headlines that respect your time.</Text>
          <Image 
            source={require('../assets/images/onb12.png')} 
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.paymentStatusContainer}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text style={styles.paymentStatus}>{paymentStatus}</Text>
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={onNext}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
          <Text style={styles.priceText}>Just $35,88 per year ($2,99/Mo)</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon size={15} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Unlock headlines that respect your time.</Text>

        {/* Image */}
        <Image 
          source={require('../assets/images/onb12.png')} 
          style={styles.image}
          resizeMode="contain"
        />

        {/* Payment Status */}
        <View style={styles.paymentStatusContainer}>
          <Text style={styles.checkIcon}>✓</Text>
          <Text style={styles.paymentStatus}>{paymentStatus}</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        {/* Price Text */}
        <Text style={styles.priceText}>Just $35,88 per year ($2,99/Mo)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.4)',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 24,
    textAlign: 'justify',
  },
  image: {
    width: '85%',
    flex: 1,
    alignSelf: 'center',
    marginBottom: 20,
  },
  paymentStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginRight: 8,
  },
  paymentStatus: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  continueText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 21,
    letterSpacing: -0.31,
  },
  priceText: {
    fontSize: 12,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    color: '#666666',
    textAlign: 'center',
  },
});
