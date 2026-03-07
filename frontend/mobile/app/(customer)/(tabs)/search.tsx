import { View, Text } from 'react-native';
import React from 'react';
import GradientBackground from '../../../components/ui/GradientBackground';

export default function SearchScreen() {
    return (
        <GradientBackground>
            <View className="flex-1 justify-center items-center p-6">
                <Text className="text-xl font-bold text-gray-900">Search</Text>
            </View>
        </GradientBackground>
    );
}
