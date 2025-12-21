import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ScrollView, Animated, Easing } from 'react-native';
import Svg, { Line, Circle, Text as SvgText, G, Path } from 'react-native-svg';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import BackIcon from './BackIcon';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

interface FourteenthOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

const FocusGraph = () => {
  const width = 330;
  const height = 300;
  const paddingLeft = 40;
  const paddingRight = 40;
  const paddingBottom = 30;
  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingBottom - 20;

  // Scales
  // Y: 0 to 40
  const getY = (val: number) => graphHeight - (val / 40) * graphHeight + 20;
  // X: 0 to 7
  const getX = (day: number) => paddingLeft + (day / 7) * graphWidth;

  const points = [
    { day: 0, val: 10 },
    { day: 1, val: 12 },
    { day: 3, val: 24 },
    { day: 7, val: 38 },
  ];

  const getPoint = (i: number) => ({ x: getX(points[i].day), y: getY(points[i].val) });
  const dist = (p1: {x: number, y: number}, p2: {x: number, y: number}) => 
    Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  
  let totalLength = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalLength += dist(getPoint(i), getPoint(i+1));
  }

  const pointScale = useRef(new Animated.Value(0)).current;
  const lineProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.spring(pointScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: false,
      }),
      Animated.timing(lineProgress, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  const pathData = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${getX(p.day)} ${getY(p.val)}`
  ).join(' ');

  const strokeDashoffset = lineProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [totalLength, 0],
  });

  const dotRadius = pointScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg width={width} height={height}>
        {/* Grid Lines & Y Labels */}
        {[0, 10, 20, 30, 40].map((val) => (
          <G key={val}>
            <SvgText
              x={30}
              y={getY(val) + 4}
              fontSize="12"
              fill="#000"
              textAnchor="end"
            >
              {val === 0 ? '%' : `${val}%`}
            </SvgText>
            <Line
              x1={paddingLeft}
              y1={getY(val)}
              x2={width - paddingRight}
              y2={getY(val)}
              stroke="#E0E0E0"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
          </G>
        ))}

        {/* X Labels & Vertical Grid Lines */}
        {[1, 3, 7].map((day) => (
          <G key={day}>
            <SvgText
              x={getX(day)}
              y={height - 5}
              fontSize="12"
              fill="#000"
              textAnchor="middle"
            >
              {`Day ${day}`}
            </SvgText>
            <Line
              x1={getX(day)}
              y1={20}
              x2={getX(day)}
              y2={graphHeight + 20}
              stroke="#E0E0E0"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
          </G>
        ))}

        {/* Axes */}
        <Line
          x1={paddingLeft}
          y1={20}
          x2={paddingLeft}
          y2={graphHeight + 20}
          stroke="black"
          strokeWidth="1"
        />
        <Line
          x1={paddingLeft}
          y1={graphHeight + 20}
          x2={width - paddingRight}
          y2={graphHeight + 20}
          stroke="black"
          strokeWidth="1"
        />

        {/* The Line */}
        <AnimatedPath
          d={pathData}
          stroke="black"
          strokeWidth="2"
          fill="none"
          strokeDasharray={totalLength}
          strokeDashoffset={strokeDashoffset}
        />

        {/* Dots for Day 1 and Day 3 */}
        <AnimatedCircle cx={getX(1)} cy={getY(12)} r={dotRadius} fill="black" />
        <AnimatedCircle cx={getX(3)} cy={getY(24)} r={dotRadius} fill="black" />

        {/* Target Icon at Day 7 */}
        <AnimatedG 
            transform={[
                { translateX: getX(7) },
                { translateY: getY(38) },
                { scale: pointScale }
            ]}
        >
           <Circle cx="0" cy="0" r="12" stroke="black" strokeWidth="2" fill="white" />
           <Circle cx="0" cy="0" r="8" stroke="black" strokeWidth="2" fill="none" />
           <Circle cx="0" cy="0" r="3" fill="black" />
           {/* Dart */}
           <Path d="M 6 -6 L 18 -18" stroke="black" strokeWidth="2" fill="none" />
           <Path d="M 14 -18 L 18 -18 L 18 -14" stroke="black" strokeWidth="2" fill="none" />
        </AnimatedG>
      </Svg>
    </View>
  );
};

export default function FourteenthOnboardingScreen({ onNext, onBack }: FourteenthOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular,
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
          <Text style={styles.title}>You're about to reclaim your attention</Text>
          <Text style={styles.description}>
            Based on Blink's early user feedback, starting the day with a curated digest — instead of doomscrolling — can extend your focus windows by up to 35%.
          </Text>
          <FocusGraph />
          <TouchableOpacity style={styles.continueButton} onPress={onNext}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
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
        <Text style={styles.title}>You're about to reclaim your attention</Text>

        {/* Description */}
        <Text style={styles.description}>
          Based on Blink's early user feedback, starting the day with a curated digest — instead of doomscrolling — can extend your focus windows by up to 35%.
        </Text>

        {/* Image */}
        <View style={styles.imageContainer}>
          <FocusGraph />
        </View>
      </View>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
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
    paddingTop: 80, // Adjusted to account for progress bar
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 24,
  },
  description: {
    fontSize: 15,
    fontFamily: 'PlayfairDisplay_400Regular',
    fontWeight: '500',
    color: '#000000',
    lineHeight: 22,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  image: {
    width: '85%',
    height: '70%',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 1000,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
});
