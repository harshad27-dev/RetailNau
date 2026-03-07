import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/ui/GradientBackground';
import HomeHeader from '../../../src/features/customer/home/components/HomeHeader';
import NearbyShops from '../../../src/features/customer/home/components/NearbyShops';

export default function HomeScreen() {
  return (
    <GradientBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <HomeHeader />
          <NearbyShops />
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}