import { StyleSheet, Text, View } from "react-native";

export default function SingleParticipant({ user }) {
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
      {renderRow("Name:", `${user.first_name} ${user.last_name}`)}
      {renderRow("Email:", user.email)}
      {renderRow(
        "Date Registered:",
        new Date(user.created_at).toLocaleDateString()
      )}
      {renderRow("Time In:", formatTime(user.time_in))}
      {renderRow("Time Out:", formatTime(user.time_out))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    gap: 8,
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
