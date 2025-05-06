import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';

export default function ScanSuccess({ onTap, user, onClick, screen }) {
    const line1 = screen === "timeinSuccess" ? "Welcome" : screen === "timeoutSuccess" && "Thank you";
    const line2 = user ? user : 'Participant';

    const animations1 = useRef(line1.split('').map(() => new Animated.Value(0))).current;
    const animations2 = useRef(line2.split('').map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const sequence1 = animations1.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 300,
                delay: index * 100,
                useNativeDriver: true,
            })
        );

        const sequence2 = animations2.map((anim, index) =>
            Animated.timing(anim, {
                toValue: 1,
                duration: 300,
                delay: index * 100,
                useNativeDriver: true,
            })
        );

        // Animate first line, then second
        Animated.sequence([
            Animated.stagger(50, sequence1),
            Animated.delay(20), // Small pause between lines
            Animated.stagger(50, sequence2)
        ]).start();
    }, []);

    const renderAnimatedText = (text, animations) => (
        <View style={styles.wordContainer}>
            {text.split('').map((letter, index) => (
                <Animated.Text
                    key={index}
                    style={[
                        styles.letter,
                        {
                            opacity: animations[index],
                            transform: [
                                {
                                    translateY: animations[index].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [10, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    {letter}
                </Animated.Text>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderAnimatedText(line1, animations1)}
            {renderAnimatedText(line2, animations2)}
            <Pressable style={styles.button} onPress={() => onClick({trigger: screen === "timeinSuccess" ? "in" : screen === "timeoutSuccess" && "out"})}>
                <Text style={styles.buttonText}>Scan Again</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#376251'
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    letter: {
        fontSize: 40,
        color: '#00e47c',
        fontWeight: 'bold',
        marginHorizontal: 2,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#00e47c',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: "#08312A",
        textAlign: 'center',
        fontWeight: '600'
    }
});
