import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import ICONLOGO from "../../../assets/SATF_LOGO.png";
import LOGO from "../../../assets/SATF_LOGO_2.png";

export default function LandscapeTHeader({ screen }) {
  return (
    <View
      style={[
        styles.container,
        {
          height: screen === "home" ? "100%" : undefined,
          paddingTop: screen !== "home" ? 20 : 0,
          paddingBottom: 0,
        },
      ]}
    >
      {/* ✅ Background is handled by parent - no local <Video> or <Image> */}

      <View
        style={{
          flexDirection: screen === "home" ? "column" : "row",
          justifyContent: screen === "home" ? "space-between" : "center",
          width: screen === "home" ? "100%" : "80%",
          alignItems: "center",
          gap: 0,
          backgroundColor: "transparent", // ✅ keep everything transparent
        }}
      >
        <Image
          source={LOGO}
          style={[
            styles.imageStyle,
            {
              width: "90%",
              height: screen === "home" ? 80 : 40,
            },
          ]}
        />
        <Text
          style={{
            fontFamily: "MonosansSemiBoldItalic",
            fontSize: 30,
            marginTop: 50,
            color: "#fff",
          }}
        >
          Shaping the Future of Livestock Innovation.
        </Text>

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
              {/* Optional text area */}
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
    backgroundColor: "transparent", // ✅ important!
  },
  imageStyle: {
    resizeMode: "contain",
  },
  monosansText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "Monosans",
    lineHeight: 24,
    letterSpacing: 9,
    textAlign: "center",
  },
});
