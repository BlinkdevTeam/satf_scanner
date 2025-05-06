import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';
import { createClient } from '@supabase/supabase-js';
import { Pressable } from 'react-native';
import SingleParticipant from './home-components/SingleParticpant';

// Supabase client initialization
const supabaseUrl = 'https://shvutlcgljqiidqxqrru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodnV0bGNnbGpxaWlkcXhxcnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM2NDgsImV4cCI6MjA2MTQ4OTY0OH0.UXJKk6iIyaVJsohEB6CwwauC21YPez1xwsOFy9qa34Q'; // Make sure to use the correct key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
    const [participants, setParticipants] = useState(null);
    const [selectedRow, setSelectedrow] = useState([])
    const textColor = '#00e47c';
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);


    useEffect(() => {
        (async () => {

            const { data, error } = await supabase
                .from('medical_professionals')
                .select('*')
                .not('time_in', 'is', null) // exclude rows where time_in is null
                .order('time_in', { ascending: false })
                .limit(10);
            
            if (error || !data) {
                console.error("Fetch error:", error);
                return;
            }
            
            setParticipants(data)
        })();
    }, []);

    const handleSelectuserrow = (i) => {
        setSelectedrow([i])
    }

    const useDebounce = (value, delay = 300) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
      
        useEffect(() => {
          const handler = setTimeout(() => {
            setDebouncedValue(value);
          }, delay);
      
          return () => clearTimeout(handler);
        }, [value, delay]);
      
        return debouncedValue;
      };
    
      const debouncedSearchTerm = useDebounce(searchTerm, 300);

      useEffect(() => {
        const search = async () => {
          if (debouncedSearchTerm.trim() === '') {
            setParticipants([]); // or skip fetching
            return;
          }
      
          const { data, error } = await supabase
            .from('medical_professionals')
            .select('*')
            .or(
              `first_name.ilike.%${debouncedSearchTerm}%,middle_name.ilike.%${debouncedSearchTerm}%,last_name.ilike.%${debouncedSearchTerm}%,email_address.ilike.%${debouncedSearchTerm}%`
            );
      
          if (error) {
            console.error('Search error:', error.message);
          } else {
            setParticipants(data);
          }
        };
      
        search();
      }, [debouncedSearchTerm]);
      


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
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            {
                selectedRow.length > 0 ? 
                selectedRow.map((user, index) => (
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
                        {searchTerm ? `Result for ${searchTerm}` : "Recent Log Ins"}
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
                            participants?.length > 0 ? participants.map((i, index) => (
                                <Pressable key={index} onPress={() => handleSelectuserrow(i)}>
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