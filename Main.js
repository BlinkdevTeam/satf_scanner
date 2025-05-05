import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Intro from './customComponents/Intro';
import Header from './customComponents/Header';
import Footer from './customComponents/Footer';
import Scanner from './customComponents/Scanner';
import TaptoScan from './customComponents/TaptoScan';
import Loader from './customComponents/Loader';
// import Spinner from 'react-native-spinkit';


export default function Main() {
    const [screen, setScreen] = useState("home")
    const [isLoading, setIsLoading] = useState(false);

    const handleScannerStatus = (e) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setScreen(e.trigger)
        }, 1000);
        // setScanning(true)
    }

    return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#08312A' }}>
                <StatusBar style="light" />
                <Header/>
                {
                    isLoading ? 
                        <Loader/>
                    :  
                    screen === "in" ?
                        <Scanner screen={screen}/> :
                    screen === "out" ?
                        <Scanner screen={screen}/> :
                        <TaptoScan onTap={() => handleScannerStatus(true)}/> 
                    }
                <Footer
                    onTap={(e) => handleScannerStatus(e)}
                />
            </SafeAreaView>
    );
}
