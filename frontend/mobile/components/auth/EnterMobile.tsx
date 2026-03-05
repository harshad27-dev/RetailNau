import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EnterMobileProps {
  mobileNumber: string;
  setMobileNumber: (num: string) => void;
  onBack: () => void;
  onSendOtp: () => void;
  isLoading?: boolean;
}

export default function EnterMobile({
  mobileNumber,
  setMobileNumber,
  onBack,
  onSendOtp,
  isLoading = false,
}: EnterMobileProps) {

  const [focused, setFocused] = useState(false);
  const isValid = mobileNumber.length === 10;

  return (
    <View className="flex-1 bg-white px-6 pt-6">

      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center mb-8"
      >
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </TouchableOpacity>

      {/* Header */}
      <View className="mb-10">
        <Text className="text-[26px] font-poppins-bold text-gray-900 mb-1">
          Enter your mobile
        </Text>

        <Text className="text-gray-500 text-[15px] font-poppins">
          We'll send a verification code to verify your number
        </Text>
      </View>

      {/* Phone Input */}
      <View
        className={`flex-row items-center h-[60px] rounded-xl border px-4 ${
          focused
            ? "border-green-600 bg-white"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <Ionicons
          name="call-outline"
          size={20}
          color={focused ? "#16A34A" : "#6B7280"}
          style={{ marginRight: 10 }}
        />

        <Text className="text-base font-semibold text-gray-900 mr-2">
          +91
        </Text>

        <TextInput
          className="flex-1 text-[18px] font-medium text-gray-900"
          placeholder="Enter mobile number"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          maxLength={10}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>

      <View className="flex-1" />

      {/* Send OTP Button */}
      <TouchableOpacity
        disabled={!isValid || isLoading}
        onPress={onSendOtp}
        className={`h-14 rounded-xl items-center justify-center mb-6 ${
          !isValid || isLoading ? "bg-gray-300" : "bg-green-600"
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-[16px] font-semibold">
            Send OTP
          </Text>
        )}
      </TouchableOpacity>

    </View>
  );
}