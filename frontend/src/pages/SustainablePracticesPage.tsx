import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  LocationOn as LocationIcon,
  Agriculture as AgricultureIcon,
  Park as EcoIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import SustainablePractices from '../components/SustainablePractices';
import { CropCalendarAPI } from '../services/api';
import { Location, SustainabilityAssessment } from '../types';

const SustainablePracticesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [farmData, setFarmData] = useState({
    location: { latitude: 0, longitude: 0 } as Location,
    landSize: 10,
    cropTypes: [] as string[],
    budget: undefined as number | undefined
  });
  const [assessment, setAssessment] = useState<SustainabilityAssessment | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const steps = ['Farm Details', 'Sustainability Assessment', 'Practice Recommendations'];

  const cropOptions = [
    'wheat', 'rice', 'corn', 'soybeans', 'tomatoes', 'potatoes', 
    'cotton', 'sunflower', 'barley', 'vegetables', 'fruits', 'legumes'
  ];

  useEffect(() => {
    // Get user location on component mount
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFarmData(prev => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to a sample location if geolocation fails
          setFarmData(prev => ({
            ...prev,
            location: { latitude: 40.7128, longitude: -74.0060 }
          }));
          setLocationLoading(false);
        }
      );
    } else {
      setLocationLoading(false);
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      // Moving to assessment step
      await generateAssessment();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const generateAssessment = async () => {
    if (!farmData.location.latitude || !farmData.landSize) return;

    setLoading(true);
    try {
      const assessmentResult = await CropCalendarAPI.getQuickSustainabilityAssessment(
        farmData,
        [] // No current practices initially
      );
      setAssessment(assessmentResult);
    } catch (error) {
      console.error('Error generating assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              mb: 3 
            }}>
              <AgricultureIcon sx={{ color: '#4CAF50' }} />
              Farm Information
            </Typography>

            {/* Location */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  📍 Farm Location
                </Typography>
                
                {locationLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                    <CircularProgress size={20} />
                    <Typography variant="body2">Getting your location...</Typography>
                  </Box>
                ) : (
                  <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                    mt: 2
                  }}>
                    <TextField
                      fullWidth
                      label="Latitude"
                      type="number"
                      value={farmData.location.latitude || ''}
                      onChange={(e) => setFarmData(prev => ({
                        ...prev,
                        location: { ...prev.location, latitude: parseFloat(e.target.value) || 0 }
                      }))}
                      inputProps={{ step: 0.000001 }}
                    />
                    <TextField
                      fullWidth
                      label="Longitude"
                      type="number"
                      value={farmData.location.longitude || ''}
                      onChange={(e) => setFarmData(prev => ({
                        ...prev,
                        location: { ...prev.location, longitude: parseFloat(e.target.value) || 0 }
                      }))}
                      inputProps={{ step: 0.000001 }}
                    />
                  </Box>
                )}
                
                <Button 
                  onClick={getUserLocation}
                  startIcon={<LocationIcon />}
                  variant="outlined"
                  sx={{ mt: 2 }}
                  disabled={locationLoading}
                >
                  {locationLoading ? 'Getting Location...' : 'Use Current Location'}
                </Button>
              </CardContent>
            </Card>

            {/* Farm Size */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  🏞️ Farm Size
                </Typography>
                <TextField
                  fullWidth
                  label="Land Size (acres)"
                  type="number"
                  value={farmData.landSize}
                  onChange={(e) => setFarmData(prev => ({
                    ...prev,
                    landSize: parseFloat(e.target.value) || 0
                  }))}
                  inputProps={{ min: 0.1, step: 0.1 }}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>

            {/* Crop Types */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  🌾 Crop Types (Optional)
                </Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Select Crops</InputLabel>
                  <Select
                    multiple
                    value={farmData.cropTypes}
                    label="Select Crops"
                    onChange={(e) => setFarmData(prev => ({
                      ...prev,
                      cropTypes: typeof e.target.value === 'string' ? [e.target.value] : e.target.value
                    }))}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip 
                            key={value} 
                            label={value.charAt(0).toUpperCase() + value.slice(1)} 
                            size="small" 
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {cropOptions.map((crop) => (
                      <MenuItem key={crop} value={crop}>
                        {crop.charAt(0).toUpperCase() + crop.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            {/* Budget */}
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  💰 Budget (Optional)
                </Typography>
                <TextField
                  fullWidth
                  label="Available Budget (Local Currency)"
                  type="number"
                  value={farmData.budget || ''}
                  onChange={(e) => setFarmData(prev => ({
                    ...prev,
                    budget: parseFloat(e.target.value) || undefined
                  }))}
                  inputProps={{ min: 0 }}
                  sx={{ mt: 2 }}
                  helperText="Enter your available budget for implementing sustainable practices (amounts will be shown in your local currency)"
                />
              </CardContent>
            </Card>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              mb: 3 
            }}>
              <AssessmentIcon sx={{ color: '#4CAF50' }} />
              Sustainability Assessment
            </Typography>

            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
                <CircularProgress size={60} sx={{ color: '#4CAF50', mb: 2 }} />
                <Typography variant="h6">Generating Assessment...</Typography>
                <Typography variant="body2" color="text.secondary">
                  Analyzing your farm and generating sustainability recommendations
                </Typography>
              </Box>
            ) : assessment ? (
              <Box>
                {/* Sustainability Score */}
                <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, color: '#4CAF50', mb: 2 }}>
                      {assessment.sustainabilityScore}%
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Current Sustainability Score
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Based on your farm characteristics and available practices
                    </Typography>
                  </CardContent>
                </Card>

                {/* Quick Wins */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🎯 Quick Wins
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Easy-to-implement practices with immediate benefits:
                    </Typography>
                    <Box sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
                      gap: 2
                    }}>
                      {assessment.quickWins.map((practice) => (
                        <Card key={practice.id} variant="outlined">
                          <CardContent sx={{ p: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              {practice.name}
                            </Typography>
                            <Chip
                              size="small"
                              label={practice.implementation.difficulty}
                              sx={{ bgcolor: '#4CAF50', color: 'white', mb: 1 }}
                            />
                            <Typography variant="caption" display="block">
                              ${practice.implementation.estimatedCost.min}-{practice.implementation.estimatedCost.max} {practice.implementation.estimatedCost.unit}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                {/* Improvement Areas */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      📈 Key Improvement Areas
                    </Typography>
                    <Box sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                      gap: 2
                    }}>
                      {assessment.improvementAreas.map((area, index) => (
                        <Box key={index} sx={{ textAlign: 'center' }}>
                          <Chip
                            label={area.priority.toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: area.priority === 'high' ? '#F44336' : 
                                      area.priority === 'medium' ? '#FF9800' : '#4CAF50',
                              color: 'white',
                              mb: 1
                            }}
                          />
                          <Typography variant="subtitle2" gutterBottom>
                            {area.area}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {area.opportunityCount} opportunities
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>

                {/* Potential Impact */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      🌍 Potential Environmental Impact
                    </Typography>
                    <Box sx={{ 
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr 1fr' },
                      gap: 2,
                      mt: 2
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#2196F3' }}>
                          {assessment.potentialImpact.potentialWaterSavings}
                        </Typography>
                        <Typography variant="caption">Water Savings</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#FF9800' }}>
                          {assessment.potentialImpact.potentialEnergySavings}
                        </Typography>
                        <Typography variant="caption">Energy Savings</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                          {assessment.potentialImpact.carbonReductionPotential}
                        </Typography>
                        <Typography variant="caption">Carbon Reduction</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: '#8BC34A' }}>
                          {assessment.potentialImpact.biodiversityImpact}
                        </Typography>
                        <Typography variant="caption">Biodiversity</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ) : (
              <Alert severity="info">
                Click "Next" to generate your sustainability assessment
              </Alert>
            )}
          </Box>
        );

      case 2:
        return (
          <SustainablePractices
            location={farmData.location}
            landSize={farmData.landSize}
            cropTypes={farmData.cropTypes}
          />
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2 }}
        >
          Back to Home
        </Button>
        
        <Paper sx={{ p: 3, bgcolor: '#F1F8E9', border: '2px solid #4CAF50' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <EcoIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
            <Box>
              <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                🌱 Sustainable Agricultural Practices
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Discover and implement eco-friendly farming practices tailored to your farm
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Content */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => navigate('/')}
                  sx={{ bgcolor: '#4CAF50' }}
                >
                  Return to Home
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    !farmData.location.latitude || 
                    !farmData.location.longitude || 
                    !farmData.landSize ||
                    loading
                  }
                  sx={{ bgcolor: '#4CAF50' }}
                >
                  {loading ? 'Generating...' : 'Next'}
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SustainablePracticesPage;
