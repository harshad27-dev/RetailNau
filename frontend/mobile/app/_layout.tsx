import { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '../store/store';
import '../global.css';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

// Prevent splash screen from auto-hiding before loaded
SplashScreen.preventAutoHideAsync();

/**
 * AuthGuard component:
 * Runs INSIDE the navigation tree so useRouter / useSegments have context.
 * Waits until the root navigation state is ready before attempting redirects.
 */
function AuthGuard() {
  const router = useRouter();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  // Get auth state from Redux store
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Don't redirect until the navigator has finished mounting
    if (!rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/AuthScreen');
    } else if (isAuthenticated) {
      if (role === 'CUSTOMER' && segments[0] !== '(customer)') {
        router.replace('/(customer)/(tabs)/home');
      } else if (role === 'SHOP_OWNER' && segments[0] !== '(owner)') {
        router.replace('/(owner)/(tabs)/dashboard');
      }
    }
  }, [isAuthenticated, role, segments, rootNavigationState?.key]);

  return null;
}

const queryClient = new QueryClient();

/**
 * Root Layout Component:
 * Loads Poppins fonts and sets up auth guard + navigation.
 */
export default function RootLayout() {

  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // Set Poppins as the default font for ALL Text and TextInput components
      const defaultTextStyle = { fontFamily: 'Poppins_400Regular' };

      const RNText = Text as any;
      const RNTextInput = TextInput as any;

      if (RNText.defaultProps == null) RNText.defaultProps = {};
      RNText.defaultProps.style = [defaultTextStyle, RNText.defaultProps.style];

      if (RNTextInput.defaultProps == null) RNTextInput.defaultProps = {};
      RNTextInput.defaultProps.style = [defaultTextStyle, RNTextInput.defaultProps.style];

      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(customer)" />
          <Stack.Screen name="(owner)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        <AuthGuard />
      </Provider>
    </QueryClientProvider>
  );
}
