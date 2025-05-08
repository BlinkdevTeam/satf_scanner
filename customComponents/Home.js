import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions } from 'react-native';
import { DataTable } from 'react-native-paper';
import { createClient } from '@supabase/supabase-js';
import { Pressable } from 'react-native';
import BodyContainer from './home-components/mobile/BodyContainer';
import TabletBodyContainer from './home-components/tablet/BodyContainer';

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
    const deviceWidth = Dimensions.get("window").width
    const limit = deviceWidth < 400 ? 10 : 20

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
      


    return deviceWidth < 400 ? (
        <BodyContainer
            setSearchTerm={e => setSearchTerm(e)}
            searchTerm={searchTerm}
            selectedRow={selectedRow}
            participants={participants}
            handleSelectuserrow={i => handleSelectuserrow(i)}
        />
    ) :
    (
        <TabletBodyContainer
            setSearchTerm={e => setSearchTerm(e)}
            searchTerm={searchTerm}
            selectedRow={selectedRow}
            participants={participants}
            handleSelectuserrow={i => handleSelectuserrow(i)}
        />
    )
}
