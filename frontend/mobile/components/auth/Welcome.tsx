import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WelcomeProps } from '../../types/auth.types';

export default function Welcome({
    onContinueMobile,
    onContinueGoogle,
    onContinueApple
}: WelcomeProps) {
    return (
        <View className="flex-1 p-6 bg-white">
            <View className="flex-1 justify-center items-center mt-10">
                <View
                    className="w-[88px] h-[88px] bg-green-50 rounded-3xl justify-center items-center mb-6 shadow-sm shadow-green-600/10"
                    style={{ elevation: 2 }}
                >
                    <Ionicons name="basket" size={48} color="#16A34A" />
                </View>
                <Text className="text-[28px] font-poppins-bold text-gray-900 mb-2 text-center">Welcome</Text>
                <Text className="text-[15px] font-poppins text-gray-500 text-center px-5">Login or create an account to continue</Text>
            </View>

            <View className="pb-5">
                <TouchableOpacity
                    className="bg-green-600 h-14 rounded-2xl justify-center items-center mb-6 shadow-md shadow-green-600/25"
                    style={{ elevation: 4 }}
                    activeOpacity={0.8}
                    onPress={onContinueMobile}
                >
                    <Text className="text-white text-base font-poppins-semibold">Continue with Mobile Number</Text>
                </TouchableOpacity>

                <View className="flex-row items-center mb-6">
                    <View className="flex-1 h-[1px] bg-gray-100" />
                    <Text className="text-gray-400 px-4 text-sm font-poppins-medium">OR</Text>
                    <View className="flex-1 h-[1px] bg-gray-100" />
                </View>

                <TouchableOpacity
                    className="h-14 rounded-2xl border-[1.5px] border-gray-100 justify-center items-center flex-row mb-4 bg-white"
                    activeOpacity={0.7}
                    onPress={onContinueGoogle}
                >
                    <Ionicons name="logo-google" size={20} color="#000" style={{ marginRight: 12 }} />
                    <Text className="text-base text-gray-900 font-poppins-semibold">Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="h-14 rounded-2xl border-[1.5px] border-gray-100 justify-center items-center flex-row mb-4 bg-white"
                    activeOpacity={0.7}
                    onPress={onContinueApple}
                >
                    <Ionicons name="logo-apple" size={20} color="#000" style={{ marginRight: 12 }} />
                    <Text className="text-base text-gray-900 font-poppins-semibold">Continue with Apple</Text>
                </TouchableOpacity>

                <Text className="text-xs font-poppins text-gray-400 text-center mt-2 leading-[18px]">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </Text>
            </View>
        </View>
    );
}
