import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '../store/store';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Prevent splash screen from auto-hiding before loaded
SplashScreen.preventAutoHideAsync();

/**
 * AuthGuard component:
 * 1. Wraps the app and watches Redux state for `isAuthenticated` and `role`.
 * 2. Examines the current route grouping via `useSegments`.
 * 3. Uses `useRouter` to smoothly redirect to the correct (auth), (customer) or (owner) stack.
 */
function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();

  // Get auth state from Redux store
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !isAuthenticated &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/(auth)/AuthScreen');
    } else if (isAuthenticated) {
      // If the user is logged in, restrict routing based on role
      if (role === 'CUSTOMER' && segments[0] !== '(customer)') {
        router.replace('/(customer)/(tabs)/home');
      } else if (role === 'OWNER' && segments[0] !== '(owner)') {
        router.replace('/(owner)/(tabs)/dashboard');
      }
    }
  }, [isAuthenticated, role, segments, router]);

  return <>{children}</>;
}

const queryClient = new QueryClient();

/**
 * Root Layout Component:
 * Must wrap the application in Redux Provider before AuthGuard can use Redux hooks.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthGuard>
            {/* Main navigator showing the different flow groups */}
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(customer)" />
              <Stack.Screen name="(owner)" />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
          </AuthGuard>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
