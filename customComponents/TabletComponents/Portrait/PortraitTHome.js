import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, useWindowDimensions, KeyboardAvoidingView, ScrollView, Modal, Pressable } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import HomeTemplate from '../HomeTemplate';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SideModal from '../../SideModal';


// Supabase client initialization
const supabaseUrl = 'https://shvutlcgljqiidqxqrru.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodnV0bGNnbGpxaWlkcXhxcnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM2NDgsImV4cCI6MjA2MTQ4OTY0OH0.UXJKk6iIyaVJsohEB6CwwauC21YPez1xwsOFy9qa34Q'; // Make sure to use the correct key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PortraitTHome({screen, isLandscape, modalStatus, onPress}) {
    const [participants, setParticipants] = useState(null);
    const [selectedRow, setSelectedrow] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const deviceWidth = Dimensions.get("window").width
    const limit = deviceWidth < 400 ? 10 : 20
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        (async () => {

            const { data, error } = await supabase
                .from('medical_professionals')
                .select('*')
                .not('time_in', 'is', null) // exclude rows where time_in is null
                .order('time_in', { ascending: false })
                .limit(limit);
            
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
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior='position'>
            <Modal transparent={true} animationType="slide" visible={modalStatus}>
                <HomeTemplate
                    setSearchTerm={e => setSearchTerm(e)}
                    searchTerm={searchTerm}
                    selectedRow={selectedRow}
                    participants={participants}
                    handleSelectuserrow={i => handleSelectuserrow(i)}
                />
                <Pressable 
                    style={{
                        zIndex: 9,
                        position: 'absolute',
                        bottom: 100,
                        right: 50,
                        backgroundColor: "#08312A",
                        padding: 20,
                        borderRadius: 1000, // optional, makes it circular
                        elevation: 5, // for Android shadow
                        shadowColor: '#000', // for iOS shadow
                    }} 
                    onPress={() => onPress(!modalStatus)}
                    >
                    <MaterialCommunityIcons name="close" size={24} color="#ffffff" />
                </Pressable>
            </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    ) 
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
});
