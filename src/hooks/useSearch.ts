// hooks/useSearch.ts
import { useMemo, useState } from "react";

export const useSearch = <T extends { [key: string]: string }>(
    data: T[] | undefined,
    searchKey: string,
) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // Filter data based on the search query
    const filteredData = useMemo(() => {
        if (!data) return [];
        const lowerCaseQuery = searchQuery.toLowerCase();
        return data.filter((item) =>
            item[searchKey].toLowerCase().includes(lowerCaseQuery)
        );
    }, [searchQuery, data, searchKey]);

    // Generate suggestions based on the search query
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.length > 0 && data) {
            const lowerCaseQuery = query.toLowerCase();
            const newSuggestions = data
                .filter((item) =>
                    item[searchKey].toLowerCase().includes(lowerCaseQuery)
                )
                .map((item) => item[searchKey]);
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
