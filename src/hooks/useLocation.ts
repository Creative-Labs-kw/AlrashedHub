import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
    const [location, setLocation] = useState<string>("Fetching location...");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                // Request permission to access location
                let { status } = await Location
                    .requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission to access location was denied");
                    return;
                }

                // Get the device's current position
                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                // Get the reverse geocoding to find the city and country
                let reverseGeocode = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                });

                // Get the first result and format it
                let { city, region, country } = reverseGeocode[0];
                setLocation(`${city}, ${region}, ${country}`);
            } catch (error) {
                setErrorMsg("Failed to fetch location");
            }
        })();
    }, []);

    return {
        location,
        errorMsg,
    };
};
