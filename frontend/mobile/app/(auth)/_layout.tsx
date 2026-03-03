import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthScreen" options={{ title: 'Authentication' }} />
        </Stack>
    );
}
