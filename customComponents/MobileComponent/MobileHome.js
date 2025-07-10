import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import HomeTemplate from "./HomeTemplate";

// Supabase client initialization
const supabaseUrl = "https://shvutlcgljqiidqxqrru.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodnV0bGNnbGpxaWlkcXhxcnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM2NDgsImV4cCI6MjA2MTQ4OTY0OH0.UXJKk6iIyaVJsohEB6CwwauC21YPez1xwsOFy9qa34Q"; // Make sure to use the correct key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function MobileHome({ screen, isLandscape }) {
  const [participants, setParticipants] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const deviceWidth = Dimensions.get("window").width;
  const limit = deviceWidth < 400 ? 10 : 20;

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

  // Initial fetch (latest_timein sorted)
  useEffect(() => {
    const fetchParticipants = async () => {
      const [res17, res24] = await Promise.all([
        supabase
          .from("satf_participant_onsite_17")
          .select("*")
          .not("latest_timein", "is", null),
        supabase
          .from("satf_participant_onsite_24")
          .select("*")
          .not("latest_timein", "is", null),
      ]);

      if (res17.error || res24.error) {
        console.error("Initial fetch error:", res17.error || res24.error);
        return;
      }

      const combined = [...res17.data, ...res24.data].sort(
        (a, b) =>
          new Date(b.latest_timein ?? 0) - new Date(a.latest_timein ?? 0)
      );

      setParticipants(combined.slice(0, limit));
    };

    fetchParticipants();
  }, []);

  // Search effect
  useEffect(() => {
    const search = async () => {
      const trimmed = debouncedSearchTerm.trim();
      if (trimmed === "") {
        // Optional: reload default list
        const [res17, res24] = await Promise.all([
          supabase
            .from("satf_participant_onsite_17")
            .select("*")
            .not("latest_timein", "is", null),
          supabase
            .from("satf_participant_onsite_24")
            .select("*")
            .not("latest_timein", "is", null),
        ]);

        if (res17.error || res24.error) {
          console.error(
            "Reset search fetch error:",
            res17.error || res24.error
          );
          return;
        }

        const combined = [...res17.data, ...res24.data].sort(
          (a, b) =>
            new Date(b.latest_timein ?? 0) - new Date(a.latest_timein ?? 0)
        );

        setParticipants(combined.slice(0, limit));
        return;
      }

      // Search both tables
      const [res17, res24] = await Promise.all([
        supabase
          .from("satf_participant_onsite_17")
          .select("*")
          .or(
            `first_name.ilike.%${trimmed}%,last_name.ilike.%${trimmed}%,email.ilike.%${trimmed}%`
          ),
        supabase
          .from("satf_participant_onsite_24")
          .select("*")
          .or(
            `first_name.ilike.%${trimmed}%,last_name.ilike.%${trimmed}%,email.ilike.%${trimmed}%`
          ),
      ]);

      if (res17.error || res24.error) {
        console.error("Search error:", res17.error || res24.error);
        return;
      }

      const combined = [...res17.data, ...res24.data].sort(
        (a, b) =>
          new Date(b.latest_timein ?? 0) - new Date(a.latest_timein ?? 0)
      );

      setParticipants(combined.slice(0, limit));
    };

    search();
  }, [debouncedSearchTerm]);

  const handleSelectUserRow = (i) => {
    setSelectedRow([i]);
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <HomeTemplate
          setSearchTerm={(e) => setSearchTerm(e)}
          searchTerm={searchTerm}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow} // ✅ <-- add this line
          participants={participants}
          handleSelectuserrow={(i) => handleSelectUserRow(i)}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
