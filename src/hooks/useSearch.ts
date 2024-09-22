import { useMemo, useState } from "react";

// Make the type constraint more flexible, allowing any shape of object,
// but ensure that the value at searchKey is a string.
export const useSearch = <T extends Record<string, any>>(
    data: T[] | undefined,
    searchKey: keyof T & string, // Ensure searchKey is a valid key of T that holds a string
) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Filter data based on the search query
    const filteredData = useMemo(() => {
        if (!data) return [];
        const lowerCaseQuery = searchQuery.toLowerCase();
        return data.filter((item) => {
            const value = item[searchKey];
            if (typeof value === "string") {
                return value.toLowerCase().includes(lowerCaseQuery);
            }
            return false;
        });
    }, [searchQuery, data, searchKey]);

    // Generate suggestions based on the search query
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.length > 0 && data) {
            const lowerCaseQuery = query.toLowerCase();
            const newSuggestions = data
                .filter((item) => {
                    const value = item[searchKey];
                    return typeof value === "string" &&
                        value.toLowerCase().includes(lowerCaseQuery);
                })
                .map((item) => item[searchKey] as string);
            setSuggestions(Array.from(new Set(newSuggestions))); // Remove duplicates
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionSelect = (suggestion: string) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
    };

    return {
        searchQuery,
        suggestions,
        handleSearch,
        handleSuggestionSelect,
        filteredData,
    };
};
