import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface HomeTopHeaderProps {
    CurrentLocation?: string;
    shopLocation?: string;
    shopLogo?: string;
    onNotificationPress?: () => void;
    onLocationPress?: () => void;
}

export default function HomeTopHeader({
    CurrentLocation = 'Madhapur',
    shopLocation = 'Madhavaram Milk colony...',
    shopLogo,
    onNotificationPress,
    onLocationPress,
}: HomeTopHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.logoWrap}>
                    {shopLogo ? (
                        <Image source={{ uri: shopLogo }} style={styles.logoImage} />
                    ) : (
                        <View style={styles.logoFallback}>
                            <Ionicons name="storefront-outline" size={20} color="#475467" />
                        </View>
                    )}
                </View>

                <View style={styles.locationSection}>
                    <Text style={[styles.currentLocationText, styles.fontBold]}>{CurrentLocation}</Text>
                    <TouchableOpacity style={styles.locationRow} onPress={onLocationPress} activeOpacity={0.7}>
                        <Ionicons name="location-outline" size={14} color="#667085" />
                        <Text style={[styles.shopLocationText, styles.fontRegular]} numberOfLines={1}>
                            {shopLocation}
                        </Text>
                        <MaterialIcons name="keyboard-arrow-down" size={18} color="#667085" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.notificationButton}
                    onPress={onNotificationPress}
                    activeOpacity={0.75}
                >
                    <Ionicons name="notifications-outline" size={21} color="#344054" />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 8,
        marginBottom: 14,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoWrap: {
        marginRight: 10,
    },
    logoImage: {
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    logoFallback: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F4F7',
        borderWidth: 1,
        borderColor: '#D0D5DD',
    },
    locationSection: {
        flex: 1,
    },
    currentLocationText: {
        fontSize: 18,
        lineHeight: 22,
        color: '#101828',
    },
    locationRow: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    shopLocationText: {
        marginLeft: 2,
        maxWidth: 180,
        fontSize: 13,
        color: '#667085',
    },
    notificationButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EAECF0',
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    notificationDot: {
        position: 'absolute',
        top: 9,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    fontBold: {
        fontFamily: 'Poppins_700Bold',
    },
    fontRegular: {
        fontFamily: 'Poppins_400Regular',
    },
});
