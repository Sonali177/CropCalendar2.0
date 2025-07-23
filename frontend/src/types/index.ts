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
