import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import SingleParticipant from "../SingleParticipant";

export default function HomeTemplate(props) {
  const textColor = "#ffffff";
  console.log("searchTerm:", props.searchTerm);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Name or Email"
          placeholderTextColor="#888"
          value={props.searchTerm}
          onChangeText={(e) => props.setSearchTerm(e)}
        />
      </View>

      {/* Selected User List or Recent Logins */}
      {props.selectedRow.length > 0 ? (
        props.selectedRow.map((user, index) => (
          <SingleParticipant
            key={`participant-${index}`}
            index={index}
            user={user}
            onClose={() => props.setSelectedRow([])} // ✅ Clear selected row
          />
        ))
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={styles.headerText}>
            {props.searchTerm
              ? `Result for ${props.searchTerm}`
              : "Recent Logs"}
          </Text>

          <View style={{ width: "100%" }}>
            {props.participants?.length > 0 ? (
              props.participants.map((i, index) => (
                <Pressable
                  key={index}
                  onPress={() => props.handleSelectuserrow(i)}
                >
                  <View style={styles.participantItem}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.text, styles.nameText]}>
                        {i.full_name_upper}
                      </Text>
                      <Text style={styles.text}>{i.email}</Text>
                    </View>
                    <View style={styles.logs}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.text}>
                          Time In: {i.formatted_timein || "—"}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.text}>
                          Time Out: {i.formatted_timeout || "—"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              <Text style={styles.text}>No recent logins found.</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#transparent",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchWrapper: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 20,
  },
  searchInput: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    borderColor: "#00e47c",
    borderWidth: 1,
    fontSize: 16,
    width: "100%",
  },
  resultsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  participantItem: {
    backgroundColor: "#174e35",
    paddingVertical: 10,
    flexDirection: "column", // 👈 Change from "row" to "column" to stack content
    alignItems: "flex-start", // 👈 Align everything to the left
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    width: "100%", // optional, to ensure full width
  },
  logs: {
    alignItems: "flex-start", // 👈 Align logs to left
    justifyContent: "flex-start",
    marginTop: 5, // optional spacing
    width: "100%", // optional, ensures child views are full width
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
  },
  nameText: {
    fontWeight: "700", // or use "bold"
    fontSize: 14, // slightly larger if needed
  },
});
