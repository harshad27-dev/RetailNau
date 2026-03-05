import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

const ACTIVE_ICON = '#FFFFFF';
const ACTIVE_PILL = Colors.brand.accent;
const INACTIVE = '#9CA3AF';
const BAR_BG = '#FFFFFF';
const TAB_BAR_HORIZONTAL_PADDING = 8;

const TABS = [
  { name: 'home', label: 'Home', active: 'home', inactive: 'home-outline' },
  { name: 'search', label: 'Search', active: 'search', inactive: 'search-outline' },
  { name: 'cart', label: 'Cart', active: 'cart', inactive: 'cart-outline' },
  { name: 'orders', label: 'Orders', active: 'list', inactive: 'list-outline' },
  { name: 'profile', label: 'Profile', active: 'person', inactive: 'person-outline' },
] as const;

type TabConfig = (typeof TABS)[number];
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

function getTabConfig(routeName: string): TabConfig | undefined {
  return TABS.find((tab) => tab.name === routeName);
}

function TabButton({
  focused,
  activeName,
  inactiveName,
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
}: {
  focused: boolean;
  activeName: IoniconName;
  inactiveName: IoniconName;
  accessibilityLabel?: string;
  testID?: string;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const focusAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: focused ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [focusAnim, focused]);

  const iconScale = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabButton}
      android_ripple={{ color: 'transparent' }}
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <Animated.View style={[styles.tabContent, { transform: [{ scale: iconScale }] }]}>
        <Ionicons
          name={focused ? activeName : inactiveName}
          size={22}
          color={focused ? ACTIVE_ICON : INACTIVE}
        />
      </Animated.View>
    </Pressable>
  );
}

function KyranaTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const slideX = useRef(new Animated.Value(0)).current;

  const visibleRoutes = useMemo(
    () => state.routes.filter((route) => getTabConfig(route.name)),
    [state.routes]
  );

  const tabCount = visibleRoutes.length || TABS.length;
  const trackWidth = Math.max(barWidth - TAB_BAR_HORIZONTAL_PADDING * 2, 0);
  const tabWidth = trackWidth > 0 ? trackWidth / tabCount : 0;
  const pillWidth = Math.min(55, tabWidth);

  useEffect(() => {
    if (!tabWidth) return;

    const activeRoute = state.routes[state.index];
    const activeVisibleIndex = visibleRoutes.findIndex(
      (route) => route.key === activeRoute.key
    );
    const targetIndex = activeVisibleIndex >= 0 ? activeVisibleIndex : 0;

    Animated.spring(slideX, {
      toValue:
        TAB_BAR_HORIZONTAL_PADDING +
        targetIndex * tabWidth +
        (tabWidth - pillWidth) / 2,
      friction: 9,
      tension: 90,
      useNativeDriver: true,
    }).start();
  }, [barWidth, pillWidth, slideX, state.index, state.routes, tabWidth, visibleRoutes]);

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View
        style={styles.tabBar}
        onLayout={(event) => setBarWidth(event.nativeEvent.layout.width)}
      >
        {tabWidth > 0 ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.activePill,
              {
                width: pillWidth,
                transform: [{ translateX: slideX }],
              },
            ]}
          />
        ) : null}

        {state.routes.map((route, index) => {
          const config = getTabConfig(route.name);
          if (!config) return null;

          const focused = state.index === index;
          const { options } = descriptors[route.key];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabButton
              key={route.key}
              focused={focused}
              activeName={config.active}
              inactiveName={config.inactive}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

export default function CustomerTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <KyranaTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: BAR_BG,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: TAB_BAR_HORIZONTAL_PADDING,
    backgroundColor: BAR_BG,
  },
  activePill: {
    position: 'absolute',
    left: 0,
    top: 5,
    bottom: 5,
    borderRadius: 999,
    backgroundColor: ACTIVE_PILL,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
