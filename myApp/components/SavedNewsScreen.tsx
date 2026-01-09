import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Animated, Dimensions, PanResponder, Image } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import BookmarkIcon from './BookmarkIcon';
import CategorySelector from './CategorySelector';
import NewsDetailScreen from './NewsDetailScreen';
import PageIndicator from './PageIndicator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SavedNewsItem {
  id: string;
  headline: string;
  category: string;
  snippet: string;
  timestamp: string;
  savedDate: string;
}

const mockSavedNewsData: SavedNewsItem[] = [
  {
    id: 'saved-1',
    headline: 'Louvre Museum Got Robbed',
    category: 'Global',
    snippet: 'On 19 October 2025, thieves disguised as construction workers stole eight pieces of the French Crown Jewels valued at approximately €88 million from the Galeria d\'Apollon...',
    timestamp: 'Tue, 02.34',
    savedDate: 'Saved 2 days ago',
  },
  {
    id: 'saved-2',
    headline: 'Fall of Curry\'s UA Partnership',
    category: 'Sports',
    snippet: 'Stephen Curry and Under Armour made their breakup official on Nov. 13, announcing that a decade-plus partnership had ended. Fans of the Golden State Warriors superstar...',
    timestamp: 'Tue, 00.12',
    savedDate: 'Saved 3 days ago',
  },
  {
    id: 'saved-3',
    headline: 'Tech Giants Announce New AI Initiative',
    category: 'Science & Tech',
    snippet: 'Major technology companies have joined forces to launch a groundbreaking artificial intelligence initiative aimed at advancing research and development...',
    timestamp: 'Mon, 21.45',
    savedDate: 'Saved 5 days ago',
  },
  {
    id: 'saved-4',
    headline: 'Climate Summit Reaches Historic Agreement',
    category: 'Global',
    snippet: 'World leaders have reached a historic agreement on climate action, committing to ambitious targets for reducing carbon emissions over the next decade...',
    timestamp: 'Mon, 20.30',
    savedDate: 'Saved 1 week ago',
  },
  {
    id: 'saved-5',
    headline: 'New Breakthrough in Medical Research',
    category: 'Science & Tech',
    snippet: 'Scientists have announced a major breakthrough in medical research that could revolutionize treatment for chronic diseases, offering new hope to millions...',
    timestamp: 'Mon, 19.15',
    savedDate: 'Saved 1 week ago',
  },
  {
    id: 'saved-6',
    headline: 'Revolutionary Space Mission Launched',
    category: 'Science & Tech',
    snippet: 'A groundbreaking space mission has been launched to explore the outer reaches of our solar system, marking a new era in space exploration and scientific discovery...',
    timestamp: 'Sun, 18.00',
    savedDate: 'Saved 2 weeks ago',
  },
  {
    id: 'saved-7',
    headline: 'Global Economic Forum Concludes',
    category: 'Business',
    snippet: 'World leaders and business executives gathered for the annual economic forum, discussing strategies for sustainable growth and international cooperation...',
    timestamp: 'Sun, 16.30',
    savedDate: 'Saved 2 weeks ago',
  },
  {
    id: 'saved-8',
    headline: 'Major Sports League Announces Expansion',
    category: 'Sports',
    snippet: 'In a historic move, one of the world\'s premier sports leagues has announced plans for significant expansion, bringing the sport to new markets and audiences...',
    timestamp: 'Sat, 15.00',
    savedDate: 'Saved 3 weeks ago',
  },
  {
    id: 'saved-9',
    headline: 'Political Debate Draws Record Viewers',
    category: 'Politics',
    snippet: 'The latest political debate shattered viewership records, with millions tuning in to watch candidates discuss key issues facing the nation...',
    timestamp: 'Fri, 14.00',
    savedDate: 'Saved 3 weeks ago',
  },
  {
    id: 'saved-10',
    headline: 'New Health Study Released',
    category: 'Health',
    snippet: 'Researchers have published a comprehensive health study revealing important insights into disease prevention and wellness practices...',
    timestamp: 'Fri, 13.00',
    savedDate: 'Saved 1 month ago',
  },
];

const categories = ['All', 'Global', 'Sports', 'Politics', 'Entertainment', 'Science & Tech', 'Business', 'Health'];

interface SavedNewsScreenProps {
  onBack: () => void;
  onSlideAnimReady?: (slideAnim: Animated.Value) => void;
}

export default function SavedNewsScreen({ onBack, onSlideAnimReady }: SavedNewsScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_700Bold,
  });

  const [selectedNews, setSelectedNews] = useState<SavedNewsItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(
    new Set(mockSavedNewsData.map(item => item.id))
  );

  const slideAnim = useRef(new Animated.Value(0)).current;
  const newsDetailSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  
  // Expose slideAnim to parent component so it can reset it after animation
  React.useEffect(() => {
    if (onSlideAnimReady) {
      onSlideAnimReady(slideAnim);
    }
  }, [onSlideAnimReady, slideAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only capture if swiping right and movement is more horizontal than vertical
        return gestureState.dx > 8 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        // We can add feedback here if needed
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          // Swiping right - go back to main screen
          const translateX = Math.min(gestureState.dx, SCREEN_WIDTH);
          slideAnim.setValue(translateX);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 100 || gestureState.vx > 0.5) {
          // Swipe right completed - go back
          // Don't reset slideAnim immediately - keep it at swipe position
          // MainScreen will handle the animation and reset slideAnim after completion
          onBack();
        } else {
          // Swipe not far enough - snap back
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
            speed: 12,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const handleNewsPress = (newsItem: SavedNewsItem) => {
    setSelectedNews(newsItem);
    // Animate news detail screen sliding in from right
    Animated.timing(newsDetailSlideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBack = () => {
    // Animate news detail screen sliding out to right
    Animated.timing(newsDetailSlideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedNews(null);
    });
  };

  const handleBookmarkPress = (itemId: string) => {
    setBookmarkedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const categoryIcons: { [key: string]: any } = {
    'Global': require('../assets/category-icons/World.png'),
    'Breaking News': require('../assets/category-icons/BreakingNews.png'),
    'Sports': require('../assets/category-icons/Sports.png'),
    'Business': require('../assets/category-icons/Business.png'),
    'Entertainment': require('../assets/category-icons/Entertainment.png'),
    'Technology': require('../assets/category-icons/Technology.png'),
    'Science & Tech': require('../assets/category-icons/Technology.png'),
    'Politics': require('../assets/category-icons/BreakingNews.png'),
    'Health': require('../assets/category-icons/BreakingNews.png'),
    'All': require('../assets/category-icons/World.png'),
    'default': require('../assets/category-icons/World.png'),
  };

  const renderCategoryIcon = (category?: string) => {
    const src = (category && categoryIcons[category]) ? categoryIcons[category] : categoryIcons['default'];
    return <Image source={src} style={styles.categoryIconImage} resizeMode="contain" />;
  };

  // Filter news based on selected category
  const filteredNews = selectedCategory === 'All' 
    ? mockSavedNewsData 
    : mockSavedNewsData.filter(item => item.category === selectedCategory);

  // Show loading state while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/icons/adaptive-icon.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>Saved</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
        <ScrollView style={styles.scrollView}>
          {mockSavedNewsData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.newsItem}>
              <View style={styles.newsItemContent}>
                <Text style={styles.headline}>{item.headline}</Text>
                <View style={styles.categoryRow}>
                  {renderCategoryIcon(item.category)}
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
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/icons/adaptive-icon.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>Saved</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Category Selector */}
      <CategorySelector 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Saved News List - PanResponder attached here to allow category scrolling */}
      <View style={styles.scrollViewWrapper} {...panResponder.panHandlers}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredNews.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📚</Text>
            <Text style={styles.emptyStateTitle}>No Saved Articles</Text>
            <Text style={styles.emptyStateText}>
              {selectedCategory === 'All' 
                ? 'Articles you bookmark will appear here'
                : `No saved articles in ${selectedCategory}`}
            </Text>
          </View>
        ) : (
          filteredNews.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity 
                style={styles.newsItem} 
                onPress={() => handleNewsPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.newsItemContent}>
                  <View style={styles.headlineRow}>
                    <Text style={styles.headline} numberOfLines={2}>{item.headline}</Text>
                    <TouchableOpacity
                      style={styles.bookmarkButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleBookmarkPress(item.id);
                      }}
                      activeOpacity={0.7}
                    >
                      <BookmarkIcon size={18} filled={bookmarkedItems.has(item.id)} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.metadataRow}>
                    <View style={styles.categoryRow}>
                      {renderCategoryIcon(item.category)}
                      <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                    <Text style={styles.savedDate}>{item.savedDate}</Text>
                  </View>
                  <Text style={styles.snippet} numberOfLines={3}>{item.snippet}</Text>
                  <View style={styles.timestampRow}>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {index < filteredNews.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))
        )}
      </ScrollView>
      </View>
      {/* PageIndicator is rendered by MainScreen (fixed and independent) */}

      {/* News Detail Screen (slides in from right when news is selected) */}
      {selectedNews && (
        <Animated.View
          style={[
            styles.newsDetailContainer,
            {
              transform: [{ translateX: newsDetailSlideAnim }],
            },
          ]}
        >
          <NewsDetailScreen newsItem={selectedNews} onBack={handleBack} />
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImage: {
    width: 55,
    height: 55,
    margin: -13,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 30,
  },
  placeholder: {
    width: 40,
  },
  scrollViewWrapper: {
    flex: 1,
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
    paddingBottom: 0,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
    textAlign: 'center',
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
  bookmarkButton: {
    padding: 4,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  categoryIconImage: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#808080',
    lineHeight: 12,
  },
  savedDate: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#C0C0C0',
    lineHeight: 12,
  },
  snippet: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
    lineHeight: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  timestampRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  timestamp: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    color: '#C0C0C0',
    lineHeight: 25,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  newsDetailContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#faf9f6',
    zIndex: 10,
  },
});

