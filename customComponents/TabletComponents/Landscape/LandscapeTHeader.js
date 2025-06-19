import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import ICONLOGO from "../../../assets/SATF_LOGO.png";
import LOGO from "../../../assets/SATF_LOGO_2.png";
import SATFBG from "../../../assets/SATF_BG2.png";
import { Video } from "expo-av";
import BG_VIDEO from "../../../assets/DESKTOP.mp4"; // adjust path as needed

export default function LandscapeTHeader({ screen }) {
  const deviceWidth = Dimensions.get("window").width;

  return (
    <View
      style={[
        styles.container,
        {
          height: screen === "home" ? "100%" : null,
          paddingTop: screen === "home" ? 0 : 20,
          paddingBottom: 0,
        },
      ]}
    >
      {/* {screen === "home" && (
        <Image
          source={SATFBG}
          style={{
            opacity: 1,
            width: "100%",
            position: "absolute",
            height: screen === "home" ? "100%" : 40,
            resizeMode: "cover",
          }}
        />
      )} */}
      {screen === "home" && (
        <Video
          source={BG_VIDEO}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{
            opacity: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
            // zIndex: -1,
          }}
        />
      )}

      <View
        style={{
          flexDirection: screen === "home" ? "column" : "row",
          justifyContent: screen === "home" ? "space-between" : "center",
          width: screen === "home" ? "100%" : "80%",
          alignItems: "center",
          gap: 0, // gap should be a number, not string
        }}
      >
        <Image
          source={LOGO}
          style={[
            styles.imageStyle,
            {
              width: "90%",
              height: screen === "home" ? 30 : 40,
            },
          ]}
        />
        <Image
          source={ICONLOGO}
          style={[
            styles.imageStyle,
            {
              width: "90%",
              height: screen === "home" ? 350 : 40,
              marginTop: "50",
            },
          ]}
        />

        {screen === "home" && (
          <>
            <View style={{ alignItems: "center", gap: 10, marginTop: 50 }}>
              <Text style={[styles.monosansText, { marginBottom: 25 }]}>
                JULY 17 & 24, 2025 | 8:00 AM - 5:00 PM
              </Text>
              <Text style={[styles.monosansText, { letterSpacing: 0 }]}>
                Crimson Hotel, Alabang, Muntinlupa City
              </Text>
            </View>

            <View
              style={{
                paddingTop: 50,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={styles.lifeForwardText}>Life Forward</Text> */}
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imageStyle: {
    resizeMode: "contain",
  },
  monosansText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "Monosans",
    lineHeight: 24,
    letterSpacing: 9,
  },
});
