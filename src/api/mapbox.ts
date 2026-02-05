import axios from 'axios';

const MAPBOX_ACCESS_TOKEN =
  'MAPBOX_PUBLIC_TOKEN_REMOVED';

// Mapbox Search Box API v1 client
const searchBoxClient = axios.create({
  baseURL: 'https://api.mapbox.com/search/searchbox/v1',
});

// Mapbox Geocoding API client for reverse geocoding
const geocodingClient = axios.create({
  baseURL: 'https://api.mapbox.com/search/geocode/v6',
});

export const mapboxApi = {
  /**
   * Search for places using Mapbox Search Box API v1
   * Provides better autocomplete suggestions
   */
  searchPlaces: async (
    query: string,
    proximity?: {lat: number; lng: number},
    sessionToken?: string,
  ) => {
    try {
      if (!query || query.trim().length < 2) {
        return [];
      }

      // Build URL with parameters
      let url = `/suggest?q=${encodeURIComponent(query)}&access_token=${MAPBOX_ACCESS_TOKEN}&country=IN&language=en&limit=10`;

      // Add proximity if available for better results
      if (proximity) {
        url += `&proximity=${proximity.lng},${proximity.lat}`;
      }

      // Add session token for better analytics (optional)
      if (sessionToken) {
        url += `&session_token=${sessionToken}`;
      }

      // Add types filter for relevant results
      url += `&types=address,poi,street,locality,place`;

      const response = await searchBoxClient.get(url);

      if (!response.data.suggestions || response.data.suggestions.length === 0) {
        return [];
      }

      // Map suggestions to our location format
      return response.data.suggestions.map((suggestion: any) => ({
        id: suggestion.mapbox_id || suggestion.name,
        name: suggestion.name,
        address: suggestion.full_address || suggestion.place_formatted || suggestion.name,
        center: suggestion.center
          ? [suggestion.center[0], suggestion.center[1]]
          : undefined, // [lng, lat]
        context: suggestion.context,
        metadata: {
          mapbox_id: suggestion.mapbox_id,
          feature_type: suggestion.feature_type,
        },
      }));
    } catch (error) {
      console.error('Mapbox Search Box API error:', error);
      return [];
    }
  },

  /**
   * Reverse geocode coordinates to get address
   * Uses Mapbox Geocoding API v6
   */
  reverseGeocode: async (lat: number, lng: number) => {
    try {
      // Use reverse geocoding endpoint
      const url = `/reverse?longitude=${lng}&latitude=${lat}&access_token=${MAPBOX_ACCESS_TOKEN}&country=IN&language=en&types=address,poi,street,locality`;

      const response = await geocodingClient.get(url);

      const features = response.data.features;
      if (features && features.length > 0) {
        // Prioritize address or POI types for better accuracy
        const specificAddress = features.find(
          (f: any) =>
            f.properties?.feature_type === 'address' ||
            f.properties?.feature_type === 'poi' ||
            f.properties?.feature_type === 'street',
        );

        const selectedFeature = specificAddress || features[0];

        // Return formatted address
        return (
          selectedFeature.properties?.full_address ||
          selectedFeature.properties?.place_formatted ||
          selectedFeature.properties?.name ||
          `${lat}, ${lng}`
        );
      }
      return `${lat}, ${lng}`; // Fallback to coordinates
    } catch (error) {
      console.error('Mapbox reverse geocode error:', error);
      // Fallback to coordinates on error
      return `${lat}, ${lng}`;
    }
  },

  /**
   * Retrieve full details of a place using mapbox_id
   * Useful after user selects a suggestion
   */
  retrievePlace: async (mapboxId: string, sessionToken?: string) => {
    try {
      let url = `/retrieve/${mapboxId}?access_token=${MAPBOX_ACCESS_TOKEN}`;

      if (sessionToken) {
        url += `&session_token=${sessionToken}`;
      }

      const response = await searchBoxClient.get(url);

      if (response.data.features && response.data.features.length > 0) {
        const feature = response.data.features[0];
        return {
          id: feature.properties.mapbox_id,
          name: feature.properties.name,
          address:
            feature.properties.full_address ||
            feature.properties.place_formatted,
          center: feature.geometry.coordinates, // [lng, lat]
          properties: feature.properties,
        };
      }
      return null;
    } catch (error) {
      console.error('Mapbox retrieve place error:', error);
      return null;
    }
  },
};
