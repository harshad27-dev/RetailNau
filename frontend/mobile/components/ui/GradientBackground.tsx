import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
    children: React.ReactNode;
    style?: object;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * A reusable full-screen gradient background wrapper.
 * Uses a warm orange tint at the top fading to white.
 */
export default function GradientBackground({ children, style }: GradientBackgroundProps) {
    return (
        <LinearGradient
            colors={[
                "rgba(230, 81, 0, 0.18)",
                "rgba(230, 81, 0, 0)",
                "#FFFFFF",
                "#FFFFFF",
            ]}
            locations={[0.0586, 0.2435, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 4 }}
            style={[styles.gradient, style]}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        minHeight: SCREEN_HEIGHT,
    },
});
