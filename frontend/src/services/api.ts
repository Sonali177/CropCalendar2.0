import axios from 'axios';
import {
  CropCalendarRequest,
  CropCalendarResponse,
  SupportedCrop,
  Location,
  SatelliteData,
  ApiError,
  SOSEmergencyRequest,
  SOSResponse,
  EmergencyRecommendations,
  EmergencyResourcesResponse,
  EmergencyStatus,
  SustainablePracticesRequest,
  SustainablePracticesResponse,
  SustainablePractice,
  PracticeCategory,
  PracticeImpactAssessment,
  SustainabilityAssessment
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

  // SOS Emergency Services
  
  /**
   * Submit SOS emergency request
   */
  static async submitSOSEmergency(emergencyData: SOSEmergencyRequest): Promise<SOSResponse> {
    try {
      const response = await apiClient.post('/api/sos/submit', emergencyData);
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to submit emergency request');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to submit emergency request');
    }
  }

  /**
   * Get emergency recommendations
   */
  static async getEmergencyRecommendations(params: {
    emergencyType: string;
    severity: string;
    location: Location;
    cropType?: string;
    description: string;
  }): Promise<EmergencyRecommendations> {
    try {
      const response = await apiClient.post('/api/sos/recommendations', params);
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to get recommendations');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get emergency recommendations');
    }
  }

  /**
   * Get nearby emergency resources
   */
  static async getNearbyResources(
    location: Location,
    resourceType?: string,
    radius?: number
  ): Promise<EmergencyResourcesResponse> {
    try {
      const response = await apiClient.post('/api/sos/resources', {
        location,
        resourceType,
        radius
      });
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to get nearby resources');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get nearby resources');
    }
  }

  /**
   * Get emergency status
   */
  static async getEmergencyStatus(emergencyId: string): Promise<EmergencyStatus> {
    try {
      const response = await apiClient.get(`/api/sos/status/${emergencyId}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Emergency not found');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get emergency status');
    }
  }

  /**
   * Get sustainable practice recommendations
   */
  static async getSustainablePracticeRecommendations(
    location: Location, 
    landSize: number, 
    cropTypes?: string[], 
    budget?: number,
    currentPractices?: string[]
  ): Promise<SustainablePracticesResponse> {
    try {
      const response = await apiClient.get('/api/sustainable-practices/recommendations', {
        params: { 
          latitude: location.latitude, 
          longitude: location.longitude, 
          landSize,
          cropTypes: cropTypes?.join(','),
          budget,
          currentPractices: currentPractices?.join(',')
        }
      });
      
      // Return the data directly since the type expects the content, not the wrapper
      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to get recommendations');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get sustainable practice recommendations');
    }
  }

  /**
   * Get details for a specific sustainable practice
   */
  static async getSustainablePracticeDetails(practiceId: string): Promise<SustainablePractice> {
    try {
      const response = await apiClient.get(`/api/sustainable-practices/details/${practiceId}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Practice not found');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get practice details');
    }
  }

  /**
   * Get practice categories
   */
  static async getPracticeCategories(): Promise<PracticeCategory[]> {
    try {
      const response = await apiClient.get('/api/sustainable-practices/categories');
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to get categories');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get practice categories');
    }
  }

  /**
   * Get impact assessment for selected practices
   */
  static async getImpactAssessment(
    practiceIds: string[], 
    farmDetails: any
  ): Promise<PracticeImpactAssessment> {
    try {
      const response = await apiClient.post('/api/sustainable-practices/impact-assessment', {
        practiceIds,
        farmDetails
      });
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to assess impact');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get impact assessment');
    }
  }

  /**
   * Get filtered practices based on criteria
   */
  static async getFilteredPractices(filters: any): Promise<SustainablePractice[]> {
    try {
      const response = await apiClient.get('/api/sustainable-practices/filter', { params: filters });
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to filter practices');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get filtered practices');
    }
  }

  /**
   * Get sustainability assessment
   */
  static async getSustainabilityAssessment(
    farmData: any, 
    currentPractices: string[]
  ): Promise<SustainabilityAssessment> {
    try {
      const response = await apiClient.post('/api/sustainable-practices/assessment', {
        farmData,
        currentPractices
      });
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to generate assessment');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get sustainability assessment');
    }
  }

  /**
   * Get quick sustainability assessment
   */
  static async getQuickSustainabilityAssessment(
    farmData: any, 
    currentPractices: string[]
  ): Promise<SustainabilityAssessment> {
    try {
      const response = await apiClient.post('/api/sustainable-practices/quick-assessment', {
        farmData,
        currentPractices
      });
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to generate quick assessment');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get quick sustainability assessment');
    }
  }

  // ========== Weather API Methods ==========

  /**
   * Get current weather conditions for a location
   */
  static async getCurrentWeather(latitude: number, longitude: number): Promise<any> {
    try {
      const response = await apiClient.get(`/api/weather/current`, {
        params: { latitude, longitude }
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to get current weather');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch current weather data');
    }
  }

  /**
   * Get weather forecast for a location
   */
  static async getWeatherForecast(latitude: number, longitude: number, days: number = 7): Promise<any> {
    try {
      const response = await apiClient.get(`/api/weather/forecast`, {
        params: { latitude, longitude, days }
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to get weather forecast');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch weather forecast data');
    }
  }

  /**
   * Get comprehensive weather data (current + forecast)
   */
  static async getComprehensiveWeatherData(latitude: number, longitude: number, days: number = 7): Promise<any> {
    try {
      console.log(`🌍 Fetching comprehensive weather data for: ${latitude}, ${longitude} (${days} days)`);
      
      // Add cache-busting parameter
      const cacheBuster = new Date().getTime();
      
      const response = await apiClient.get(`/api/weather/comprehensive`, {
        params: { 
          latitude, 
          longitude, 
          days,
          _t: cacheBuster // Cache buster
        }
      });

      console.log('📊 Raw API response:', response.data);

      if (response.data.success) {
        console.log('✅ Weather data retrieved successfully');
        console.log('🌤️ Current weather:', response.data.data.current);
        console.log('🌦️ Weather description:', response.data.data.current?.weather?.description);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to get comprehensive weather data');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch comprehensive weather data');
    }
  }

  /**
   * Get weather for multiple locations
   */
  static async getBulkWeatherData(locations: Array<{latitude: number, longitude: number, name?: string}>, includeForeast: boolean = false, forecastDays: number = 7): Promise<any> {
    try {
      const response = await apiClient.post(`/api/weather/bulk-locations`, {
        locations,
        includeForeast,
        forecastDays
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to get bulk weather data');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch bulk weather data');
    }
  }
}

export default CropCalendarAPI;

// Government Schemes API
export class GovernmentSchemesAPI {
  /**
   * Get all government schemes
   */
  static async getAllSchemes(): Promise<any> {
    try {
      const response = await apiClient.get('/api/government-schemes/');
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch government schemes');
    }
  }

  /**
   * Get scheme by ID
   */
  static async getSchemeById(schemeId: string | number): Promise<any> {
    try {
      const response = await apiClient.get(`/api/government-schemes/${schemeId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch scheme details');
    }
  }

  /**
   * Search schemes by keyword
   */
  static async searchSchemes(query: string): Promise<any> {
    try {
      const response = await apiClient.get(`/api/government-schemes/search/${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to search schemes');
    }
  }

  /**
   * Filter schemes by category
   */
  static async filterByCategory(category: string): Promise<any> {
    try {
      const response = await apiClient.get(`/api/government-schemes/category/${encodeURIComponent(category)}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to filter schemes by category');
    }
  }

  /**
   * Filter schemes by priority
   */
  static async filterByPriority(priority: string): Promise<any> {
    try {
      const response = await apiClient.get(`/api/government-schemes/priority/${priority}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to filter schemes by priority');
    }
  }

  /**
   * Get high priority schemes
   */
  static async getHighPrioritySchemes(): Promise<any> {
    try {
      const response = await apiClient.get('/api/government-schemes/filters/high-priority');
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch high priority schemes');
    }
  }

  /**
   * Get emergency schemes with contact numbers
   */
  static async getEmergencySchemes(): Promise<any> {
    try {
      const response = await apiClient.get('/api/government-schemes/filters/emergency');
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch emergency schemes');
    }
  }

  /**
   * Get scheme statistics
   */
  static async getSchemeStatistics(): Promise<any> {
    try {
      const response = await apiClient.get('/api/government-schemes/analytics/statistics');
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to fetch scheme statistics');
    }
  }

  /**
   * Filter schemes by eligibility criteria
   */
  static async filterByEligibility(eligibilityKeywords: string[]): Promise<any> {
    try {
      const response = await apiClient.post('/api/government-schemes/filters/eligibility', {
        eligibilityKeywords
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to filter schemes by eligibility');
    }
  }
}
