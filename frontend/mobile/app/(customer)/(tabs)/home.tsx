import { Animated, FlatList, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from '../../../components/ui/GradientBackground';
import HomeTopHeader from '../../../src/features/customer/home/components/HomeTopHeader';
import HomeSearchBar from '../../../src/features/customer/home/components/HomeSearchBar';
import HomeCategories from '../../../src/features/customer/home/components/HomeCategories';
import {
  NearbyShop,
  nearbyShops,
  NearbyShopsHeader,
  NearbyShopCard,
} from '../../../src/features/customer/home/components/NearbyShops';

type HomeRow =
  | { type: 'topHeader'; id: 'top-header' }
  | { type: 'stickyHeader'; id: 'sticky-header' }
  | { type: 'nearbyHeader'; id: 'nearby-header' }
  | { type: 'shop'; id: string; shop: NearbyShop };

const homeRows: HomeRow[] = [
  { type: 'topHeader', id: 'top-header' },
  { type: 'stickyHeader', id: 'sticky-header' },
  { type: 'nearbyHeader', id: 'nearby-header' },
  ...nearbyShops.map((shop) => ({ type: 'shop' as const, id: shop.id, shop })),
];

export default function HomeScreen() {
  const [topHeaderHeight, setTopHeaderHeight] = React.useState(0);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const transitionEnd = topHeaderHeight || 1;
  const transitionStart = Math.max(transitionEnd - 40, 0);
  const stickyBackgroundColor = scrollY.interpolate({
    inputRange: [transitionStart, transitionEnd],
    outputRange: ['rgba(255, 179, 138, 0)', 'rgba(255, 179, 138, 1)'],
     extrapolate: 'clamp',
  });
  const stickyShadowOpacity = scrollY.interpolate({
    inputRange: [transitionStart, transitionEnd],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1" edges={['top']}>
        <FlatList
          className="flex-1"
          data={homeRows}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.type === 'topHeader') {
              return (
                <View
                  onLayout={(event) => {
                    setTopHeaderHeight(event.nativeEvent.layout.height);
                  }}
                >
                  <HomeTopHeader />
                </View>
              );
            }

            if (item.type === 'stickyHeader') {
              return (
                <Animated.View
                  className="relative z-30"
                  style={[
                    {
                      backgroundColor: stickyBackgroundColor,
                      shadowOpacity: stickyShadowOpacity,
                      shadowColor: '#000000',
                      shadowOffset: { width: 0, height: 6 },
                      shadowRadius: 50,
                    },
                  ]}
                >
                  <HomeSearchBar />
                  <HomeCategories />
                  <Animated.View
                    pointerEvents="none"
                    className="absolute left-0 right-0 h-3"
                    style={{ bottom: -10, opacity: stickyShadowOpacity }}
                  >
                    <LinearGradient
                      colors={['rgba(0, 0, 0, 0.14)', 'rgba(0, 0, 0, 0.06)', 'rgba(0, 0, 0, 0)']}
                      locations={[0, 0.45, 1]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      className="flex-1"
                    />
                  </Animated.View>
                </Animated.View>
              );
            }

            if (item.type === 'nearbyHeader') {
              return <NearbyShopsHeader />;
            }

            return <NearbyShopCard shop={item.shop} />;
          }}
          stickyHeaderIndices={[1]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
