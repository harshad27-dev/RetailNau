import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileSetupProps } from '../../types/auth.types';

export default function ProfileSetup({
    fullName,
    setFullName,
    email,
    setEmail,
    onBack,
    onComplete,
    onSkip
}: ProfileSetupProps) {
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);

    return (
        <View className="flex-1 p-6 bg-white">
            <TouchableOpacity
                className="w-11 h-11 rounded-full bg-gray-100 justify-center items-center mb-6"
                onPress={onBack}
            >
                <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>

            <View className="mb-8">
                <Text className="text-[26px] font-bold text-gray-900 mb-2">Set up your profile</Text>
                <Text className="text-[15px] text-gray-500 leading-[22px]">Tell us a bit about yourself</Text>
            </View>

            <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Full Name</Text>
                <TextInput
                    className={`h-[60px] rounded-2xl border-[1.5px] px-4 text-base text-gray-900 ${isFocusedName
                            ? 'border-green-600 bg-white shadow-sm shadow-green-600/5'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                    style={isFocusedName ? { elevation: 2 } : {}}
                    placeholder="e.g. John Doe"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setIsFocusedName(true)}
                    onBlur={() => setIsFocusedName(false)}
                    selectionColor="#16A34A"
                />
            </View>

            <View className="mb-6">
                <Text className="text-sm font-semibold text-gray-700 mb-2">Email (Optional)</Text>
                <TextInput
                    className={`h-[60px] rounded-2xl border-[1.5px] px-4 text-base text-gray-900 ${isFocusedEmail
                            ? 'border-green-600 bg-white shadow-sm shadow-green-600/5'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                    style={isFocusedEmail ? { elevation: 2 } : {}}
                    placeholder="e.g. john@example.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    selectionColor="#16A34A"
                />
            </View>

            <View className="flex-1" />

            <TouchableOpacity
                className={`h-14 rounded-2xl justify-center items-center mb-4 shadow-md ${(!fullName.trim())
                        ? 'bg-gray-200 shadow-transparent'
                        : 'bg-green-600 shadow-green-600/25'
                    }`}
                style={(!fullName.trim()) ? { elevation: 0 } : { elevation: 4 }}
                activeOpacity={0.8}
                disabled={!fullName.trim()}
                onPress={onComplete}
            >
                <Text className="text-white text-base font-semibold">Complete Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="h-12 justify-center items-center mb-2"
                onPress={onSkip}
                activeOpacity={0.6}
            >
                <Text className="text-[15px] font-semibold text-gray-500">Skip for now</Text>
            </TouchableOpacity>
        </View>
    );
}
