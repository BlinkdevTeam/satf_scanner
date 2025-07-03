import { StyleSheet, Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function SingleParticipant({ user, onClose }) {
  const formatTime = (value) => {
    return value
      ? new Date(value).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";
  };

  const renderRow = (label, content, isRow = false) => (
    <View style={[styles.infoBlock, isRow && styles.row]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <Pressable style={styles.closeBtn} onPress={onClose}>
        <MaterialCommunityIcons name="close" size={20} color="#fff" />
      </Pressable>

      {renderRow("Name:", `${user.first_name} ${user.last_name}`)}
      {renderRow("Email:", user.email)}
      {renderRow(
        "Date Registered:",
        new Date(user.created_at).toLocaleDateString()
      )}
      {renderRow("Time In:", user.formatted_timein)}
      {renderRow("Time Out:", user.formatted_timeout)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#00072C",
    borderRadius: 12,
    padding: 12,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
    zIndex: 1,
  },
  infoBlock: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  label: {
    color: "#ffffff",
    fontWeight: "300",
    fontSize: 14,
    marginBottom: 2,
  },
  value: {
    fontWeight: "700",
    color: "#ffffff",
    fontSize: 18,
  },
});
