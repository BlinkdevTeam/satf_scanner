import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

export default function TaptoScan({onTap}) {
    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    margin: 'auto',
                    borderColor: '#00e47c', 
                    borderWidth: 1,         
                    borderRadius: 20,
                    padding: 50,
                    width: '50%'
                }}
                onPress={() => onTap()}
            >
                <Text style={{textAlign: 'center', color: "#00e47c"}}>Tap to Scan</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#376251'
    },
});