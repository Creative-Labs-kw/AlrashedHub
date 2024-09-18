import React, { useState, useCallback } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";

type SearchBarProps = {
  onSearch: (query: string) => void;
  suggestions: string[]; // List of suggestions
  onSuggestionSelect: (suggestion: string) => void; // Callback when a suggestion is selected
};

const SearchBar = ({
  onSearch,
  suggestions,
  onSuggestionSelect,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (text: string) => {
      setQuery(text);
      onSearch(text);
    },
    [onSearch]
  );

  const handleSuggestionSelect = (suggestion: string) => {
    setQuery(suggestion);
    onSuggestionSelect(suggestion);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        value={query}
        onChangeText={handleChange}
        style={styles.input}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSuggestionSelect(item)}
              style={styles.suggestion}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.suggestionsList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: Colors.light.tint,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 150, // Limit height to make it scrollable
    backgroundColor: "#fff",
  },
  suggestion: {
    padding: 10,
  },
});

export default SearchBar;
