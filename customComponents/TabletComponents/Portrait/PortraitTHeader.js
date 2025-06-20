import { StyleSheet, Text, View, Image } from "react-native";
import ICONLOGO from "../../../assets/SATF_LOGO.png";
import LOGO from "../../../assets/SATF_LOGO_2.png";

export default function PortraitTHeader({ screen }) {
  return (
    <View style={[styles.container, screen === "home" && styles.homePadding]}>
      <View style={styles.contentWrapper}>
        <Image
          source={LOGO}
          style={[styles.imageStyle, { height: screen === "home" ? 100 : 40 }]}
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
          <View style={styles.textWrapper}>
            <Text style={[styles.monosansText, { fontSize: 22 }]}>
              JULY 17 & 24, 2025
            </Text>
            <Text style={styles.monosansText}>8:00 AM - 5:00 PM</Text>
            <Text style={[styles.monosansText, { letterSpacing: 0 }]}>
              Crimson Hotel, Alabang, Muntinlupa City
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    // ✅ Do NOT add backgroundColor here
  },
  homePadding: {
    paddingTop: 150,
  },
  contentWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    gap: 20,
    backgroundColor: "transparent", // ✅ ensures background stays see-through
  },
  imageStyle: {
    resizeMode: "contain",
    width: "90%",
  },
  textWrapper: {
    alignItems: "center",
    marginTop: 50,
    gap: 10,
    backgroundColor: "transparent", // ✅ keeps text block transparent
  },
  monosansText: {
    color: "#ffffff",
    paddingInline: 10,
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "Monosans",
    lineHeight: 24,
    letterSpacing: 9,
    textAlign: "center",
  },
});
