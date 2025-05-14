import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, useWindowDimensions } from 'react-native';
import Header from '../Header';
import Footer from '../Footer';
import Scanner from '../Scanner';
import ScanSuccess from '../ScanSuccess';
import Loader from '../Loader';
import ScanFailed from '../ScanFailed';
import TabletHeader from '../../Header/TabletHeader';
// import Spinner from 'react-native-spinkit';


export default function TabletLandscape() {
    const [screen, setScreen] = useState("home");
    const [isLoading, setIsLoading] = useState(false);
    const [scannedUser, setScannedUser] = useState(null);
    const [isLogin, setIslogin] = useState(false);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const isTablet = Math.min(width, height) >= 600;
    const deviceWidth = Dimensions.get("window").width

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
                return <></>
        }
    };

    return (
            <>
                <TabletHeader screen={screen} />
                {renderContent()}
                <Footer onClick={handleFooterNav} />
            </>
    );
}

