import client from './client';

// Type definitions for vehicle API
export interface VehicleType {
  type: string;           // e.g., "bike", "tata_ace"
  name: string;          // Display name
  capacity_range: string; // e.g., "10-50 kg"
  base_fare: number;      // Base price
}

export interface VehicleTypesResponse {
  success: boolean;
  data: VehicleType[];
  timestamp: string;
}

// Fare estimation types
export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  address: string;
}

export interface FareEstimateRequest {
  pickup_location: LocationCoordinates;
  drop_location: LocationCoordinates;
  vehicle_type: string;
}

export interface FareEstimateResponse {
  success: boolean;
  data: {
    base_fare: number;
    distance_charge: number;
    platform_charge: number;
    gst: number;
    total_fare: number;
    distance_km?: number;
    estimated_duration_mins?: number;
  };
  timestamp: string;
}

// Vehicle API service
export const vehicleApi = {
  /**
   * Fetch all available vehicle types
   * @returns Promise with vehicle types data
   */
  getVehicleTypes: async (): Promise<VehicleTypesResponse> => {
    const response = await client.get<VehicleTypesResponse>('/vehicle/types');
    return response.data;
  },

  /**
   * Estimate fare for a booking
   * @param request Fare estimation request data
   * @returns Promise with fare estimate data
   */
  estimateFare: async (request: FareEstimateRequest): Promise<FareEstimateResponse> => {
    const response = await client.post<FareEstimateResponse>(
      '/booking/estimate-fare',
      request
    );
    return response.data;
  },
};

