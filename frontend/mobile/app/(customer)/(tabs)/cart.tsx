import { View, Text } from 'react-native';
import React from 'react';

export default function CartScreen() {
    return (
        <View className="flex-1 justify-center items-center bg-white p-6">
            <Text className="text-xl font-bold text-gray-900">Your Cart</Text>
            <Text className="text-base text-gray-500 mt-2">Cart items will appear here.</Text>
        </View>
    );
}
