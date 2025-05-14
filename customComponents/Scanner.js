import { useEffect, useState } from 'react';
import { CameraView, Camera } from 'expo-camera';
import { StyleSheet, Text, View, Alert, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Supabase client initialization
const supabaseUrl = 'https://shvutlcgljqiidqxqrru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodnV0bGNnbGpxaWlkcXhxcnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM2NDgsImV4cCI6MjA2MTQ4OTY0OH0.UXJKk6iIyaVJsohEB6CwwauC21YPez1xwsOFy9qa34Q'; // Make sure to use the correct key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Scanner({ screen, onClick }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [isFrontcam, setIsFrontcam] = useState(true);
    const [scanned, setScanned] = useState(false);
    const [qrData, setQrData] = useState(null);
    const localeTimeStamped = new Date().toLocaleString();
    const deviceWidth = Dimensions.get("window").width;

    useEffect(() => {
        if (deviceWidth < 400) {
            setIsFrontcam(false);
        } else {
            setIsFrontcam(true);
        }

        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log('Camera permission status:', status);
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setQrData(data);
        console.log("Scanned QR data:", data);

        const { data: user, error } = await supabase
            .from('medical_professionals')
            .select('*')
            .eq('email_address', data)
            .single();

        if (error || !user) {
            onClick({ trigger: screen === "in" ? "timeinFailed" : "timeoutFailed", error: "invalidQr" });
            setScanned(false);
            return;
        }

        const currentTime = new Date().toISOString();
        const updateData = screen === 'in'
            ? { time_in: currentTime, formatted_timein: localeTimeStamped }
            : { time_out: currentTime, formatted_timeout: localeTimeStamped };

        const { error: updateError } = await supabase
            .from('medical_professionals')
            .update(updateData)
            .eq('email_address', data);

        if (updateError) {
            onClick({ trigger: screen === "in" ? "timeinFailed" : "timeoutFailed", error: "failedLogin" });
            console.error("Update error:", updateError);
        } else {
            onClick({
                trigger: screen === "in" ? "timeinSuccess" : "timeoutSuccess",
                firstName: user.first_name,
                isLogin: screen === 'in',
            });
        }

        setTimeout(() => setScanned(false), 3000);
    };

    // 🚫 Camera permission not yet decided
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00e47c" />
            </View>
        );
    }

    // ❌ Camera permission denied
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={styles.overlayText}>No access to camera</Text>
            </View>
        );
    }

    // ✅ Camera permission granted
    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                barCodeScannerSettings={{ barCodeTypes: ['qr'] }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                facing={isFrontcam ? "front" : "back"}
            />
            <View style={styles.overlay}>
                <View style={styles.overlayContent}>
                    <Text style={styles.overlayText}>
                        {screen === "in" ? "In" : "Out"}
                    </Text>
                    {
                        screen === "in" ?
                        <MaterialCommunityIcons name="login" size={24} color="#ffffff"/> :
                        <MaterialCommunityIcons name="logout" size={24} color="#ffffff"/>
                    }
                </View>
            </View>
            <Pressable onPress={() => setIsFrontcam(!isFrontcam)} style={styles.flipOverlay}>
                <Text style={styles.flipOverlayText}>Flip Cam</Text>
            </Pressable>
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
        bottom: 10,
        alignSelf: 'left',
        left: 10,
        backgroundColor: '#08312A',
        padding: 10,
        borderRadius: 8,
    },
    overlayContent: {
        flexDirection: 'row',
        gap: 10
    },  
    overlayText: {
        // color: '#00e47c',
        color: '#ffffff',
        fontSize: 18,
    },
    flipOverlay: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#08312A',
        padding: 10,
        borderRadius: 8,
    },
    flipOverlayText: {
        color: '#00e47c',
        fontSize: 18,
    },
});
