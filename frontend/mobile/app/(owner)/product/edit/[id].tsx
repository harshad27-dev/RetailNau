import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import GradientBackground from '../../../../components/ui/GradientBackground';

export default function EditProductScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <GradientBackground>
            <View className="flex-1 justify-center items-center">
                <Text className="text-lg text-gray-700">Edit Product #{id}</Text>
            </View>
        </GradientBackground>
    );
}
