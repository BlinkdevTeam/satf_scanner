import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import SingleParticipant from "../SingleParticipant";

export default function SearchTemplate(props) {
  const textColor = "#ffffff";
  console.log("searchTerm:", props.searchTerm);

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Find user by name or email"
          placeholderTextColor="#fff"
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
            onClose={() => props.setSelectedRow([])}
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
                    <View style={{ flex: 1, gap: 8 }}>
                      <Text
                        style={[
                          styles.text,
                          { textTransform: "uppercase", fontWeight: "700" },
                        ]}
                      >
                        {i.full_name_upper}
                      </Text>
                      <Text style={styles.text}>{i.email}</Text>
                    </View>
                    <View style={styles.logs}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.text}>
                          Time In: {i.formatted_timein}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.text}>
                          Time Out: {i.formatted_timeout}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))
            ) : (
              <Text style={[styles.text, { color: "#EF1748" }]}>
                No recent logins found.
              </Text>
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
    width: "100%",
    backgroundColor: "#FEF9DB",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
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
    borderColor: "#0035E6",
    borderWidth: 1,
    fontSize: 18,
    width: "100%",
  },
  resultsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  participantItem: {
    backgroundColor: "#174e35",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
  },
  logs: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
