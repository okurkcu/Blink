import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import BackIcon from './BackIcon';

interface TenthOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function TenthOnboardingScreen({ onNext, onBack }: TenthOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
  });

  const handleAllow = () => {
    onNext?.();
  };

  const handleDontAllow = () => {
    onNext?.();
  };

  const renderContent = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon size={15} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enable Notifications</Text>

        <View style={styles.popupWrapper}>
          
          {/* Part 1: The Text Container */}
          <View style={styles.textContainer}>
            <Text style={styles.popupText}>
              Blink would like to send you notifications
            </Text>
          </View>

          {/* Part 2: The Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.dontAllowButton} onPress={handleDontAllow}>
              <Text style={styles.dontAllowText}>Dont Allow</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.allowButton} onPress={handleAllow}>
              <Text style={styles.allowText}>Allow</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </>
  );

  if (!fontsLoaded) {
    return <View style={styles.container}>{renderContent()}</View>;
  }

  return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
  },
  header: {
    paddingTop: 80,
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
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 0,
  },
  popupWrapper: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'transparent', 
  },
  textContainer: {
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 24,
    marginBottom: 3, // <--- The tiny gap added here
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupText: {
    fontSize: 17,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 3,
  },
  dontAllowButton: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 0,     
    borderTopRightRadius: 0,    
    borderBottomRightRadius: 0, 
    borderBottomLeftRadius: 16, 
  },
  dontAllowText: {
    fontSize: 15,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '600',
    color: '#000000',
  },
  allowButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 0,      
    borderTopRightRadius: 0,     
    borderBottomLeftRadius: 0,   
    borderBottomRightRadius: 16, 
  },
  allowText: {
    fontSize: 15,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});