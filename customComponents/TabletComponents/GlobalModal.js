import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import SearchTemplate from "./SearchTemplate";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Footer from "../Footer";

// Supabase client initialization
const supabaseUrl = "https://shvutlcgljqiidqxqrru.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodnV0bGNnbGpxaWlkcXhxcnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTM2NDgsImV4cCI6MjA2MTQ4OTY0OH0.UXJKk6iIyaVJsohEB6CwwauC21YPez1xwsOFy9qa34Q"; // Make sure to use the correct key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function GlobalModal({
  screen,
  isLandscape,
  modalStatus,
  onPress,
  onClick,
}) {
  const [participants, setParticipants] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const deviceWidth = Dimensions.get("window").width;
  const limit = deviceWidth < 400 ? 10 : 20;
  const { width, height } = useWindowDimensions();

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
        console.error("Fetch error:", res17.error || res24.error);
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

  const handleSelectuserrow = (i) => {
    setSelectedRow([i]);
  };

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
      const trimmed = debouncedSearchTerm.trim();

      if (trimmed === "") {
        // If input is empty, reset to recent logins
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
            console.error("Fetch error:", res17.error || res24.error);
            return;
          }

          const combined = [...res17.data, ...res24.data].sort(
            (a, b) => new Date(b.latest_timein) - new Date(a.latest_timein)
          );

          setParticipants(combined.slice(0, limit));
        };

        if (trimmed === "") {
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
            console.error("Reset fetch error:", res17.error || res24.error);
          } else {
            const combined = [...res17.data, ...res24.data].sort(
              (a, b) =>
                new Date(b.latest_timein ?? 0) - new Date(a.latest_timein ?? 0)
            );
            setParticipants(combined.slice(0, limit));
          }

          return;
        }

        if (error) {
          console.error("Reset fetch error:", error.message);
        } else {
          setParticipants(data);
        }

        return; // ⛔ skip the search logic
      }

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
      } else {
        const combined = [...res17.data, ...res24.data].sort(
          (a, b) =>
            new Date(b.latest_timein ?? 0) - new Date(a.latest_timein ?? 0)
        );
        setParticipants(combined.slice(0, limit));
      }

      if (error) {
        console.error("Search error:", error.message);
      } else {
        setParticipants(data);
      }
    };

    search();
  }, [debouncedSearchTerm]);

  const refreshParticipants = async () => {
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
      console.error("Refresh error:", res17.error || res24.error);
    } else {
      const combined = [...res17.data, ...res24.data].sort(
        (a, b) =>
          new Date(b.latest_timein ?? 0) - new Date(a.latest_timein ?? 0)
      );
      setParticipants(combined.slice(0, limit));
      setSearchTerm("");
      setSelectedRow([]);
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={modalStatus}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <SearchTemplate
            setSearchTerm={(e) => setSearchTerm(e)}
            searchTerm={searchTerm}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow} // ✅ Add this
            participants={participants}
            handleSelectuserrow={(i) => handleSelectuserrow(i)}
          />
          <Footer
            onClick={(e) => onClick(e)}
            onPress={() => onPress(!modalStatus)}
          />
          <Pressable
            style={{
              zIndex: 9,
              position: "absolute",
              bottom: 100,
              left: 50,
              backgroundColor: "#0035E6",
              padding: 20,
              borderRadius: 1000,
              elevation: 5,
              shadowColor: "#000",
            }}
            onPress={refreshParticipants}
          >
            <MaterialCommunityIcons name="refresh" size={24} color="#ffffff" />
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
