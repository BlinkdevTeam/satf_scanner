import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Intro from './customComponents/Intro';
import Header from './customComponents/Header';
import Footer from './customComponents/Footer';
import Scanner from './customComponents/Scanner';
import ScanSuccess from './customComponents/ScanSuccess';
import TaptoScan from './customComponents/TaptoScan';
import Home from './customComponents/Home';
import Loader from './customComponents/Loader';
// import Spinner from 'react-native-spinkit';


export default function Main() {
    const [screen, setScreen] = useState("home")
    const [isLoading, setIsLoading] = useState(false);
    const [scannedUser, setScannedUser] = useState(null);
    const [isLogin, setIslogin] = useState(false)

    const handleScannerStatus = (e) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setScreen(e.trigger);
            setScannedUser(e.firstName)
            setIslogin(e.isLogin)
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
                        <Scanner 
                            screen={screen}
                            onClick={(e) => handleScannerStatus(e)}
                        /> :
                    screen === "out" ?
                        <Scanner 
                            screen={screen}
                            onClick={(e) => handleScannerStatus(e)}
                        /> : 
                    screen === "timeinSuccess" ?
                        <ScanSuccess
                            user={scannedUser}
                            screen={screen}
                            onClick={(e) => handleScannerStatus(e)}
                        /> :
                    screen === "timeoutSuccess" ?
                        <ScanSuccess
                            user={scannedUser}
                            screen={screen}
                            onClick={(e) => handleScannerStatus(e)}
                        /> :
                        <Home
                            screen={screen}
                        />
                    }
                <Footer
                    onClick={(e) => handleScannerStatus(e)}
                />
            </SafeAreaView>
    );
}
