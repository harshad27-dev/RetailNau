import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { AccountTypeSelectionProps } from '../../types/auth.types';

export default function AccountTypeSelection({
    accountType,
    setAccountType,
    onBack,
    onContinue,
    isLoading = false,
}: AccountTypeSelectionProps) {
    return (
        <View className="flex-1 p-6 bg-white">
            <TouchableOpacity
                className="w-11 h-11 rounded-full bg-gray-100 justify-center items-center mb-6"
                onPress={onBack}
            >
                <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>

            <View className="mb-8">
                <Text className="text-[26px] font-bold text-gray-900 mb-2">Choose your account type</Text>
                <Text className="text-[15px] text-gray-500 leading-[22px]">Select how you want to use the app</Text>
            </View>

            <TouchableOpacity
                className={`flex-row p-5 rounded-2xl border-[1.5px] items-center mb-4 ${accountType === 'USER'
                        ? 'bg-green-50 border-green-600 shadow-sm shadow-green-600/5'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                style={accountType === 'USER' ? { elevation: 2 } : {}}
                activeOpacity={0.8}
                onPress={() => setAccountType('USER')}
            >
                <View className={`w-[52px] h-[52px] rounded-full justify-center items-center mr-4 ${accountType === 'USER' ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                    <Ionicons name="bag-handle-outline" size={24} color={accountType === 'USER' ? '#16A34A' : '#6B7280'} />
                </View>
                <View className="flex-1 justify-center">
                    <Text className="text-lg font-semibold text-gray-900 mb-1">User</Text>
                    <Text className="text-sm text-gray-500 leading-5">Browse and order products</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                className={`flex-row p-5 rounded-2xl border-[1.5px] items-center mb-4 ${accountType === 'SHOP_OWNER'
                        ? 'bg-green-50 border-green-600 shadow-sm shadow-green-600/5'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                style={accountType === 'SHOP_OWNER' ? { elevation: 2 } : {}}
                activeOpacity={0.8}
                onPress={() => setAccountType('SHOP_OWNER')}
            >
                <View className={`w-[52px] h-[52px] rounded-full justify-center items-center mr-4 ${accountType === 'SHOP_OWNER' ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                    <Ionicons name="storefront-outline" size={24} color={accountType === 'SHOP_OWNER' ? '#16A34A' : '#6B7280'} />
                </View>
                <View className="flex-1 justify-center">
                    <Text className="text-lg font-semibold text-gray-900 mb-1">Store Owner</Text>
                    <Text className="text-sm text-gray-500 leading-5">Manage inventory and sell products</Text>
                </View>
            </TouchableOpacity>

            <View className="flex-1" />

            <TouchableOpacity
                className={`h-14 rounded-2xl justify-center items-center mb-6 shadow-md ${(!accountType || isLoading)
                        ? 'bg-gray-200 shadow-transparent'
                        : 'bg-green-600 shadow-green-600/25'
                    }`}
                style={(!accountType || isLoading) ? { elevation: 0 } : { elevation: 4 }}
                activeOpacity={0.8}
                disabled={!accountType || isLoading}
                onPress={onContinue}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-base font-semibold">Continue</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
