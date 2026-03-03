import { Stack } from 'expo-router';

export default function CustomerLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Root point for Customer Tab navigation */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Other screens that do not need bottom tabs like product details */}
            <Stack.Screen name="product/[id]" options={{ presentation: 'modal', headerShown: true, title: 'Product Detail' }} />
            <Stack.Screen name="checkout" options={{ title: 'Checkout', headerShown: true }} />
        </Stack>
    );
}
