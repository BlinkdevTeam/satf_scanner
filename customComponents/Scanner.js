import { useEffect, useState } from 'react';
import { CameraView, Camera } from 'expo-camera';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';

// Supabase client initialization
const supabaseUrl = 'https://shvutlcgljqiidqxqrru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodnV0bGNnbGpxaWlkcXhxcnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM2NDgsImV4cCI6MjA2MTQ4OTY0OH0.UXJKk6iIyaVJsohEB6CwwauC21YPez1xwsOFy9qa34Q'; // Make sure to use the correct key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Scanner({screen, onClick}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [qrData, setQrData] = useState(null);
    const localeTimeStamped = new Date().toLocaleString()

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
      
        console.log("data", data); // This is the email from the QR code
      
        // Step 1: Find the user in `medical_professionals` table by email
        const { data: user, error } = await supabase
          .from('medical_professionals')
          .select('*')
          .eq('email_address', data)
          .single();
      
        if (error || !user) {
          Alert.alert("Error", "User not found or fetching failed.");
          console.error("Fetch error:", error);
          setScanned(false);
          return;
        }
      
        console.log("user", user);
      
        const currentTime = new Date().toISOString();
      
        // Step 2: Decide whether to update time_in or time_out
        // const updateField = user.time_in && !user.time_out ? 'time_out' : 'time_in';

        const updateField = screen
      
        // Step 3: Create the update object time_in: timeStamped, formatted_timein: localeTimeStamped
        const updateData = updateField === 'in' ? { time_in: currentTime,  formatted_timein: localeTimeStamped } : { time_out: currentTime,  formatted_timeout: localeTimeStamped };
      
        // Step 4: Update the user's time
        const { error: updateError } = await supabase
          .from('medical_professionals')
          .update(updateData)
          .eq('email_address', data);
      
        if (updateError) {
          Alert.alert("Error", "Failed to update time.");
          console.error("Update error:", updateError);
        } else {
            //   Alert.alert("Success", `User ${updateField === 'time_in' ? 'checked in' : 'checked out'}.`);

            onClick({trigger: screen === "in" ? "timeinSuccess" : screen === "out" && "timeoutSuccess", firstName: user.first_name});
        }
      
        setTimeout(() => setScanned(false), 3000);
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
