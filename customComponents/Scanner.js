import { useEffect, useState } from 'react';
import { CameraView, Camera } from 'expo-camera';
import { StyleSheet, Text, View, Alert, Pressable, Dimensions, ActivityIndicator, useWindowDimensions } from 'react-native';
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
    // const [qrData, setQrData] = useState('');
    const localeTimeStamped = new Date().toLocaleString();
    const deviceWidth = Dimensions.get("window").width;
    const { width, height } = useWindowDimensions();
    const isTablet = Math.min(width, height) >= 600;

    useEffect(() => {
        if (deviceWidth < 400) {
            setIsFrontcam(false);
        } else {
            setIsFrontcam(true);
        }

        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();

            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        // setQrData(data);
        console.log("Scanned QR data:", data);

        const { data: user, error } = await supabase
            .from('sat_forum_registrations')
            .select('*')
            .eq('email', data)
            .single();

        if (error || !user) {
            onClick({ trigger: screen === "in" ? "timeinFailed" : "timeoutFailed", error: "invalidQr" });
            setScanned(false);
            return;
        }

        const currentTime = new Date().toISOString();
        const updateData = screen === 'in'
            ? { time_in: currentTime, formatted_timein: localeTimeStamped, latest_time: currentTime}
            : { time_out: currentTime, formatted_timeout: localeTimeStamped, latest_time: currentTime};

        const { error: updateError } = await supabase
            .from('sat_forum_registrations')
            .update(updateData)
            .eq('email', data);

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
                barCodeScannerSettings={{ barcodeTypes: ['qr'] }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                facing={isFrontcam ? "front" : "back"}
            />
            <View 
                style={[
                    styles.overlay,
                    {
                        top: isTablet ? 20 : 20 ,
                        right: isTablet ? 20 : 10 ,
                        padding: isTablet ? 17 : 10 ,
                        // backgroundColor: isTablet ? '#08312A' : "",
                    }
                ]}>
                <View style={styles.overlayContent}>
                    {
                        screen === "in" ?
                        <MaterialCommunityIcons name="clock-in" size={50} color="#ffffff"/> :
                        <MaterialCommunityIcons name="clock-out" size={50} color="#ffffff"/>
                    }
                </View>
            </View>
            <Pressable 
                onPress={() => setIsFrontcam(!isFrontcam)} 
                style={[
                    styles.flipOverlay, 
                    {
                        bottom: isTablet ? 110 : 70 ,
                        right: isTablet ? 50 : 10 ,
                    }
                ]}>
                <MaterialCommunityIcons name="camera-flip-outline" size={24} color="#ffffff"/>
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
        alignSelf: 'left',
        borderRadius: 8,
    },
    overlayContent: {
        flexDirection: 'row',
        gap: 10,
    },  
    overlayText: {
        // color: '#00e47c',
        color: '#ffffff',
        fontSize: 18,
    },
    flipOverlay: {
        position: 'absolute',
        backgroundColor: '#08312A',
        padding: 20,
        borderRadius: 100,
    },
    flipOverlayText: {
        color: '#00e47c',
        fontSize: 18,
    },
});
