import { StyleSheet, Text, View, Image } from 'react-native';

export default function SingleParticipant({user, index}) {
    
    const textColor = '#00e47c';

    return (
        <View 
            style={{
                width: "100%",
                alignItems: "left",
                paddingBottom: 50,
                marginTop: -100
        }}>
            <View style={{ gap: 10 }}>
                {/* Name Row */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSyle}>Name: </Text>
                    <Text style={{ color: textColor }}>
                    {user.first_name} {user.last_name}
                    </Text>
                </View>

                {/* Email */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSyle}>Email: </Text>
                    <Text style={{ color: textColor }}>{user.email_address}</Text>
                </View>

                {/* Date Registered */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSyle}>Date Registered: </Text>
                    <Text style={{ color: textColor }}>
                    {new Date(user.created_at).toLocaleString()}
                    </Text>
                </View>

                {/* PRC License */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSyle}>PRC License: </Text>
                    <Text style={{ color: textColor }}>{user.prc_license}</Text>
                </View>

                {/* Time In */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSyle}>Time In: </Text>
                    <Text style={{ color: textColor }}>
                    {user.time_in !== null ? new Date(user.time_in).toLocaleString() : "N/A"}
                    </Text>
                </View>

                {/* Time Out */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSyle}>Time Out: </Text>
                    <Text style={{ color: textColor }}>
                    {user.time_out !== null ? new Date(user.time_out).toLocaleString() : "N/A"}
                    </Text>
                </View>

                {/* Clinic */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSyle}>Clinic: </Text>
                    <Text style={{ color: textColor }}>{user.clinic}</Text>
                </View>

                {/* Address */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textSyle}>Address: </Text>
                    <Text style={{ color: textColor }}>{user.address}</Text>
                </View>
                </View>

        </View>
    )
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08312A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
textSyle: {
    color: "#00e47c",
    fontWeight: 700,
    fontSize: 16,
}
});
