import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OTPVerificationProps } from "../../types/auth.types";

const OTP_LENGTH = 6;

export default function OTPVerification({
  mobileNumber,
  otp,
  setOtp,
  timer,
  onBack,
  onResendOtp,
  onVerify,
  isLoading,
}: OTPVerificationProps) {
  const inputRefs = useRef<TextInput[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Handle typing
  const handleOtpChange = (value: string, index: number) => {
    const cleanValue = value.replace(/\D/g, "");

    // handle paste (ex: paste full OTP)
    if (cleanValue.length > 1) {
      const otpArray = cleanValue.slice(0, OTP_LENGTH).split("");
      const newOtp = [...otp];

      otpArray.forEach((digit, i) => {
        newOtp[i] = digit;
      });

      setOtp(newOtp);

      const nextIndex = Math.min(otpArray.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);

    // move to next input
    if (cleanValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.join("").length === OTP_LENGTH;

  return (
    <View className="flex-1 bg-white px-6 pt-6">
      {/* Back Button */}
      <TouchableOpacity
        onPress={onBack}
        className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center mb-8"
      >
        <Ionicons name="arrow-back" size={22} color="#111827" />
      </TouchableOpacity>

      {/* Header */}
      <View className="mb-10">
        <Text className="text-[26px] font-bold text-gray-900 mb-2">
          Verify OTP
        </Text>

        <Text className="text-gray-500 text-[15px]">
          Enter the 6-digit code sent to
        </Text>

        <Text className="text-gray-900 font-semibold mt-1">
          +91 {mobileNumber}
        </Text>
      </View>

      {/* OTP Inputs */}
      <View className="flex-row justify-between mb-10">
        {otp.map((digit, index) => {
          const isActive = activeIndex === index;

          return (
            <TextInput
              key={`otp-input-${index}`}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              value={digit}
              maxLength={1}
              keyboardType="number-pad"
              autoFocus={index === 0}
              onFocus={() => setActiveIndex(index)}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              className={`w-12 h-14 text-center text-xl font-semibold rounded-xl border ${
                isActive
                  ? "border-green-600 bg-white"
                  : digit
                  ? "border-green-500 bg-white"
                  : "border-gray-200 bg-gray-50"
              }`}
              cursorColor="#16A34A"
              selectionColor="#16A34A"
            />
          );
        })}
      </View>

      {/* Resend Section */}
      <View className="items-center mb-6">
        {timer > 0 ? (
          <Text className="text-gray-500 text-sm">
            Resend OTP in{" "}
            <Text className="font-semibold">
              00:{timer.toString().padStart(2, "0")}
            </Text>
          </Text>
        ) : (
          <TouchableOpacity disabled={isLoading} onPress={onResendOtp}>
            <Text className="text-green-600 font-semibold text-sm">
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-1" />

      {/* Verify Button */}
      <TouchableOpacity
        disabled={!isComplete || isLoading}
        onPress={onVerify}
        className={`h-14 rounded-xl items-center justify-center mb-6 ${
          !isComplete || isLoading ? "bg-gray-300" : "bg-green-600"
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-[16px]">
            Verify & Continue
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}