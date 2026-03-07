import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomeTopHeader from './HomeTopHeader';
import HomeSearchBar from './HomeSearchBar';
import HomeCategories from './HomeCategories';

interface HomeHeaderProps {
    CurrentLocation?: string;
    shopLocation?: string;
    shopLogo?: string;
    onNotificationPress?: () => void;
    onFilterPress?: () => void;
    onSearchChange?: (text: string) => void;
    onLocationPress?: () => void;
    onCategoryPress?: (category: string) => void;
}

export default function HomeHeader({
    CurrentLocation,
    shopLocation,
    shopLogo,
    onNotificationPress,
    onFilterPress,
    onSearchChange,
    onLocationPress,
    onCategoryPress,
}: HomeHeaderProps) {
    return (
        <View style={styles.container}>
            <HomeTopHeader
                CurrentLocation={CurrentLocation}
                shopLocation={shopLocation}
                shopLogo={shopLogo}
                onNotificationPress={onNotificationPress}
                onLocationPress={onLocationPress}
            />
            <HomeSearchBar onFilterPress={onFilterPress} onSearchChange={onSearchChange} />
            <HomeCategories onCategoryPress={onCategoryPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 12,
    },
});
