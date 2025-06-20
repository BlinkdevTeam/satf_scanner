import {
  useWindowDimensions,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Video } from "expo-av";
import MobileComponent from "./customComponents/MobileComponent/MobileComponent";
import TabletComponent from "./customComponents/TabletComponents/TabletComponent";

const BG_VIDEO = require("./assets/TABLET.mp4"); // ✅ adjust the path if needed

export default function Main() {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;

  return (
    <View style={styles.container}>
      {/* 🎥 Background Video */}
      <Video
        source={BG_VIDEO}
        isMuted
        shouldPlay
        isLooping
        resizeMode="cover"
        useNativeControls={false}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Foreground Content */}
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "light-content" : "default"}
        />
        {isTablet ? <TabletComponent /> : <MobileComponent />}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#000", // fallback in case video fails
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent", // allow video to show behind
  },
});
