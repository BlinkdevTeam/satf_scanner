import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, useWindowDimensions, Pressable } from 'react-native';
import Footer from '../Footer';
import Scanner from '../Scanner';
import ScanSuccess from '../ScanSuccess';
import Loader from '../Loader';
import ScanFailed from '../ScanFailed';
import LandscapeTHeader from './Landscape/LandscapeTHeader';
import PortraitTHeader from './Portrait/PortraitTHeader';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import GlobalModal from './GlobalModal';
// import Spinner from 'react-native-spinkit';


export default function TabletComponent() {
    const [screen, setScreen] = useState("home");
    const [isLoading, setIsLoading] = useState(false);
    const [scannedUser, setScannedUser] = useState(null);
    const [modalStatus, setModalStatus] = useState(false)
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const isTablet = Math.min(width, height) >= 600;
    // const [isLogin, setIslogin] = useState(false);

    const handleScannerStatus = (e) => {
        // setTimeout(() => {
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
            setModalStatus(!modalStatus);
        }, 1000);
    };

    const renderContent = () => {
        if (isLoading) return <Loader />;
        switch (screen) {
            case "in":
            case "out":
                return <Scanner screen={screen} onClick={handleScannerStatus}/>;
            case "timeinSuccess":
            case "timeoutSuccess":
                return <ScanSuccess user={scannedUser} screen={screen} onClick={handleScannerStatus} />;
            case "timeinFailed":
            case "timeoutFailed":
                return <ScanFailed screen={screen} onClick={handleScannerStatus} />;
            default:
                return <></>
        }
    };

    const renderPortraitHeader = () => {
        switch (screen) {
            case "in":
            case "out":
            case "timeinSuccess":
            case "timeoutSuccess":
            case "timeinFailed":
                return <PortraitTHeader screen={"scanning"} />;
            default:
                return <PortraitTHeader screen={"home"} />
        }
    }

    const renderLanscapeHeader = () => {
        switch (screen) {
            case "in":
            case "out":
            case "timeinSuccess":
            case "timeoutSuccess":
            case "timeinFailed":
                return <LandscapeTHeader screen={"scanning"} />;
            default:
                return <LandscapeTHeader screen={"home"} />
        }
    }

    return (
      <>
        {isLandscape ? renderLanscapeHeader() : renderPortraitHeader()}
        {renderContent()}
        <GlobalModal
          screen={screen}
          isTablet={isTablet}
          modalStatus={modalStatus}
          onPress={() => setModalStatus(!modalStatus)}
          onClick={(e) => handleFooterNav(e)}
        />
        {
          <Pressable
            style={{
              zIndex: 9,
              position: "absolute",
              bottom: 120,
              right: 50,
              backgroundColor: "#3EAD35",
              padding: 20,
              borderRadius: 1000, // optional, makes it circular
              elevation: 5, // for Android shadow
              shadowColor: "#000", // for iOS shadow
            }}
            onPress={() => setModalStatus(!modalStatus)}
          >
            <MaterialCommunityIcons
              name="account-search"
              size={24}
              color="#00072C"
            />
          </Pressable>
        }
        <View style={{ width: "100%", height: 80 }}></View>
      </>
    );
}

