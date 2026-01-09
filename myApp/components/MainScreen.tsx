import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, PanResponder, Animated, Dimensions, Image } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import CategorySelector from './CategorySelector';
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
    headline: 'Daring Heist at Louvre Museum Sees Priceless Crown Jewels Stolen',
    category: 'World',
    snippet: 'In a brazen daytime raid on October 19, masked thieves executed one of the most audacious museum thefts in recent history by stealing eight priceless pieces from the French crown jewels collection at the Louvre Museum in Paris. Despite the robbery taking less than eight minutes, investigators say the sophistication of the operation — including disguises, specialized tools and a swift getaway on motorbikes — suggests a highly organized criminal operation.\n\nFrench authorities have launched an extensive investigation and multiple suspects have been detained, but the precious jewels, estimated to be worth tens of millions of euros, remain unaccounted for. The theft has reignited global debates over cultural heritage security and prompted increased protections at major museums worldwide. :contentReference[oaicite:0]{index=0}',
    timestamp: 'Dec 1, 2025',
  },
  {
    id: '2',
    headline: 'Under Armour and Stephen Curry End Decade-Long Partnership',
    category: 'Sports',
    snippet: 'Stephen Curry and athletic apparel giant Under Armour announced that they will part ways, ending a partnership that began in 2013 and redefined athlete branding in basketball. Curry Brand will operate independently after the release of its final collaborative shoe model in early 2026, signaling a significant shift in the basketball footwear market.\n\nUnder Armour said the decision was part of a strategic restructure aimed at reinforcing its core brand focus amid challenging market conditions. Curry expressed gratitude for the relationship while looking forward to future opportunities, potentially including new collaborations and expanded roles within sports business and lifestyle sectors. :contentReference[oaicite:1]{index=1}',
    timestamp: 'Nov 15, 2025',
  },
  {
    id: '3',
    headline: 'G20 Summit in Johannesburg Focuses on Global Economic Inequality',
    category: 'World',
    snippet: 'Leaders from the world’s largest economies convened in Johannesburg for the 2025 G20 Summit, marking the first time the group met on African soil. Discussions centered on global economic inequality, climate financing and the need for coordinated action to support developing nations.\n\nThe summit yielded several joint commitments on sustainable development goals and tax reforms for multinational corporations, though disagreements over trade policies persisted. Analysts say the outcomes could shape global economic strategies for years to come. :contentReference[oaicite:2]{index=2}',
    timestamp: 'Nov 25, 2025',
  },
  {
    id: '4',
    headline: 'Italian General Strikes Highlight Deepening Public Frustration Over Foreign Policy',
    category: 'Breaking News',
    snippet: 'Massive demonstrations and general strikes broke out across Italy as citizens protested government policies related to the conflict in Gaza and alleged complicity in arms shipments. Tens of thousands marched in Rome, Milan and other major cities, disrupting transportation, schools and public services.\n\nThe strikes, organized by labor unions and grassroots movements, mark one of the largest waves of civil unrest in Italy this year. Protest leaders are calling for a shift in diplomatic priorities and greater humanitarian engagement, while government officials have appealed for calm and promised future dialogue. :contentReference[oaicite:3]{index=3}',
    timestamp: 'Dec 3, 2025',
  },
  {
    id: '5',
    headline: 'APEC 2025 Concludes With Focus on Sustainable Economic Growth in Asia-Pacific',
    category: 'World',
    snippet: 'The Asia-Pacific Economic Cooperation (APEC) summit concluded in Gyeongju, South Korea, after leaders from across the region reaffirmed commitments to sustainable economic growth, digital innovation and climate resilience. Key initiatives included infrastructure investments with environmental safeguards and tech cooperation frameworks.\n\nLeaders emphasized inclusive growth that benefits all member economies, especially in the face of global supply chain disruptions and regional tensions. Observers hailed the summit as a crucial step toward deeper economic integration in the Asia-Pacific. :contentReference[oaicite:4]{index=4}',
    timestamp: 'Nov 1, 2025',
  },
  {
    id: '6',
    headline: 'Flash Flooding Across Central United States Causes Widespread Damage',
    category: 'Breaking News',
    snippet: 'Unusually severe flash flooding triggered by erratic weather patterns battered central and eastern regions of the United States this fall, leaving hundreds of homes damaged and displacing thousands of residents. Meteorologists linked the events to a weakened jet stream that funneled moist air inland, exacerbating rainfall intensity beyond historical norms.\n\nLocal authorities deployed emergency services and federal aid teams to assist in rescue and recovery operations. With climate scientists warning such extremes may become more common, policymakers are under increasing pressure to invest in resilient infrastructure. :contentReference[oaicite:5]{index=5}',
    timestamp: 'Oct 20, 2025',
  },
  {
    id: '7',
    headline: 'World Health Leaders Warn of Escalating Mental Health Crisis',
    category: 'World',
    snippet: 'In a comprehensive report released this year, the World Health Organization reported that over one billion people globally are living with mental health conditions, underscoring a mounting public health challenge. Stress, anxiety and depression are rising across age groups, prompting calls for expanded access to mental health services and stronger community support networks.\n\nHealth advocates stress the importance of integrating mental well-being into primary healthcare systems and bolstering funding for preventive programs worldwide. :contentReference[oaicite:6]{index=6}',
    timestamp: 'Sep 15, 2025',
  },
  {
    id: '8',
    headline: 'Israel-Iran Escalation Raises Global Security Concerns',
    category: 'World',
    snippet: 'Tensions between Israel and Iran escalated dramatically in June, when Israeli forces launched missile strikes on Iranian military and nuclear infrastructure, prompting retaliatory attacks and widespread international alarm. The confrontations, among the most intense in recent years, drew limited external involvement but heightened fears of broader regional conflict.\n\nDiplomats from Europe, the United States and the United Nations have urged de-escalation, emphasizing the need for renewed negotiations and humanitarian safeguards as civilian populations in affected areas face increasing hardship. :contentReference[oaicite:7]{index=7}',
    timestamp: 'Jun 15, 2025',
  },
  {
    id: '9',
    headline: 'Super Bowl LIX Sees Record Viewership and a Thrilling Victory',
    category: 'Sports',
    snippet: 'Super Bowl LIX captivated viewers worldwide as the Philadelphia Eagles secured a decisive victory over the Kansas City Chiefs, with a commanding performance that included strategic plays and standout moments. The game broke multiple viewership records, reflecting the enduring global appeal of America’s premier sporting event.\n\nAnalysts credited the intense competition and dramatic narrative arc for driving engagement across digital platforms and social media, making it one of the most watched championships in recent history. :contentReference[oaicite:8]{index=8}',
    timestamp: 'Feb 12, 2025',
  },
  {
    id: '10',
    headline: 'Record-Setting Heatwaves Sweep Across Europe and Asia This Summer',
    category: 'Breaking News',
    snippet: 'This summer, Europe and parts of Asia experienced unprecedented heatwaves that broke longstanding temperature records and strained public health systems. Cities reported surges in heat-related illnesses, while energy grids struggled to keep up with increased cooling demands.\n\nClimate scientists linked the extreme heat to atmospheric shifts associated with global warming, emphasizing the urgent need for mitigation strategies and adaptation policies. Governments have since pledged enhanced heat-wave response plans and investments in sustainable energy solutions. :contentReference[oaicite:9]{index=9}',
    timestamp: 'Aug 10, 2025',
  },
  {
    id: '11',
    headline: 'Global Markets React to Record Cloud Security Acquisition',
    category: 'Business',
    snippet: 'Tech giant Alphabet announced its intention to acquire cloud security startup Wiz in one of the largest deals of 2025, valued at an estimated $32 billion. The acquisition aims to expand cloud security offerings and accelerate innovation in protecting enterprise environments from evolving cyber threats.\n\nMarket analysts noted that the scale of the deal reflects intensifying competition in the cybersecurity sector, with organizations seeking robust solutions amid rising digital infrastructure vulnerabilities. :contentReference[oaicite:10]{index=10}',
    timestamp: 'Mar 18, 2025',
  },
  {
    id: '12',
    headline: 'Major Metropolitan Transit Strike Disrupts Millions of Commuters',
    category: 'Business',
    snippet: 'A coordinated strike by transit workers in several major global cities halted rail and bus services, affecting millions of daily commuters and prompting urgent negotiations between labor unions and municipal governments. The walkouts, driven by demands for better pay and working conditions, underscored growing tensions between urban workforces and policymakers.\n\nAuthorities warned that prolonged disruptions could dampen economic productivity and urged both sides to seek compromise as delays continued into a second week. ’',
    timestamp: 'Nov 5, 2025',
  },
  {
    id: '13',
    headline: 'Innovative AI Regulation Framework Proposed by Global Coalition',
    category: 'Technology',
    snippet: 'A coalition of nations and tech leaders proposed a comprehensive framework for regulating artificial intelligence technology, aiming to balance innovation with ethical safeguards and safety standards. The proposal includes guidelines for transparency, accountability and cross-border cooperation.\n\nProponents say the initiative could set a global precedent for AI governance, addressing concerns over bias, security and economic displacement while fostering responsible technological advancement. ’',
    timestamp: 'Oct 30, 2025',
  },
  {
    id: '14',
    headline: 'Breakthrough in Renewable Energy Storage Announced by International Scientists',
    category: 'Technology',
    snippet: 'Researchers unveiled a major breakthrough in battery technology that could dramatically improve renewable energy storage capacity, potentially transforming how solar and wind power are integrated into electrical grids. Early tests indicate significantly higher efficiency and longer lifespan than current commercial solutions.\n\nIndustry leaders hailed the development as a key step toward reducing reliance on fossil fuels and accelerating global transitions to cleaner energy sources. ’',
    timestamp: 'Nov 22, 2025',
  },
  {
    id: '15',
    headline: 'Pioneering Space Telescope Detects Unprecedented Cosmic Signals',
    category: 'Technology',
    snippet: 'Astronomers operating a next-generation space telescope announced the detection of unusual cosmic signals that may offer new insights into the early universe’s structure and formation. The findings could challenge existing astrophysical models and open avenues for further exploration.\n\nThe scientific community plans follow-up observations and peer-reviewed studies to better understand the implications of the discovery. ’',
    timestamp: 'Dec 10, 2025',
  }
]


const categories = ['All', 'Breaking News', 'World', 'Sports', 'Business', 'Entertainment', 'Technology'];

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
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const savedNewsSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const newsDetailSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const settingsSlideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

  const handleNewsPress = (newsItem: NewsItem) => {
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
    // Animate settings screen sliding out to right
    Animated.timing(settingsSlideAnim, {
      toValue: SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSettings(false);
    });
  };

  const handleAvatarPress = () => {
    setShowSettings(true);
    // Animate settings screen sliding in from right
    Animated.timing(settingsSlideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const categoryIcons: { [key: string]: any } = {
    'Breaking News': require('../assets/category-icons/BreakingNews.png'),
    'World': require('../assets/category-icons/World.png'),
    'Sports': require('../assets/category-icons/Sports.png'),
    'Business': require('../assets/category-icons/Business.png'),
    'Entertainment': require('../assets/category-icons/Entertainment.png'),
    'Technology': require('../assets/category-icons/Technology.png'),
    'All': require('../assets/category-icons/World.png'),
    'default': require('../assets/category-icons/World.png'),
  };

  const renderCategoryIcon = (category: string) => {
    const src = categoryIcons[category] || categoryIcons['default'];
    return <Image source={src} style={styles.categoryIconImage} resizeMode="contain" />;
  };

  // Filter news based on selected category
  const filteredNews = selectedCategory === 'All' 
    ? mockNewsData 
    : mockNewsData.filter(item => item.category === selectedCategory);

  // Ref to access SavedNewsScreen's slideAnim for reset
  const savedNewsScreenSlideAnimRef = useRef<Animated.Value | null>(null);

  const handleSavedNewsSlideAnimReady = (slideAnim: Animated.Value) => {
    savedNewsScreenSlideAnimRef.current = slideAnim;
  };

  const handleSavedNewsBack = () => {
    // Start animation immediately - don't wait for SavedNewsScreen to reset
    // The wrapper animation will move SavedNewsScreen off-screen regardless of its internal slideAnim
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
      // Reset SavedNewsScreen's internal slideAnim after animation completes
      if (savedNewsScreenSlideAnimRef.current) {
        savedNewsScreenSlideAnimRef.current.setValue(0);
      }
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

  // Note: SavedNewsScreen and SettingsScreen are shown as animated overlays, not separate screens

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
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/icons/adaptive-icon.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>Blink</Text>
          </View>
          <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.7}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>JD</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {mockNewsData.map((item) => (
            <TouchableOpacity key={item.id} style={styles.newsItem} onPress={() => handleNewsPress(item)}>
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
    <View style={styles.container}>
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
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/icons/adaptive-icon.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>Blink</Text>
          </View>
          <TouchableOpacity onPress={handleAvatarPress} activeOpacity={0.7}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>JD</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Category Selector */}
        <CategorySelector 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* News List - PanResponder attached here to allow category scrolling */}
        <View style={styles.scrollViewWrapper} {...panResponder.panHandlers}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredNews.map((item, index) => (
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
                    {renderCategoryIcon(item.category)}
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <Text style={styles.snippet} numberOfLines={3}>{item.snippet}</Text>
                </View>
              </TouchableOpacity>
              {index < filteredNews.length - 1 && <View style={styles.separator} />}
            </React.Fragment>
          ))}

          {/* Temporary Dev Button - moved to end */}
          <TouchableOpacity
            style={styles.devButton}
            onPress={onReset}
          >
            <Text style={styles.devButtonText}>[DEV] Back to Onboarding</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
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
        <SavedNewsScreen 
          onBack={handleSavedNewsBack} 
          onSlideAnimReady={handleSavedNewsSlideAnimReady}
        />
      </Animated.View>

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

      {/* Settings Screen (slides in from right when avatar is clicked) */}
      {showSettings && (
        <Animated.View
          style={[
            styles.settingsContainer,
            {
              transform: [{ translateX: settingsSlideAnim }],
            },
          ]}
        >
          <SettingsScreen onBack={handleSettingsBack} />
        </Animated.View>
      )}
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
  newsDetailContainer: {
    flex: 1,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#faf9f6',
  },
  settingsContainer: {
    flex: 1,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#faf9f6',
    zIndex: 10,
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
  appTitle: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 30,
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
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#FFFFFF',
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
  categoryIconImage: {
    width: 15,
    height: 15,
    marginRight: 8,
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
    marginRight: 5,
    // textAlign: 'justify',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  devButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  devButtonText: {
    color: '#ff0000',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
});

