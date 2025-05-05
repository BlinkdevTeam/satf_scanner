import { useEffect, useState } from 'react';
import { CameraView, Camera } from 'expo-camera';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createClient } from '@supabase/supabase-js';


export default function Scanner({screen}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [qrData, setQrData] = useState(null);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log('Camera permission status:', status);
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setQrData(data);
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                barCodeScannerSettings={{ barCodeTypes: ['qr'] }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
             <View style={styles.overlay}>
                <Text style={styles.overlayText}>{screen === "in" ? "Time in" : screen === "out" && "Time out"  }</Text>
            </View>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 10,
        alignSelf: 'center',
        backgroundColor: '#08312A',
        padding: 10,
        borderRadius: 8,
        },

        overlayText: {
        color: '#00e47c',
        fontSize: 18,
        },
});
