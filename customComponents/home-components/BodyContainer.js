import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { createClient } from '@supabase/supabase-js';
import { Pressable } from 'react-native';
import SingleParticipant from './mobile/SingleParticpant';
import TabletSingleParticipant from './tablet/SingleParticpant';

// Supabase client initialization
const supabaseUrl = 'https://shvutlcgljqiidqxqrru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodnV0bGNnbGpxaWlkcXhxcnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM2NDgsImV4cCI6MjA2MTQ4OTY0OH0.UXJKk6iIyaVJsohEB6CwwauC21YPez1xwsOFy9qa34Q'; // Make sure to use the correct key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function BodyContainer(props) {
    const textColor = '#00e47c';
      
    return (
        <View style={styles.container}>
            <View style={{
                width: "100%",
                alignItems: "center",
                paddingBottom: 50,
                paddingTop: 20
             }}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Name or Email"
                    placeholderTextColor="#888"
                    value={props.searchTerm}
                    onChangeText={(e) => props.setSearchTerm(e)}
                />
            </View>
            {
                props.selectedRow.length > 0 ? 
                props.selectedRow.map((user, index) => (
                    <SingleParticipant
                        key={`participant-${index}`}
                        index={index}
                        user={user}
                    />
                )) :
                <View style={{
                    width: "100%",
                    alignItems: "center",
                    paddingBottom: 50,
                    paddingTop: 20
                }}>
                    <Text
                        style={{
                            color: textColor,
                            fontWeight: 700,
                            fontSize: 16,
                        }}
                    >
                        {props.searchTerm ? `Result for ${props.searchTerm}` : "Recent Log Ins"}
                    </Text>
                    <DataTable>
                        <DataTable.Header
                            style={{
                                backgroundColor: '#08312A',
                                borderBottomWidth: .2,
                                borderBottomColor: '#1a754c',
                            }}
                        >
                            <DataTable.Title textStyle={{ color: textColor }}>Email</DataTable.Title>
                            <DataTable.Title textStyle={{ color: textColor }}>Time in</DataTable.Title>
                        </DataTable.Header>
    
                        {
                            props.participants?.length > 0 ? props.participants.map((i, index) => (
                                <Pressable key={index} onPress={() => props.handleSelectuserrow(i)}>
                                    <DataTable.Row
                                        style={{
                                            backgroundColor: '#08312A',
                                            borderBottomWidth: .2,
                                            borderBottomColor: '#1a754c',
                                        }}
                                    >
                                            <DataTable.Cell style={{ flex: 1 }}>
                                                <Text style={{ color: textColor }}>{i.email_address}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell style={{ flex: 1 }}>
                                                <Text style={{ color: textColor }}>{new Date(i.time_in).toLocaleString()}</Text>
                                            </DataTable.Cell>
                                    </DataTable.Row>
                                </Pressable>
                            )) :
                            <DataTable.Row
                                style={{
                                    backgroundColor: '#08312A',
                                    borderBottomWidth: .2,
                                    borderBottomColor: '#1a754c',
                                }}
                            >
                                <DataTable.Cell><Text style={{ color: textColor }}>-</Text></DataTable.Cell>
                                <DataTable.Cell><Text style={{ color: textColor }}>-</Text></DataTable.Cell>
                            </DataTable.Row>
                        }
                    </DataTable>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08312A',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20
    },
    searchInput: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 10,
        color: '#fff',
        marginBottom: 10,
        borderColor: '#00e47c',
        borderWidth: 1,
        width: '100%'
    },
    textSyle: {
        color: "#00e47c",
        fontWeight: 700,
        fontSize: 16,
    }
});