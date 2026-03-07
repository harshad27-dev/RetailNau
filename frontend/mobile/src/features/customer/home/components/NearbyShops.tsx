import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface NearbyShop {
    id: string;
    name: string;
    type: string;
    rating: number;
    reviews: number;
    distance: string;
    time: string;
    imageUrl: string;
    isOpen: boolean;
    offers: string | null;
}

export const nearbyShops: NearbyShop[] = [
    {
        id: '1',
        name: "Maria's Kitchen",
        type: 'Organic Vegetables & Groceries',
        rating: 4.8,
        reviews: 124,
        distance: '1.2 km',
        time: '15-20 min',
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60',
        isOpen: true,
        offers: '20% OFF',
    },
    {
        id: '2',
        name: 'Fresh Mart Supermarket',
        type: 'Daily Essentials & Dairy',
        rating: 4.5,
        reviews: 320,
        distance: '2.5 km',
        time: '25-30 min',
        imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&auto=format&fit=crop&q=60',
        isOpen: true,
        offers: 'Free Delivery',
    },
    {
        id: '3',
        name: 'Green Leaf Organics',
        type: 'Farm Fresh Produce',
        rating: 4.9,
        reviews: 89,
        distance: '3.1 km',
        time: '35-40 min',
        imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=60',
        isOpen: false,
        offers: null,
    },
    {
        id: '4',
        name: 'Sunrise Grocers',
        type: 'Fruits, Snacks & Beverages',
        rating: 4.6,
        reviews: 210,
        distance: '1.8 km',
        time: '20-25 min',
        imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=60',
        isOpen: true,
        offers: 'Rs 50 OFF',
    },
    {
        id: '5',
        name: 'Daily Needs Store',
        type: 'Household & Personal Care',
        rating: 4.3,
        reviews: 175,
        distance: '0.8 km',
        time: '10-15 min',
        imageUrl: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?w=800&auto=format&fit=crop&q=60',
        isOpen: true,
        offers: null,
    },
];

interface NearbyShopsProps {
    onShopPress?: (shopId: string) => void;
    onViewAllPress?: () => void;
}

interface NearbyShopsHeaderProps {
    onViewAllPress?: () => void;
}

interface NearbyShopCardProps {
    shop: NearbyShop;
    onShopPress?: (shopId: string) => void;
}

export function NearbyShopsHeader({ onViewAllPress }: NearbyShopsHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View>
                    <Text style={[styles.headerTitle, styles.fontBold]}>Nearby Shops</Text>
                    <Text style={[styles.headerSubtitle, styles.fontRegular]}>Based on your location</Text>
                </View>
                <TouchableOpacity onPress={onViewAllPress} activeOpacity={0.7}>
                    <Text style={[styles.viewAllText, styles.fontSemiBold]}>View All</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export function NearbyShopCard({ shop, onShopPress }: NearbyShopCardProps) {
    return (
        <TouchableOpacity
            key={shop.id}
            style={styles.card}
            onPress={() => onShopPress?.(shop.id)}
            activeOpacity={0.92}
        >
            <View style={styles.imageWrapper}>
                <Image source={{ uri: shop.imageUrl }} style={styles.image} resizeMode="cover" />
                <View style={styles.imageOverlay} />

                {shop.offers && (
                    <View style={styles.offerBadge}>
                        <Text style={[styles.offerText, styles.fontBold]}>{shop.offers}</Text>
                    </View>
                )}
            </View>

            <View style={styles.infoSection}>
                <View>
                    <View style={styles.nameStatusRow}>
                        <Text style={[styles.shopName, styles.fontBold]} numberOfLines={1}>
                            {shop.name}
                        </Text>
                        <View
                            style={[
                                styles.statusPill,
                                shop.isOpen ? styles.statusOpenBg : styles.statusClosedBg,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    styles.fontBold,
                                    shop.isOpen ? styles.statusOpenText : styles.statusClosedText,
                                ]}
                            >
                                {shop.isOpen ? 'OPEN' : 'CLOSED'}
                            </Text>
                        </View>
                    </View>

                    <Text style={[styles.shopType, styles.fontRegular]} numberOfLines={1}>
                        {shop.type}
                    </Text>

                    <View style={styles.ratingRow}>
                        <View style={styles.ratingPill}>
                            <Ionicons name="star" size={12} color="#E7A008" />
                            <Text style={[styles.ratingText, styles.fontSemiBold]}>{shop.rating}</Text>
                        </View>
                        <Text style={[styles.reviewText, styles.fontRegular]}>({shop.reviews} reviews)</Text>
                    </View>
                </View>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Ionicons name="location-outline" size={13} color="#667085" />
                        <Text style={[styles.metaText, styles.fontRegular]}>{shop.distance}</Text>
                    </View>
                    <View style={styles.metaSeparator} />
                    <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={13} color="#667085" />
                        <Text style={[styles.metaText, styles.fontRegular]}>{shop.time}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default function NearbyShops({ onShopPress, onViewAllPress }: NearbyShopsProps) {
    return (
        <View style={styles.container}>
            <NearbyShopsHeader onViewAllPress={onViewAllPress} />

            <View>
                {nearbyShops.map((shop) => (
                    <NearbyShopCard key={shop.id} shop={shop} onShopPress={onShopPress} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    headerContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 18,
        color: '#1A1A1A',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#667085',
        marginTop: 2,
    },
    viewAllText: {
        fontSize: 14,
        color: '#2E7D32',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E8ECEF',
        flexDirection: 'row',
        marginBottom: 12,
        marginHorizontal: 16,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    imageWrapper: {
        width: 116,
        height: 136,
        backgroundColor: '#E5E7EB',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    offerBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#FF7A1A',
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 4,
        shadowColor: '#FB923C',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 2,
    },
    offerText: {
        color: '#FFFFFF',
        fontSize: 9,
    },
    infoSection: {
        flex: 1,
        padding: 14,
        justifyContent: 'space-between',
    },
    nameStatusRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    shopName: {
        flex: 1,
        marginRight: 8,
        fontSize: 15,
        color: '#101828',
        lineHeight: 20,
    },
    statusPill: {
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    statusOpenBg: {
        backgroundColor: '#EAF8EE',
    },
    statusClosedBg: {
        backgroundColor: '#FDECEC',
    },
    statusText: {
        fontSize: 9,
    },
    statusOpenText: {
        color: '#1F8A47',
    },
    statusClosedText: {
        color: '#C73D3D',
    },
    shopType: {
        fontSize: 11,
        color: '#667085',
        marginBottom: 10,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    ratingPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF6E5',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 11,
        color: '#9A6700',
    },
    reviewText: {
        marginLeft: 8,
        fontSize: 10,
        color: '#98A2B3',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#EEF2F6',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        marginLeft: 4,
        fontSize: 11,
        color: '#475467',
    },
    metaSeparator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#D0D5DD',
        marginHorizontal: 12,
    },
    fontBold: {
        fontFamily: 'Poppins_700Bold',
    },
    fontSemiBold: {
        fontFamily: 'Poppins_600SemiBold',
    },
    fontRegular: {
        fontFamily: 'Poppins_400Regular',
    },
});
