export interface Location {
  latitude: number;
  longitude: number;
}

export interface SatelliteData {
  vegetationIndex: {
    ndvi: number;
    evi: number;
    lastCalculated: string;
  };
  soilMoisture: {
    percentage: number;
    status: string;
    depth: string;
  };
  temperature: {
    current: number;
    min: number;
    max: number;
    unit: string;
  };
  precipitation: {
    last7Days: number;
    last30Days: number;
    unit: string;
  };
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  sunlightHours: number;
  lastUpdated: string;
  location: Location;
  dataSource: string;
  confidence: number;
}

export interface CropInfo {
  name: string;
  scientificName: string;
  category: string;
  description: string;
  growingPeriod: number;
}

export interface PlantingWindow {
  season: string;
  earliestStart: string;
  latestEnd: string;
  optimalStart: string;
  optimalEnd: string;
  adjustments: number;
  riskFactors: string[];
  recommendations: string[];
  daysFromNow: number;
}

export interface GrowthStage {
  stage: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: number;
  keyActivities: string[];
  careInstructions: string[];
  expectedSigns: string[];
}

export interface FertilizationSchedule {
  date: string;
  type: string;
  nutrient: string;
  amountPerUnit: number;
  totalAmount: number;
  unit: string;
  method: string;
  instructions: string;
  stage: string;
}

export interface IrrigationSchedule {
  date: string;
  amount: number;
  unit: string;
  method: string;
  duration: number;
  timing: string;
  stage: string;
}

export interface MaintenanceSchedule {
  fertilization: FertilizationSchedule[];
  irrigation: IrrigationSchedule[];
  totalFertilizerCost: number;
  totalWaterNeeded: number;
}

export interface ExpectedYield {
  amount: number;
  unit: string;
  confidence: number;
}

export interface HarvestingWindow {
  earliestDate: string;
  latestDate: string;
  optimalDate: string;
  estimatedYield: ExpectedYield;
  harvestingMethod: string;
  postHarvestCare: string;
  storageInstructions: string;
  marketReadiness: string;
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  actions: string[];
}

export interface AssessmentResult {
  status: string;
  score: number;
  description: string;
  issues?: string[];
}

export interface SatelliteDataSummary {
  vegetationHealth: AssessmentResult;
  soilCondition: AssessmentResult;
  weatherSuitability: AssessmentResult;
  overallReadiness: AssessmentResult;
}

export interface CropCalendar {
  cropType: string;
  cropInfo: CropInfo;
  plantingWindow: PlantingWindow;
  growthStages: GrowthStage[];
  maintenanceSchedule: MaintenanceSchedule;
  harvestingWindow: HarvestingWindow;
  recommendations: Recommendation[];
  satelliteDataSummary: SatelliteDataSummary;
  generatedAt: string;
  location: Location;
  area: number;
}

export interface CropCalendarRequest {
  location: Location;
  area: number;
  cropType: string;
}

export interface CropCalendarResponse {
  success: boolean;
  data?: {
    cropCalendar: CropCalendar;
    satelliteData: SatelliteData;
    metadata: {
      generatedAt: string;
      location: Location;
      area: number;
      cropType: string;
    };
  };
  error?: string;
  message?: string;
}

export interface SupportedCrop {
  name: string;
  scientificName: string;
  category: string;
  description: string;
  growingPeriod: number;
  difficulty: string;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  details?: any[];
}

// SOS Emergency Types
export interface SOSEmergencyRequest {
  location: Location;
  emergencyType: 'pest_disease' | 'weather_damage' | 'equipment_failure' | 'soil_issues' | 'irrigation_problems' | 'livestock_emergency' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  contactInfo: {
    phone?: string;
    email?: string;
    name?: string;
  };
  cropType?: string;
  farmSize?: number;
  images?: string[];
}

export interface SOSResponse {
  emergencyId: string;
  ticketNumber: string;
  status: 'submitted' | 'acknowledged' | 'in_progress' | 'resolved';
  estimatedResponseTime: string;
  immediateActions: string[];
  emergencyContacts: EmergencyContact[];
  submittedAt: string;
}

export interface EmergencyContact {
  type: string;
  phone: string;
  available: string;
}

export interface EmergencyRecommendations {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
  prevention: string[];
  estimatedCosts: {
    estimated: number;
    range: string;
    currency: string;
  };
  timeframe: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface EmergencyResource {
  name: string;
  phone: string;
  distance: number;
  address: string;
  rating: number;
  available: boolean;
  estimatedArrival: string;
  coordinates: Location;
}

export interface EmergencyResourcesResponse {
  resources: EmergencyResource[];
  totalFound: number;
  searchRadius: number;
  searchLocation: Location;
}

export interface EmergencyStatus {
  id: string;
  status: string;
  submittedAt: string;
  updatedAt: string;
  statusHistory: EmergencyStatusUpdate[];
  currentStatus: EmergencyStatusUpdate;
}

export interface EmergencyStatusUpdate {
  status: string;
  timestamp: string;
  message: string;
}

// Sustainable Practices Types
export interface SustainablePractice {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  implementation: {
    steps: string[];
    estimatedCost: {
      min: number;
      max: number;
      unit: string;
    };
    timeframe: string;
    difficulty: 'easy' | 'medium' | 'high';
  };
  suitability: {
    landSize: {
      min: number;
      max: number;
      unit: string;
    };
    climateZones: string[];
    soilTypes: string[];
    crops: string[];
  };
  environmentalImpact: {
    waterSavings: string;
    energySavings: string;
    carbonReduction: string;
    biodiversityImpact: string;
  };
  score?: number;
  estimatedImplementationCost?: {
    min: number;
    max: number;
    unit: string;
    currency?: {
      code: string;
      symbol: string;
      name: string;
      conversionRate: number;
      locale?: string;
    };
  };
  // AI-specific fields
  aiGenerated?: boolean;
  aiInsights?: string[];
  mentionCount?: number;
  aiRecommended?: boolean;
  confidence?: number;
  source?: string;
}

export interface SustainablePracticesRequest {
  location: Location;
  landSize: number;
  cropTypes?: string[];
  practiceTypes?: string[];
  budget?: number;
  currentPractices?: string[];
}

export interface SustainablePracticesResponse {
  recommendations?: SustainablePractice[];
  totalCount?: number;
  aiGenerated?: boolean;
  rawResponse?: string;
  generatedAt?: string;
  currency?: {
    code: string;
    symbol: string;
    name: string;
    conversionRate: number;
    locale?: string;
  };
  farmContext?: {
    location: Location;
    landSize: number;
    currentPractices: string[];
    cropTypes: string[];
  };
  // Legacy format support
  location?: {
    climateZone: string;
    soilType: string;
    coordinates: Location;
  };
  farmCharacteristics?: {
    landSize: number;
    cropTypes: string[];
    estimatedBudget?: number;
  };
  recommendedPractices?: SustainablePractice[];
  totalPracticesAvailable?: number;
  filteredPracticesCount?: number;
  summary?: {
    potentialWaterSavings: string;
    potentialEnergySavings: string;
    carbonReductionPotential: string;
    biodiversityImpact: string;
  };
}

export interface PracticeCategory {
  name: string;
  practiceCount: number;
  practices: {
    id: string;
    name: string;
    category: string;
    difficulty: string;
  }[];
}

export interface PracticeImpactAssessment {
  combinedCost: {
    min: number;
    max: number;
    unit: string;
  };
  combinedWaterSavings: string;
  combinedEnergySavings: string;
  implementationTimeframe: string;
  overallDifficulty: string;
  synergies: string[];
  potentialConflicts: string[];
}

export interface SustainabilityAssessment {
  sustainabilityScore: number;
  topPriorities: SustainablePractice[];
  quickWins: SustainablePractice[];
  potentialImpact: {
    potentialWaterSavings: string;
    potentialEnergySavings: string;
    carbonReductionPotential: string;
    biodiversityImpact: string;
  };
  currentPracticesCount: number;
  recommendedPracticesCount: number;
  improvementAreas: {
    area: string;
    opportunityCount: number;
    priority: 'low' | 'medium' | 'high';
  }[];
}
