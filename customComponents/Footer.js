import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Footer({ onClick }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableStyle}
        onPress={() => onClick({ trigger: "home" })}
      >
        <Ionicons name="home" size={24} color="#FEC205" />
        <Text style={{ fontSize: 10, color: "#fff", fontWeight: "normal" }}>
          Home
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressableStyle}
        onPress={() => onClick({ trigger: "in" })}
      >
        <MaterialCommunityIcons name="login" size={24} color="#3EAD35" />
        <Text style={{ fontSize: 10, color: "#fff", fontWeight: "normal" }}>
          Time In
        </Text>
      </Pressable>
      <Pressable
        style={styles.pressableStyle}
        onPress={() => onClick({ trigger: "out" })}
      >
        <MaterialCommunityIcons name="logout" size={24} color="#EF1748" />
        <Text style={{ fontSize: 10, color: "#fff", fontWeight: "normal" }}>
          Time Out
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00072C",
    flexDirection: "row",
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 40,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0, // ensures it stretches fully
    zIndex: 1000, // ensures it stays on top
  },
  buttonText: {
    fontSize: 11,
  },
  pressableStyle: {
    textAlign: "center", // Works for Text components
    alignItems: "center",
  },
});
