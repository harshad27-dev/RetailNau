import { View, Text, ScrollView } from 'react-native';
import React from 'react';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 pt-12">
        <Text className="text-3xl font-bold text-obsidian mb-2">Style Guide</Text>
        <Text className="text-gray-500 mb-8">Testing colors.ts & Tailwind Config</Text>

        {/* Brand Colors Section */}
        <Section title="Primary (Deep Teal)">
          <ColorBox bg="bg-primary-50" label="50" />
          <ColorBox bg="bg-primary-100" label="100" />
          <ColorBox bg="bg-primary" label="Default (500)" isDark />
          <ColorBox bg="bg-primary-700" label="700" isDark />
        </Section>

        <Section title="Secondary (Mint)">
          <ColorBox bg="bg-secondary-50" label="50" />
          <ColorBox bg="bg-secondary" label="Default (100)" />
          <ColorBox bg="bg-secondary-500" label="500" />
        </Section>

        <Section title="Accent (CTA Orange)">
          <ColorBox bg="bg-accent" label="Default" isDark />
          <ColorBox bg="bg-accent-200" label="200" />
        </Section>

        {/* Real World Component Preview */}
        <View className="mt-10 p-6 rounded-3xl bg-secondary border border-primary-100">
          <Text className="text-primary-900 font-bold text-lg">Promo Banner</Text>
          <Text className="text-primary-700 mb-4">Get 20% off on organic vegetables today!</Text>
          
          <View className="bg-accent p-3 rounded-xl items-center shadow-sm">
            <Text className="text-white font-bold">Shop Now</Text>
          </View>
        </View>

        <View className="mt-4 mb-10 items-center">
            <Text className="text-obsidian font-poppins-semibold">Using Poppins Semibold</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Helper Components for the Test Screen
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <View className="mb-6">
    <Text className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">{title}</Text>
    <View className="flex-row flex-wrap gap-2">{children}</View>
  </View>
);

const ColorBox = ({ bg, label, isDark = false }: { bg: string, label: string, isDark?: boolean }) => (
  <View className={`${bg} h-16 w-20 rounded-lg justify-center items-center shadow-sm`}>
    <Text className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-primary-900'}`}>
      {label}
    </Text>
  </View>
);  