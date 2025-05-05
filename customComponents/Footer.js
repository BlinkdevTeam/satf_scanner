import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Footer({onTap}) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.pressableStyle} onPress={() => onTap({trigger: 'home'})}>
                <Ionicons name="home" size={24} color="#00e47c"/>
                <Text style={{ fontSize: 10, color: '#00e47c', fontWeight: 'normal' }}>Home</Text>
            </Pressable>
            <Pressable style={styles.pressableStyle} onPress={() => onTap({trigger: "in"})}>
                <MaterialCommunityIcons name="login" size={24} color="#00e47c"/>
                <Text style={{ fontSize: 10, color: '#00e47c', fontWeight: 'normal' }}>Time In</Text>
            </Pressable>
            <Pressable style={styles.pressableStyle} onPress={() => onTap({trigger: "out"})}>
                <MaterialCommunityIcons name="logout" size={24} color="#00e47c"/>
                <Text style={{ fontSize: 10, color: '#00e47c', fontWeight: 'normal' }}>Time Out</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#08312A',
        flexDirection: 'row',
        paddingBottom: 20,
        paddingTop: 20,
        paddingRight: 40,
        paddingLeft: 40,
        width: '100%',
        justifyContent: "space-between",
    },
    buttonText: {
        fontSize: 11
    },
    pressableStyle: {
        textAlign: "center",  // Works for Text components
        alignItems: "center",
        // paddingTop: 30,
        // borderTopWidth: 1, 
        // borderColor: "#ffffff", // Corrected
        // borderRadius: 8,
        // gap: 10, // Only works in RN 0.71+
    }
});