const moment = require('moment');
const cropData = require('../data/cropData');
const AIRecommendationService = require('./aiRecommendationService');

class CropCalendarService {
  constructor() {
    this.cropDatabase = cropData;
    this.aiService = new AIRecommendationService();
  }

  /**
   * Generate a comprehensive crop calendar based on inputs and satellite data
   * Enhanced with AI recommendations from cropinailab/aksara_v1
   * @param {Object} params - Contains location, area, cropType, and satelliteData
   * @returns {Object} Complete crop calendar with milestones and AI insights
   */
  async generateCropCalendar({ location, area, cropType, satelliteData }) {
    console.log(`🌾 Generating AI-enhanced crop calendar for ${cropType} at location (${location.latitude}, ${location.longitude})`);
    
    try {
      // Get AI recommendations first
      const aiRecommendation = await this.aiService.getCropRecommendation({
        location,
        satelliteData,
        area,
        soilType: satelliteData.soilMoisture.status
      });

      console.log('🤖 AI recommendations received, integrating with crop calendar...');

      // Get base crop information
      const crop = this.getCropInfo(cropType);
      if (!crop) {
        throw new Error(`Unsupported crop type: ${cropType}`);
      }

      const currentDate = moment();
      const { latitude } = location;
      const isNorthernHemisphere = latitude > 0;
      
      // Analyze satellite data to adjust planting recommendations
      // Enhanced with AI insights
      const plantingAdjustments = this.analyzePlantingConditions(
        satelliteData, 
        crop, 
        isNorthernHemisphere,
        aiRecommendation
      );
      
      // Calculate optimal planting window with AI guidance
      const plantingWindow = this.calculatePlantingWindow(
        crop, 
        currentDate, 
        plantingAdjustments, 
        isNorthernHemisphere,
        aiRecommendation
      );
      
      // Generate growth stages timeline enhanced with AI insights
      const growthStages = this.calculateGrowthStages(crop, plantingWindow.optimalStart, satelliteData, aiRecommendation);
      
      // Calculate fertilization and irrigation schedules with AI management practices
      const maintenanceSchedule = this.calculateMaintenanceSchedule(
        crop, 
        plantingWindow.optimalStart, 
        area, 
        satelliteData,
        aiRecommendation
      );
      
      // Calculate harvesting window
      const harvestingWindow = this.calculateHarvestingWindow(crop, plantingWindow.optimalStart, area, satelliteData);
      
      // Generate recommendations enhanced with AI insights
      const recommendations = this.generateRecommendations(
        satelliteData, 
        crop, 
        currentDate, 
        plantingWindow,
        aiRecommendation
      );

      return {
        cropType,
        cropInfo: {
          name: crop.name,
          scientificName: crop.scientificName,
          category: crop.category,
          growingPeriod: crop.growingPeriodDays,
          description: crop.description
        },
        // AI Enhancement Section
        aiEnhancement: {
          modelUsed: aiRecommendation.aiRecommendation?.modelUsed || 'fallback',
          confidence: aiRecommendation.aiRecommendation?.confidence || 0.6,
          alternativeCrops: aiRecommendation.aiRecommendation?.recommendedCrops || [],
          aiInsights: aiRecommendation.aiRecommendation?.aiInsights || 'No AI insights available',
          riskAssessment: aiRecommendation.aiRecommendation?.riskAssessment || [],
          managementPractices: aiRecommendation.aiRecommendation?.managementPractices || [],
          generatedAt: aiRecommendation.aiRecommendation?.generatedAt || new Date().toISOString()
        },
        plantingWindow,
        growthStages,
        maintenanceSchedule,
        harvestingWindow,
        recommendations,
        satelliteDataSummary: {
          vegetationHealth: this.assessVegetationHealth(satelliteData.vegetationIndex),
          soilCondition: this.assessSoilCondition(satelliteData.soilMoisture),
          weatherSuitability: this.assessWeatherSuitability(satelliteData.temperature, satelliteData.precipitation),
          overallReadiness: this.assessOverallReadiness(satelliteData, crop)
        },
        generatedAt: new Date().toISOString(),
        location,
        area
      };

    } catch (error) {
      console.error('❌ Error generating AI-enhanced crop calendar:', error);
      
      // Fallback to traditional crop calendar generation
      return this.generateTraditionalCropCalendar({ location, area, cropType, satelliteData });
    }
  }

  /**
   * Fallback method for traditional crop calendar generation
   */
  async generateTraditionalCropCalendar({ location, area, cropType, satelliteData }) {
    console.log('🔄 Falling back to traditional crop calendar generation');
    
    const crop = this.getCropInfo(cropType);
    if (!crop) {
      throw new Error(`Unsupported crop type: ${cropType}`);
    }

    const currentDate = moment();
    const { latitude } = location;
    const isNorthernHemisphere = latitude > 0;
    
    // Traditional methods without AI enhancement
    const plantingAdjustments = this.analyzePlantingConditions(satelliteData, crop, isNorthernHemisphere);
    const plantingWindow = this.calculatePlantingWindow(crop, currentDate, plantingAdjustments, isNorthernHemisphere);
    const growthStages = this.calculateGrowthStages(crop, plantingWindow.optimalStart, satelliteData);
    const maintenanceSchedule = this.calculateMaintenanceSchedule(crop, plantingWindow.optimalStart, area, satelliteData);
    const harvestingWindow = this.calculateHarvestingWindow(crop, plantingWindow.optimalStart, area, satelliteData);
    const recommendations = this.generateRecommendations(satelliteData, crop, currentDate, plantingWindow);

    return {
      cropType,
      cropInfo: {
        name: crop.name,
        scientificName: crop.scientificName,
        category: crop.category,
        growingPeriod: crop.growingPeriodDays,
        description: crop.description
      },
      // Traditional generation (no AI enhancement)
      aiEnhancement: {
        modelUsed: 'traditional',
        confidence: 0.6,
        alternativeCrops: [],
        aiInsights: 'Traditional rule-based calendar generation (AI service unavailable)',
        riskAssessment: [],
        managementPractices: [],
        generatedAt: new Date().toISOString()
      },
      plantingWindow,
      growthStages,
      maintenanceSchedule,
      harvestingWindow,
      recommendations,
      satelliteDataSummary: {
        vegetationHealth: this.assessVegetationHealth(satelliteData.vegetationIndex),
        soilCondition: this.assessSoilCondition(satelliteData.soilMoisture),
        weatherSuitability: this.assessWeatherSuitability(satelliteData.temperature, satelliteData.precipitation),
        overallReadiness: this.assessOverallReadiness(satelliteData, crop)
      },
      generatedAt: new Date().toISOString(),
      location,
      area
    };
  }

  /**
   * Get crop information from database
   * @param {string} cropType 
   * @returns {Object} Crop information
   */
  getCropInfo(cropType) {
    const normalizedCropType = cropType.toLowerCase().trim();
    return this.cropDatabase.crops.find(crop => 
      crop.name.toLowerCase() === normalizedCropType ||
      crop.aliases?.some(alias => alias.toLowerCase() === normalizedCropType)
    );
  }

  /**
   * Analyze satellite data to determine planting condition adjustments
   * @param {Object} satelliteData 
   * @param {Object} crop 
   * @param {boolean} isNorthernHemisphere 
   * @returns {Object} Adjustment recommendations
   */
  analyzePlantingConditions(satelliteData, crop, isNorthernHemisphere) {
    const adjustments = {
      delayDays: 0,
      advanceDays: 0,
      riskFactors: [],
      recommendations: []
    };

    // Analyze soil moisture
    const soilMoisturePercentage = satelliteData.soilMoisture.percentage;
    if (soilMoisturePercentage < crop.requirements.soilMoisture.minimum) {
      adjustments.delayDays += 7;
      adjustments.riskFactors.push('Low soil moisture');
      adjustments.recommendations.push('Consider irrigation before planting');
    } else if (soilMoisturePercentage > crop.requirements.soilMoisture.maximum) {
      adjustments.delayDays += 3;
      adjustments.riskFactors.push('Excess soil moisture');
      adjustments.recommendations.push('Allow soil to drain before planting');
    }

    // Analyze temperature
    const currentTemp = satelliteData.temperature.current;
    if (currentTemp < crop.requirements.temperature.minimum) {
      adjustments.delayDays += 14;
      adjustments.riskFactors.push('Temperature too low');
      adjustments.recommendations.push('Wait for warmer weather');
    } else if (currentTemp > crop.requirements.temperature.maximum) {
      adjustments.delayDays += 7;
      adjustments.riskFactors.push('Temperature too high');
      adjustments.recommendations.push('Consider heat-resistant varieties');
    }

    // Analyze recent precipitation
    const recentPrecipitation = satelliteData.precipitation.last7Days;
    if (recentPrecipitation > 50) {
      adjustments.delayDays += 3;
      adjustments.riskFactors.push('Heavy recent rainfall');
    }

    return adjustments;
  }

  /**
   * Calculate optimal planting window
   * @param {Object} crop 
   * @param {moment.Moment} currentDate 
   * @param {Object} adjustments 
   * @param {boolean} isNorthernHemisphere 
   * @returns {Object} Planting window information
   */
  calculatePlantingWindow(crop, currentDate, adjustments, isNorthernHemisphere) {
    const currentMonth = currentDate.month() + 1; // 1-12
    
    // Get base planting season for hemisphere
    const plantingSeasons = isNorthernHemisphere ? 
      crop.plantingSeasons.northern : 
      crop.plantingSeasons.southern;

    // Find the next suitable planting season
    let nextSeasonStart = null;
    let nextSeasonEnd = null;

    for (const season of plantingSeasons) {
      const seasonStart = moment().month(season.start - 1).date(1);
      const seasonEnd = moment().month(season.end - 1).date(1).endOf('month');

      if (seasonStart.isAfter(currentDate) || seasonStart.isSame(currentDate, 'month')) {
        nextSeasonStart = seasonStart.clone();
        nextSeasonEnd = seasonEnd.clone();
        break;
      }
    }

    // If no season found this year, take the first season of next year
    if (!nextSeasonStart) {
      const firstSeason = plantingSeasons[0];
      nextSeasonStart = moment().add(1, 'year').month(firstSeason.start - 1).date(1);
      nextSeasonEnd = moment().add(1, 'year').month(firstSeason.end - 1).date(1).endOf('month');
    }

    // Apply satellite data adjustments
    let optimalStart = nextSeasonStart.clone().add(adjustments.delayDays - adjustments.advanceDays, 'days');
    const optimalEnd = nextSeasonEnd.clone();

    // Ensure optimal start is not before current date
    if (optimalStart.isBefore(currentDate)) {
      optimalStart = currentDate.clone().add(1, 'day');
    }

    return {
      season: this.getSeasonName(optimalStart.month() + 1, isNorthernHemisphere),
      earliestStart: nextSeasonStart.format('YYYY-MM-DD'),
      latestEnd: nextSeasonEnd.format('YYYY-MM-DD'),
      optimalStart: optimalStart.format('YYYY-MM-DD'),
      optimalEnd: optimalEnd.format('YYYY-MM-DD'),
      adjustments: adjustments.delayDays - adjustments.advanceDays,
      riskFactors: adjustments.riskFactors,
      recommendations: adjustments.recommendations,
      daysFromNow: optimalStart.diff(currentDate, 'days')
    };
  }

  /**
   * Calculate growth stages timeline
   * @param {Object} crop 
   * @param {string} plantingDate 
   * @param {Object} satelliteData 
   * @returns {Array} Growth stages with dates
   */
  calculateGrowthStages(crop, plantingDate, satelliteData) {
    const plantDate = moment(plantingDate);
    const stages = [];

    // Add growth stage adjustments based on satellite data
    const temperatureMultiplier = this.getGrowthRateMultiplier(satelliteData.temperature.current, crop);
    
    let cumulativeDays = 0;
    crop.growthStages.forEach((stage, index) => {
      const adjustedDuration = Math.round(stage.duration * temperatureMultiplier);
      cumulativeDays += adjustedDuration;
      
      stages.push({
        stage: stage.name,
        description: stage.description,
        startDate: plantDate.clone().add(cumulativeDays - adjustedDuration, 'days').format('YYYY-MM-DD'),
        endDate: plantDate.clone().add(cumulativeDays, 'days').format('YYYY-MM-DD'),
        duration: adjustedDuration,
        keyActivities: stage.activities,
        careInstructions: stage.careInstructions,
        expectedSigns: stage.expectedSigns
      });
    });

    return stages;
  }

  /**
   * Calculate maintenance schedule (fertilization and irrigation)
   * @param {Object} crop 
   * @param {string} plantingDate 
   * @param {number} area 
   * @param {Object} satelliteData 
   * @returns {Object} Maintenance schedules
   */
  calculateMaintenanceSchedule(crop, plantingDate, area, satelliteData) {
    const plantDate = moment(plantingDate);
    const fertilization = [];
    const irrigation = [];

    // Calculate fertilization schedule
    crop.fertilizationSchedule.forEach(fert => {
      const applicationDate = plantDate.clone().add(fert.daysAfterPlanting, 'days');
      const areaMultiplier = area; // Assuming area is in appropriate units
      
      fertilization.push({
        date: applicationDate.format('YYYY-MM-DD'),
        type: fert.type,
        nutrient: fert.nutrient,
        amountPerUnit: fert.amount,
        totalAmount: Math.round(fert.amount * areaMultiplier * 100) / 100,
        unit: fert.unit,
        method: fert.method,
        instructions: fert.instructions,
        stage: this.getGrowthStageAtDate(crop, plantDate, applicationDate)
      });
    });

    // Calculate irrigation schedule based on satellite data
    const baseIrrigationFrequency = this.calculateIrrigationFrequency(satelliteData, crop);
    const totalGrowingDays = crop.growingPeriodDays;
    
    for (let day = 7; day <= totalGrowingDays; day += baseIrrigationFrequency) {
      const irrigationDate = plantDate.clone().add(day, 'days');
      const waterAmount = this.calculateWaterAmount(crop, area, satelliteData);
      
      irrigation.push({
        date: irrigationDate.format('YYYY-MM-DD'),
        amount: waterAmount,
        unit: 'liters',
        method: 'Surface irrigation recommended',
        duration: Math.round(waterAmount / 50), // Assuming 50L/hour flow rate
        timing: 'Early morning (6-8 AM) or evening (6-8 PM)',
        stage: this.getGrowthStageAtDate(crop, plantDate, irrigationDate)
      });
    }

    return {
      fertilization,
      irrigation,
      totalFertilizerCost: this.calculateFertilizerCost(fertilization),
      totalWaterNeeded: irrigation.reduce((sum, irr) => sum + irr.amount, 0)
    };
  }

  /**
   * Calculate harvesting window
   * @param {Object} crop 
   * @param {string} plantingDate 
   * @param {number} area
   * @param {Object} satelliteData 
   * @returns {Object} Harvesting information
   */
  calculateHarvestingWindow(crop, plantingDate, area, satelliteData) {
    const plantDate = moment(plantingDate);
    const temperatureMultiplier = this.getGrowthRateMultiplier(satelliteData.temperature.current, crop);
    const adjustedGrowingPeriod = Math.round(crop.growingPeriodDays * temperatureMultiplier);
    
    const harvestStart = plantDate.clone().add(adjustedGrowingPeriod - 7, 'days');
    const harvestEnd = plantDate.clone().add(adjustedGrowingPeriod + 7, 'days');
    const optimalHarvest = plantDate.clone().add(adjustedGrowingPeriod, 'days');

    return {
      earliestDate: harvestStart.format('YYYY-MM-DD'),
      latestDate: harvestEnd.format('YYYY-MM-DD'),
      optimalDate: optimalHarvest.format('YYYY-MM-DD'),
      estimatedYield: this.calculateExpectedYield(crop, area, satelliteData),
      harvestingMethod: crop.harvestingMethod,
      postHarvestCare: crop.postHarvestCare,
      storageInstructions: crop.storageInstructions,
      marketReadiness: optimalHarvest.clone().add(crop.processingDays || 0, 'days').format('YYYY-MM-DD')
    };
  }

  /**
   * Generate personalized recommendations
   * @param {Object} satelliteData 
   * @param {Object} crop 
   * @param {moment.Moment} currentDate 
   * @param {Object} plantingWindow 
   * @returns {Array} Recommendations
   */
  generateRecommendations(satelliteData, crop, currentDate, plantingWindow) {
    const recommendations = [];
    const daysToPlanting = moment(plantingWindow.optimalStart).diff(currentDate, 'days');

    // Immediate actions based on current conditions
    if (daysToPlanting <= 7 && daysToPlanting > 0) {
      recommendations.push({
        priority: 'high',
        category: 'preparation',
        title: 'Prepare for planting',
        description: 'Optimal planting window starts soon. Begin field preparation.',
        actions: ['Clear the field of weeds', 'Test soil pH', 'Prepare seeds/seedlings', 'Check irrigation system']
      });
    }

    // Soil moisture recommendations
    const soilMoisture = satelliteData.soilMoisture.percentage;
    if (soilMoisture < 30) {
      recommendations.push({
        priority: 'high',
        category: 'irrigation',
        title: 'Soil moisture is low',
        description: `Current soil moisture is ${soilMoisture}%. Consider irrigation.`,
        actions: ['Apply irrigation', 'Check irrigation system', 'Monitor soil moisture daily']
      });
    }

    // Weather-based recommendations
    if (satelliteData.precipitation.last7Days > 40) {
      recommendations.push({
        priority: 'medium',
        category: 'weather',
        title: 'Recent heavy rainfall',
        description: 'High precipitation in the last 7 days may affect field conditions.',
        actions: ['Check for waterlogging', 'Ensure proper drainage', 'Delay planting if soil is waterlogged']
      });
    }

    // Temperature recommendations
    const currentTemp = satelliteData.temperature.current;
    if (currentTemp < crop.requirements.temperature.minimum) {
      recommendations.push({
        priority: 'high',
        category: 'weather',
        title: 'Temperature below optimal range',
        description: `Current temperature (${currentTemp}°C) is below crop minimum (${crop.requirements.temperature.minimum}°C).`,
        actions: ['Wait for warmer weather', 'Consider protected cultivation', 'Use mulching to retain soil warmth']
      });
    }

    // Vegetation health recommendations
    const ndvi = satelliteData.vegetationIndex.ndvi;
    if (ndvi < 0.3) {
      recommendations.push({
        priority: 'medium',
        category: 'soil',
        title: 'Low vegetation activity in area',
        description: 'Satellite data shows low vegetation activity. Consider soil health improvement.',
        actions: ['Test soil nutrients', 'Apply organic matter', 'Consider cover cropping']
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Helper methods

  getSeasonName(month, isNorthernHemisphere) {
    if (isNorthernHemisphere) {
      if (month >= 3 && month <= 5) return 'Spring';
      if (month >= 6 && month <= 8) return 'Summer';
      if (month >= 9 && month <= 11) return 'Fall';
      return 'Winter';
    } else {
      if (month >= 3 && month <= 5) return 'Fall';
      if (month >= 6 && month <= 8) return 'Winter';
      if (month >= 9 && month <= 11) return 'Spring';
      return 'Summer';
    }
  }

  getGrowthRateMultiplier(temperature, crop) {
    const optimal = crop.requirements.temperature.optimal;
    const min = crop.requirements.temperature.minimum;
    const max = crop.requirements.temperature.maximum;
    
    if (temperature < min || temperature > max) return 1.2; // Slower growth
    if (Math.abs(temperature - optimal) <= 2) return 0.9; // Faster growth
    return 1.0; // Normal growth
  }

  calculateIrrigationFrequency(satelliteData, crop) {
    const basePrecipitation = satelliteData.precipitation.last7Days;
    const soilMoisture = satelliteData.soilMoisture.percentage;
    
    if (basePrecipitation > 30 || soilMoisture > 70) return 10; // Less frequent
    if (basePrecipitation < 10 && soilMoisture < 30) return 3; // More frequent
    return 7; // Normal frequency
  }

  calculateWaterAmount(crop, area, satelliteData) {
    const baseWaterNeed = crop.waterRequirement || 25; // L per m² per week
    const areaInSquareMeters = area * 4047; // Assuming area is in acres
    const precipitationAdjustment = Math.max(0, 1 - (satelliteData.precipitation.last7Days / 30));
    
    return Math.round(baseWaterNeed * areaInSquareMeters * precipitationAdjustment / 7); // Daily amount
  }

  calculateExpectedYield(crop, area, satelliteData) {
    const baseYield = crop.expectedYield || { amount: 3, unit: 'tons/hectare' };
    const areaInHectares = area * 0.4047; // Convert acres to hectares
    
    // Adjust yield based on satellite data
    let yieldMultiplier = 1.0;
    
    // Soil moisture impact
    const soilMoisture = satelliteData.soilMoisture.percentage;
    if (soilMoisture >= 40 && soilMoisture <= 70) yieldMultiplier *= 1.1;
    else if (soilMoisture < 30 || soilMoisture > 80) yieldMultiplier *= 0.8;
    
    // Vegetation health impact
    const ndvi = satelliteData.vegetationIndex.ndvi;
    if (ndvi > 0.6) yieldMultiplier *= 1.2;
    else if (ndvi < 0.3) yieldMultiplier *= 0.7;
    
    const estimatedTotal = baseYield.amount * areaInHectares * yieldMultiplier;
    
    return {
      amount: Math.round(estimatedTotal * 100) / 100,
      unit: baseYield.unit,
      confidence: Math.min(0.95, 0.6 + satelliteData.confidence * 0.3)
    };
  }

  getGrowthStageAtDate(crop, plantDate, targetDate) {
    const daysSincePlanting = targetDate.diff(plantDate, 'days');
    let cumulativeDays = 0;
    
    for (const stage of crop.growthStages) {
      cumulativeDays += stage.duration;
      if (daysSincePlanting <= cumulativeDays) {
        return stage.name;
      }
    }
    
    return 'Maturity';
  }

  calculateFertilizerCost(fertilizationSchedule) {
    // Simplified cost calculation
    return fertilizationSchedule.reduce((total, fert) => {
      const costPerUnit = this.getFertilizerCost(fert.type);
      return total + (fert.totalAmount * costPerUnit);
    }, 0);
  }

  getFertilizerCost(type) {
    const costs = {
      'NPK': 2.5, // per kg
      'Urea': 1.8,
      'Phosphate': 3.2,
      'Potash': 2.0,
      'Organic': 1.5
    };
    return costs[type] || 2.0;
  }

  // Assessment methods

  assessVegetationHealth(vegetationIndex) {
    const ndvi = vegetationIndex.ndvi;
    if (ndvi > 0.7) return { status: 'Excellent', score: 95, description: 'Very healthy vegetation in the area' };
    if (ndvi > 0.5) return { status: 'Good', score: 80, description: 'Healthy vegetation conditions' };
    if (ndvi > 0.3) return { status: 'Moderate', score: 60, description: 'Moderate vegetation activity' };
    return { status: 'Poor', score: 30, description: 'Low vegetation activity, may need soil improvement' };
  }

  assessSoilCondition(soilMoisture) {
    const moisture = soilMoisture.percentage;
    if (moisture >= 40 && moisture <= 70) return { status: 'Optimal', score: 90, description: 'Ideal soil moisture for most crops' };
    if (moisture >= 30 && moisture < 40) return { status: 'Good', score: 75, description: 'Good soil moisture, may need monitoring' };
    if (moisture >= 70 && moisture <= 80) return { status: 'High', score: 70, description: 'High soil moisture, ensure good drainage' };
    if (moisture < 30) return { status: 'Low', score: 40, description: 'Low soil moisture, irrigation recommended' };
    return { status: 'Excessive', score: 30, description: 'Excessive moisture, drainage required' };
  }

  assessWeatherSuitability(temperature, precipitation) {
    const temp = temperature.current;
    const precip = precipitation.last7Days;
    
    let score = 100;
    let issues = [];
    
    if (temp < 10) { score -= 30; issues.push('Temperature too low'); }
    else if (temp > 35) { score -= 20; issues.push('Temperature high'); }
    
    if (precip < 5) { score -= 15; issues.push('Low precipitation'); }
    else if (precip > 50) { score -= 20; issues.push('Excessive rainfall'); }
    
    if (score >= 85) return { status: 'Excellent', score, description: 'Ideal weather conditions' };
    if (score >= 70) return { status: 'Good', score, description: 'Generally favorable weather' };
    if (score >= 50) return { status: 'Moderate', score, description: 'Weather conditions require attention', issues };
    return { status: 'Poor', score, description: 'Challenging weather conditions', issues };
  }

  assessOverallReadiness(satelliteData, crop) {
    const vegHealth = this.assessVegetationHealth(satelliteData.vegetationIndex);
    const soilCondition = this.assessSoilCondition(satelliteData.soilMoisture);
    const weatherSuitability = this.assessWeatherSuitability(satelliteData.temperature, satelliteData.precipitation);
    
    const overallScore = (vegHealth.score + soilCondition.score + weatherSuitability.score) / 3;
    
    if (overallScore >= 80) return { status: 'Ready', score: overallScore, description: 'Conditions are favorable for planting' };
    if (overallScore >= 60) return { status: 'Mostly Ready', score: overallScore, description: 'Generally good conditions with minor concerns' };
    if (overallScore >= 40) return { status: 'Caution', score: overallScore, description: 'Some conditions need improvement' };
    return { status: 'Not Ready', score: overallScore, description: 'Multiple conditions need attention before planting' };
  }

  /**
   * Get list of supported crops
   * @returns {Array} List of supported crop types
   */
  getSupportedCrops() {
    return this.cropDatabase.crops.map(crop => ({
      name: crop.name,
      scientificName: crop.scientificName,
      category: crop.category,
      description: crop.description,
      growingPeriod: crop.growingPeriodDays,
      difficulty: crop.difficulty || 'Medium'
    }));
  }

  /**
   * Validate if location is suitable for agriculture
   * @param {Object} location 
   * @returns {Object} Validation result
   */
  async validateLocation(location) {
    const { latitude, longitude } = location;
    
    // Basic geographical validation
    const validationResult = {
      isValid: true,
      suitabilityScore: 100,
      warnings: [],
      recommendations: []
    };

    // Check for extreme latitudes
    if (Math.abs(latitude) > 65) {
      validationResult.suitabilityScore -= 40;
      validationResult.warnings.push('Extreme latitude - very short growing season');
      validationResult.recommendations.push('Consider greenhouse or protected cultivation');
    }

    // Check for desert regions (simplified logic)
    if ((latitude >= 15 && latitude <= 35) || (latitude >= -35 && latitude <= -15)) {
      if (Math.abs(longitude) < 60) { // Potential desert regions
        validationResult.suitabilityScore -= 20;
        validationResult.warnings.push('Potential arid climate - may require intensive irrigation');
        validationResult.recommendations.push('Ensure adequate water supply and irrigation infrastructure');
      }
    }

    // Check for very high altitudes (approximate)
    // In a real implementation, you would use elevation APIs
    if (validationResult.suitabilityScore < 50) {
      validationResult.isValid = false;
    }

    return validationResult;
  }

  /**
   * Get list of all supported crops
   * @returns {Array} Array of supported crop objects
   */
  getSupportedCrops() {
    return this.cropDatabase.crops.map(crop => ({
      name: crop.name,
      scientificName: crop.scientificName,
      category: crop.category,
      description: crop.description,
      difficulty: crop.difficulty,
      growingPeriodDays: crop.growingPeriodDays,
      // Add emoji based on crop type for the UI
      emoji: this.getCropEmoji(crop.name)
    }));
  }

  /**
   * Get emoji for crop type
   * @param {string} cropName - Name of the crop
   * @returns {string} Emoji representation
   */
  getCropEmoji(cropName) {
    const emojiMap = {
      'wheat': '🌾',
      'rice': '🌾',
      'corn': '🌽',
      'tomato': '🍅',
      'potato': '🥔',
      'onion': '🧅',
      'carrot': '🥕',
      'lettuce': '🥬',
      'spinach': '🥬',
      'cabbage': '🥬',
      'broccoli': '🥦',
      'cauliflower': '🥦',
      'pepper': '🌶️',
      'cucumber': '🥒',
      'eggplant': '🍆',
      'squash': '🎃',
      'pumpkin': '🎃',
      'beans': '🫘',
      'peas': '🟢',
      'sunflower': '🌻',
      'cotton': '☁️',
      'soybean': '🫘',
      'barley': '🌾',
      'oats': '🌾'
    };
    return emojiMap[cropName.toLowerCase()] || '🌱';
  }
}

module.exports = new CropCalendarService();
