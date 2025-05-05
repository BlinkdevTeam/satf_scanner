import { useEffect, useState } from 'react';
import { CameraView, Camera } from 'expo-camera';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const supabaseUrl = 'https://shvutlcgljqiidqxqrru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodnV0bGNnbGpxaWlkcXhxcnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM2NDgsImV4cCI6MjA2MTQ4OTY0OH0.UXJKk6iIyaVJsohEB6CwwauC21YPez1xwsOFy9qa34Q'; // Make sure to use the correct key
const supabase = createClient(supabaseUrl, supabaseKey);

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

        console.log("data", data)
        // Fetch the user data from Supabase
        const { data: user, error } = await supabase
            .from('medical_professionals')
            .select('*')
            .eq('email_address', data)
            .single(); // Get one row

        if (error) {
            Alert.alert("Error", "An error occurred while fetching the data.");
            console.error(error);
            setScanned(false);
            return;
        }

        if (user) {
            const currentTime = new Date().toISOString();

            console.log("user", user);

            const updatedStatus = user.status === 'time_in' ? 'time_out' : 'time_in';

            const { error: updateError } = await supabase
                .from('users')
                .update({
                    status: updatedStatus,
                    last_updated: currentTime,
                })
                .eq('qr_id', data);

            if (updateError) {
                Alert.alert("Error", "Failed to update the status.");
                console.error(updateError);
            } else {
                Alert.alert("Success", `User ${updatedStatus === 'time_in' ? 'Checked In' : 'Checked Out'}`);
            }
        } else {
            Alert.alert("Not Found", "No user found for the scanned QR code.");
        }

        setScanned(false);
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                barCodeScannerSettings={{ barCodeTypes: ['qr'] }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            <View style={styles.overlay}>
                <Text style={styles.overlayText}>
                    {screen === "in" ? "Time in" : screen === "out" && "Time out"}
                </Text>
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
