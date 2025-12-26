import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, PanResponder, Animated, Dimensions } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import ClockIcon from './ClockIcon';
import NewsDetailScreen from './NewsDetailScreen';
import FourthOnboardingScreen from './FourthOnboardingScreen';
import FifthOnboardingScreen from './FifthOnboardingScreen';
import SettingsScreen from './SettingsScreen';
import SavedNewsScreen from './SavedNewsScreen';
import PageIndicator from './PageIndicator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface NewsItem {
  id: string;
  headline: string;
  category: string;
  snippet: string;
  timestamp: string;
}

const mockNewsData: NewsItem[] = [
  {
    id: '1',
    headline: 'Louvre Museum Got Robbed',
    category: 'Global',
    snippet: 'On 19 October 2025, thieves disguised as construction workers stole eight pieces of the French Crown Jewels valued at approximately €88 million from the Galeria d\'Apollon...',
    timestamp: 'Tue, 02.34',
  },
  {
    id: '2',
    headline: 'Fall of Curry\'s UA Partnership',
    category: 'Global',
    snippet: 'Stephen Curry and Under Armour made their breakup official on Nov. 13, announcing that a decade-plus partnership had ended. Fans of the Golden State Warriors superstar...',
    timestamp: 'Tue, 00.12',
  },
  {
    id: '3',
    headline: 'Trump wants to release Diddy',
    category: 'Global',
    snippet: 'Former President Donald Trump has granted a pardon to Sean \'Diddy\' Combs, clearing his legal record and sparking widespread public debate. The decision quickly drew...',
    timestamp: 'Mon, 23.05',
  },
  {
    id: '4',
    headline: 'Bla Bla Bla',
    category: 'Global',
    snippet: 'Authorities have launched an investigation into a reported sexual assault involving Ozan and Arınç. According to officials, the incident was brought to light after...',
    timestamp: 'Tue, 03.10',
  },
  {
    id: '5',
    headline: '"Yes King" dies at 52',
    category: 'Global',
    snippet: 'On 19 October 2025, thieves disguised as construction workers stole eight pieces of the French Crown Jewels valued at approximately €88 million from the Galeria d\'Apollon...',
    timestamp: 'Mon, 22.00',
  },
  {
    id: '6',
    headline: 'Tech Giants Announce New AI Initiative',
    category: 'Science & Tech',
    snippet: 'Major technology companies have joined forces to launch a groundbreaking artificial intelligence initiative aimed at advancing research and development...',
    timestamp: 'Mon, 21.45',
  },
  {
    id: '7',
    headline: 'Climate Summit Reaches Historic Agreement',
    category: 'Global',
    snippet: 'World leaders have reached a historic agreement on climate action, committing to ambitious targets for reducing carbon emissions over the next decade...',
    timestamp: 'Mon, 20.30',
  },
  {
    id: '8',
    headline: 'New Breakthrough in Medical Research',
    category: 'Science & Tech',
    snippet: 'Scientists have announced a major breakthrough in medical research that could revolutionize treatment for chronic diseases, offering new hope to millions...',
    timestamp: 'Mon, 19.15',
  },
];

interface MainScreenProps {
  onReset?: () => void;
}

export default function MainScreen({ onReset }: MainScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSavedNews, setShowSavedNews] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const savedNewsSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  const handleNewsPress = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
  };

  const handleBack = () => {
    setSelectedNews(null);
  };

  const handleClockPress = () => {
    setShowStartTime(true);
  };

  const handleStartTimeNext = () => {
    setShowStartTime(false);
    setShowEndTime(true);
  };

  const handleStartTimeBack = () => {
    setShowStartTime(false);
  };

  const handleEndTimeNext = () => {
    setShowEndTime(false);
  };

  const handleEndTimeBack = () => {
    setShowEndTime(false);
    setShowStartTime(true);
  };

  const handleSettingsBack = () => {
    setShowSettings(false);
  };

  const handleAvatarPress = () => {
    setShowSettings(true);
  };

  const handleSavedNewsBack = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(savedNewsSlideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowSavedNews(false);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only capture if swiping left and movement is more horizontal than vertical
        return gestureState.dx < -8 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        // We can add feedback here if needed
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0 && !showSavedNews) {
          // Swiping left - show saved news screen
          const translateX = Math.max(gestureState.dx, -SCREEN_WIDTH);
          slideAnim.setValue(translateX);
          savedNewsSlideAnim.setValue(SCREEN_WIDTH + translateX);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100 || gestureState.vx < -0.5) {
          // Swipe left completed - show saved news
          setShowSavedNews(true);
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: -SCREEN_WIDTH,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(savedNewsSlideAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
        } else {
          // Swipe not far enough - snap back
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 4,
              speed: 12,
            }),
            Animated.spring(savedNewsSlideAnim, {
              toValue: SCREEN_WIDTH,
              useNativeDriver: true,
              bounciness: 4,
              speed: 12,
            }),
          ]).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(savedNewsSlideAnim, {
            toValue: SCREEN_WIDTH,
            useNativeDriver: true,
          }),
        ]).start();
      },
    })
  ).current;

  // Show SettingsScreen if avatar was clicked
  if (showSettings) {
    return <SettingsScreen onBack={handleSettingsBack} />;
  }

  // Note: SavedNewsScreen is shown as an animated overlay, not a separate screen

  // Show NewsDetailScreen if a news item is selected
  if (selectedNews) {
    return <NewsDetailScreen newsItem={selectedNews} onBack={handleBack} />;
  }

  // Show End Time screen if clock was clicked and start time was completed
  if (showEndTime) {
    return <FifthOnboardingScreen onNext={handleEndTimeNext} onBack={handleEndTimeBack} />;
  }

  // Show Start Time screen if clock was clicked
  if (showStartTime) {
    return <FourthOnboardingScreen onNext={handleStartTimeNext} onBack={handleStartTimeBack} />;
  }

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClockPress} activeOpacity={0.7}>
            <ClockIcon size={24} />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, color: '#000000', fontWeight: 'bold' }}>Blink</Text>
          <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.7}>
            <View style={styles.avatarPlaceholder} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {mockNewsData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.newsItem} onPress={() => handleNewsPress(item)}>
              <View style={styles.newsItemContent}>
                <Text style={styles.headline}>{item.headline}</Text>
                <View style={styles.categoryRow}>
                  <Text style={styles.categoryIcon}>📄</Text>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <Text style={styles.snippet}>{item.snippet}</Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {/* Main Screen */}
      <Animated.View
        style={[
          styles.screenContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClockPress} activeOpacity={0.7}>
            <ClockIcon size={24} />
          </TouchableOpacity>
          <Text style={styles.appTitle}>Blink</Text>
          <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.7}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar} />
            </View>
          </TouchableOpacity>
        </View>

        {/* News List */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Temporary Dev Button */}
          <TouchableOpacity
            style={{ padding: 10, alignItems: 'center', marginBottom: 10 }}
            onPress={onReset}
          >
            <Text style={{ color: 'red', fontFamily: 'Inter_700Bold' }}>[DEV] Back to Onboarding</Text>
          </TouchableOpacity>

          {mockNewsData.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity 
                style={styles.newsItem} 
                onPress={() => handleNewsPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.newsItemContent}>
                  <View style={styles.headlineRow}>
                    <Text style={styles.headline} numberOfLines={2}>{item.headline}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                  </View>
                  <View style={styles.categoryRow}>
                    <Text style={styles.categoryIcon}>📄</Text>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text style={styles.snippet} numberOfLines={3}>{item.snippet}</Text>
                </View>
              </TouchableOpacity>
              {index < mockNewsData.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}
        </ScrollView>
        {/* Page Indicator - Fixed at bottom */}
        <View style={styles.indicatorContainer}>
          <PageIndicator totalPages={2} currentPage={0} />
        </View>
      </Animated.View>

      {/* Saved News Screen (hidden behind, slides in on swipe) */}
      <Animated.View
        style={[
          styles.savedNewsContainer,
          {
            transform: [{ translateX: savedNewsSlideAnim }],
          },
        ]}
      >
        <SavedNewsScreen onBack={handleSavedNewsBack} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
    overflow: 'hidden',
  },
  screenContainer: {
    flex: 1,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#faf9f6',
    justifyContent: 'space-between',
  },
  savedNewsContainer: {
    flex: 1,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#faf9f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  appTitle: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 22,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d9d9d9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingBottom: 20,
  },
  newsItem: {
    paddingVertical: 16,
  },
  newsItemContent: {
    width: '100%',
  },
  headlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headline: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    lineHeight: 25,
    flex: 1,
    marginRight: 12,
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#C0C0C0', // silver color
    lineHeight: 25,
    textAlign: 'right',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
    lineHeight: 12,
  },
  snippet: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 12,
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
});

