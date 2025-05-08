import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import Intro from './customComponents/Intro';
import Header from './customComponents/Header';
import Footer from './customComponents/Footer';
import Scanner from './customComponents/Scanner';
import ScanSuccess from './customComponents/ScanSuccess';
import TaptoScan from './customComponents/TaptoScan';
import Home from './customComponents/Home';
import Loader from './customComponents/Loader';
import ScanFailed from './customComponents/ScanFailed';
// import Spinner from 'react-native-spinkit';


export default function Main() {
    const [screen, setScreen] = useState("home")
    const [isLoading, setIsLoading] = useState(false);
    const [scannedUser, setScannedUser] = useState(null);
    const [isLogin, setIslogin] = useState(false);
    const deviceWidth = Dimensions.get("window").width;

    const handleScannerStatus = (e) => {
        setTimeout(() => {
            setIsLoading(false);
            setScreen(e.trigger);
            setScannedUser(e.firstName)
            setIslogin(e.isLogin)
        }, 1000);
        // setScanning(true)
    }

    const handleFooterNav = (e) => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false);
            setScreen(e.trigger);
        }, 1000);
    }

    console.log("screen", screen)

    return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#08312A' }}>
                <StatusBar style="light" />
                <Header screen={screen}/>
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
                    screen === "timeinFailed" ?
                        <ScanFailed
                            screen={screen}
                            onClick={(e) => handleScannerStatus(e)}
                        /> :
                        <Home
                            screen={screen}
                        />
                    }
                <Footer
                    onClick={(e) => handleFooterNav(e)}
                />
            </SafeAreaView>
    );
}
