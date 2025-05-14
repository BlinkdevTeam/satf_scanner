import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, useWindowDimensions } from 'react-native';
import MobileHeader from './MobileHeader';
import MobileHome from './MobileHome';
import Footer from '../Footer';
import Scanner from '../Scanner';
import ScanSuccess from '../ScanSuccess';
import Loader from '../Loader';
import ScanFailed from '../ScanFailed';
// import Spinner from 'react-native-spinkit';


export default function MobileComponent() {
    const [screen, setScreen] = useState("home");
    const [isLoading, setIsLoading] = useState(false);
    const [scannedUser, setScannedUser] = useState(null);
    const { width, height } = useWindowDimensions();
    const isTablet = Math.min(width, height) >= 600;
    // const [isLogin, setIslogin] = useState(false);
    // const isLandscape = width > height;
    // const deviceWidth = Dimensions.get("window").width

    const handleScannerStatus = (e) => {
        // setTimeout(() => {
            console.log("eeee", e)
            setIsLoading(false);
            setScreen(e.trigger);
            setScannedUser(e.firstName);
            // setIslogin(e.isLogin);
        // }, 1000);
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
            case "timeoutFailed":
                return <ScanFailed screen={screen} onClick={handleScannerStatus} />;
            default:
                return <MobileHome 
                        screen={screen} 
                        isTablet={isTablet}
                    />;
        }
    };

    return (
            <>
                <MobileHeader screen={screen} />
                {renderContent()}
                <Footer onClick={handleFooterNav} />
            </>
    );
}

