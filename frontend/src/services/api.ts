import axios from 'axios';
import {
  CropCalendarRequest,
  CropCalendarResponse,
  SupportedCrop,
  Location,
  SatelliteData,
  ApiError
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
    } else if (error.request) {
      console.error('API Network Error:', error.request);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export class CropCalendarAPI {
  /**
   * Generate crop calendar based on user inputs
   */
  static async generateCropCalendar(
    request: CropCalendarRequest
  ): Promise<CropCalendarResponse> {
    try {
      const response = await apiClient.post<CropCalendarResponse>(
        '/api/crop-calendar/generate',
        request
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data as ApiError;
      }
      return {
        success: false,
        error: 'Network Error',
        message: 'Failed to connect to the server. Please check your connection.',
      };
    }
  }

  /**
   * Get list of supported crop types
   */
  static async getSupportedCrops(): Promise<{ success: boolean; data?: SupportedCrop[]; error?: string }> {
    try {
      const response = await apiClient.get('/api/crop-calendar/crops');
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        error: 'Failed to fetch supported crops',
      };
    }
  }

  /**
   * Validate if location is suitable for agriculture
   */
  static async validateLocation(location: Location): Promise<{
    success: boolean;
    data?: {
      isValid: boolean;
      suitabilityScore: number;
      warnings: string[];
      recommendations: string[];
    };
    error?: string;
  }> {
    try {
      const response = await apiClient.post('/api/crop-calendar/validate-location', {
        location,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        error: 'Failed to validate location',
      };
    }
  }

  /**
   * Get current satellite data for a location
   */
  static async getCurrentSatelliteData(location: Location): Promise<{
    success: boolean;
    data?: SatelliteData;
    error?: string;
  }> {
    try {
      const response = await apiClient.post('/api/satellite-data/current', {
        location,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        error: 'Failed to fetch satellite data',
      };
    }
  }

  /**
   * Get historical satellite data
   */
  static async getHistoricalSatelliteData(
    location: Location,
    startDate: string,
    endDate: string
  ): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      const response = await apiClient.post('/api/satellite-data/historical', {
        location,
        startDate,
        endDate,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        error: 'Failed to fetch historical data',
      };
    }
  }

  /**
   * Health check API endpoint
   */
  static async healthCheck(): Promise<{ status: string; message: string; timestamp: string }> {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  }
}

export default CropCalendarAPI;
