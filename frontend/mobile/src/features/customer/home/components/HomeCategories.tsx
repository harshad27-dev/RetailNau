import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const categories = [
    { name: 'Fresh', iconName: 'food-apple' },
    { name: 'Dairy', iconName: 'egg' },
    { name: 'Grains', iconName: 'seed' },
    { name: 'Beverages', iconName: 'cup-water' },
    { name: 'Personal', iconName: 'lotion' },
    { name: 'Cleaning', iconName: 'broom' },
    { name: 'Instant', iconName: 'noodles' },
];

interface HomeCategoriesProps {
    onCategoryPress?: (category: string) => void;
}

export default function HomeCategories({ onCategoryPress }: HomeCategoriesProps) {
    return (
        <View style={styles.wrapper}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContent}
            >
                {categories.map((cat, index) => (
                    <TouchableOpacity
                        key={cat.name}
                        style={[styles.categoryItem, index === categories.length - 1 && styles.lastCategoryItem]}
                        onPress={() => onCategoryPress?.(cat.name)}
                        activeOpacity={0.75}
                    >
                        <View style={styles.categoryIconWrap}>
                            <MaterialCommunityIcons name={cat.iconName as any} size={26} color="#2E7D32" />
                        </View>
                        <Text style={[styles.categoryLabel, styles.fontMedium]} numberOfLines={2}>
                            {cat.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 8,
        paddingBottom: 10,
    },
    categoriesContent: {
        paddingHorizontal: 16,
    },
    categoryItem: {
        width: 74,
        alignItems: 'center',
        marginRight: 10,
    },
    lastCategoryItem: {
        marginRight: 2,
    },
    categoryIconWrap: {
        width: 56,
        height: 56,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#EAECF0',
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 6,
    },
    categoryLabel: {
        fontSize: 11,
        lineHeight: 14,
        textAlign: 'center',
        color: '#344054',
    },
    fontMedium: {
        fontFamily: 'Poppins_500Medium',
    },
});
