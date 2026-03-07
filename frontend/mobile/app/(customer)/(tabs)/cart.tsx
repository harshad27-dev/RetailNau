import { View, Text } from 'react-native';
import React from 'react';
import GradientBackground from '../../../components/ui/GradientBackground';

export default function CartScreen() {
    return (
        <GradientBackground>
            <View className="flex-1 justify-center items-center p-6">
                <Text className="text-xl font-bold text-gray-900">Your Cart</Text>
                <Text className="text-base text-gray-500 mt-2">Cart items will appear here.</Text>
            </View>
        </GradientBackground>
    );
}
