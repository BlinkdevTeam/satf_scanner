import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import SingleParticipant from '../SingleParticipant';


export default function HomeTemplate(props) {
    const textColor = '#ffffff';
    console.log('searchTerm:', props.searchTerm);

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
                    />
                ))
            ) : (
                <View style={styles.resultsContainer}>
                    <Text style={styles.headerText}>
                        {props.searchTerm ? `Result for ${props.searchTerm}` : "Recent Logs"}
                    </Text>

                    <View style={{ width: '100%' }}>
                        {props.participants?.length > 0 ? (
                            props.participants.map((i, index) => (
                                <Pressable key={index} onPress={() => props.handleSelectuserrow(i)}>
                                    <View style={styles.participantItem}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.text}>{i.first_name} {i.last_name}</Text>
                                            <Text style={styles.text}>{i.email_address}</Text>
                                        </View>
                                        <View style={styles.logs}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text}>In: {new Date(i.time_in).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.text}>Out: {new Date(i.time_out).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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
        backgroundColor: '#08312A',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 100
    },
    searchWrapper: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 50,
        paddingTop: 20,
    },
    searchInput: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 10,
        color: '#fff',
        borderColor: '#00e47c',
        borderWidth: 1,
        fontSize: 28,
        width: '100%',
    },
    resultsContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 10,
    },
    participantItem: {
        backgroundColor: '#174e35',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderRadius: 10,
        padding: 15
    },
    text: {
        color: '#ffffff',
        fontSize: 14,
    },
    logs: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
});
