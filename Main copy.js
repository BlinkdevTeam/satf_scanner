import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, useWindowDimensions } from 'react-native';
import Intro from './customComponents/Intro';
import Header from './customComponents/Header';
import Footer from './customComponents/Footer';
import Scanner from './customComponents/Scanner';
import ScanSuccess from './customComponents/ScanSuccess';
import TaptoScan from './customComponents/TaptoScan';
import Home from './customComponents/Home';
import Loader from './customComponents/Loader';
import ScanFailed from './customComponents/ScanFailed';
import MobileHeader from './customComponents/Header/MobileHeader';
import LandscapeTabletHeader from './customComponents/Header/TabletHeader/LandscapeTabletHeader';
// import Spinner from 'react-native-spinkit';


export default function Main() {
    const [screen, setScreen] = useState("home");
    const [isLoading, setIsLoading] = useState(false);
    const [scannedUser, setScannedUser] = useState(null);
    const [isLogin, setIslogin] = useState(false);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const isTablet = Math.min(width, height) >= 600;
    const deviceWidth = Dimensions.get("window").width

    console.log( 'isTablet:', isTablet )
    console.log( 'isLanscape:', isLandscape )
    const handleScannerStatus = (e) => {
        setTimeout(() => {
            setIsLoading(false);
            setScreen(e.trigger);
            setScannedUser(e.firstName);
            setIslogin(e.isLogin);
        }, 1000);
    };

    const handleFooterNav = (e) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setScreen(e.trigger);
        }, 1000);
    };

    const renderContent = () => {
        if (isLoading) return <Loader />;
        switch (screen) {
            case "in":
            case "out":
                return <Scanner screen={screen} onClick={handleScannerStatus} />;
            case "timeinSuccess":
            case "timeoutSuccess":
                return <ScanSuccess user={scannedUser} screen={screen} onClick={handleScannerStatus} />;
            case "timeinFailed":
                return <ScanFailed screen={screen} onClick={handleScannerStatus} />;
            default:
                return <Home 
                        screen={screen} 
                        isTablet={isTablet}
                    />;
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#08312A' }}>
            <StatusBar style="light" />
            {
                !isTablet ?
                    <>
                        <Header screen={screen} />
                        {renderContent()}
                        <Footer onClick={handleFooterNav} />
                    </>
                    : (
                        isLandscape ? (
                            <>
                                <View 
                                    style={{flex: 1, flexDirection: 'row'}}    
                                >
                                    {renderContent()}
                                    <LandscapeTabletHeader 
                                        isTablet={isTablet}
                                        screen={screen} 
                                    />
                                </View>
                                <Footer onClick={handleFooterNav} />
                            </>
                        ) : (
                            <>
                                <Header screen={screen} />
                                {renderContent()}
                                <Footer onClick={handleFooterNav} />
                            </>
                        )
                    )
            }
        </SafeAreaView>
    );
}

