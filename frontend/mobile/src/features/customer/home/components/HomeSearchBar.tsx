import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface HomeSearchBarProps {
    onFilterPress?: () => void;
    onSearchChange?: (text: string) => void;
}

export default function HomeSearchBar({ onFilterPress, onSearchChange }: HomeSearchBarProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.searchRow}>
                <View style={styles.searchContainer}>
                    <MaterialCommunityIcons name="magnify" size={21} color="#667085" style={styles.searchIcon} />
                    <TextInput
                        placeholder="What are you looking for?"
                        placeholderTextColor="#98A2B3"
                        style={[styles.searchInput, styles.fontRegular]}
                        onChangeText={onSearchChange}
                    />
                </View>

                <TouchableOpacity style={styles.filterButton} onPress={onFilterPress} activeOpacity={0.75}>
                    <Feather name="sliders" size={18} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        flex: 1,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E4E7EC',
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#344054',
    },
    filterButton: {
        width: 52,
        height: 52,
        marginLeft: 10,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E7D32',
        shadowColor: '#2E7D32',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.24,
        shadowRadius: 8,
        elevation: 3,
    },
    fontRegular: {
        fontFamily: 'Poppins_400Regular',
    },
});
