import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Modal } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import BackIcon from './BackIcon';
import * as StoreReview from 'expo-store-review';

interface ThirteenthOnboardingScreenProps {
  onNext?: () => void;
  onBack?: () => void;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

const dummyReviews: Review[] = [
  {
    id: '1',
    name: "Ethan Moore",
    rating: 5,
    comment: "Blink helped me stay informed without falling into endless scrolling. I check the news, get the summary, and move on with my day."
  },
  {
    id: '2',
    name: "Sofia Ramirez",
    rating: 5,
    comment: "I love how intentional this app feels. Choosing when and how much news I see makes a huge difference for my focus."
  },
  {
    id: '3',
    name: "Daniel Foster",
    rating: 4,
    comment: "Clean design, smart summaries, and no distractions. It’s refreshing compared to traditional news apps."
  },
  {
    id: '4',
    name: "Maya Chen",
    rating: 5,
    comment: "Blink respects my time. I finally feel in control of my news consumption instead of the other way around."
  },
  {
    id: '5',
    name: "Lucas Bennett",
    rating: 4,
    comment: "Simple idea, executed really well. Perfect for staying updated without wasting mental energy."
  }
];

export default function ThirteenthOnboardingScreen({ onNext, onBack }: ThirteenthOnboardingScreenProps) {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_600SemiBold,
  });

  const [showReviewModal, setShowReviewModal] = useState(true);

  useEffect(() => {
    // Request review when component mounts
    const requestReview = async () => {
      if (await StoreReview.hasAction()) {
        await StoreReview.requestReview();
      }
    };
    requestReview();
  }, []);

  const handleCloseModal = () => {
    setShowReviewModal(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Text key={index} style={styles.star}>
        {index < rating ? '★' : '☆'}
      </Text>
    ));
  };

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
          <Text style={styles.title}>Join Thousands Who Trust Blink</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Overlay when modal is shown */}
      {showReviewModal && <View style={styles.overlay} />}

      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon size={15} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text style={styles.title}>Join Thousands Who Trust Blink</Text>

        {/* Reviews */}
        <View style={styles.reviewsContainer}>
          {dummyReviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewUserInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{review.name.charAt(0)}</Text>
                  </View>
                  <Text style={styles.reviewerName}>{review.name}</Text>
                </View>
                <View style={styles.starsContainer}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={onNext}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* iOS Review Modal Simulation */}
      <Modal
        visible={showReviewModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={handleCloseModal}
        >
          <View style={styles.reviewModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Review Store Review Controller?</Text>
              <Text style={styles.modalSubtitle}>Tap a star to rate it on the App Store.</Text>
            </View>
            
            <View style={styles.modalStarsContainer}>
              {renderStars(0)}
            </View>
            
            <TouchableOpacity 
              style={styles.notNowButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.notNowText}>Not now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f6',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay_700Bold',
    color: '#000000',
    lineHeight: 40,
    marginBottom: 32,
  },
  reviewsContainer: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reviewerName: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#000000',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
    marginLeft: 2,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    color: '#666666',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  reviewModal: {
    backgroundColor: '#D9D9D9',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 340,
    alignItems: 'center',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    color: '#000000',
    textAlign: 'center',
  },
  modalStarsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  notNowButton: {
    paddingVertical: 8,
  },
  notNowText: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
    fontWeight: '600',
    color: '#007AFF',
  },
});
