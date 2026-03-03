import { Stack } from 'expo-router';

export default function OwnerLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Root point for Owner Tab navigation */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Other screens that do not need bottom tabs like product management */}
            <Stack.Screen name="product/add" options={{ presentation: 'modal', headerShown: true, title: 'Add Product' }} />
            <Stack.Screen name="product/edit/[id]" options={{ presentation: 'modal', headerShown: true, title: 'Edit Product' }} />
        </Stack>
    );
}
