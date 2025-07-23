import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Paper,
  Stack,
  Fade,
  Grow
} from '@mui/material';
import { 
  CheckCircle, 
  WbSunny, 
  AccessTime,
} from '@mui/icons-material';
import { SupportedCrop } from '../types';

interface CropSelectionStepProps {
  crops: SupportedCrop[];
  selectedCrop?: string;
  onCropSelect?: (crop: SupportedCrop) => void;
}

const CropSelectionStep: React.FC<CropSelectionStepProps> = ({ 
  crops, 
  selectedCrop, 
  onCropSelect 
}) => {
  const [hoveredCrop, setHoveredCrop] = useState<string | null>(null);

  // Crop images and additional data
  const cropData = {
    wheat: {
      emoji: '🌾',
      description: 'Hardy cereal grain ideal for temperate climates',
      growthPeriod: '90-120 days',
      season: 'Winter/Spring',
      difficulty: 'Easy',
      characteristics: ['Drought tolerant', 'Cold hardy', 'High yield potential']
    },
    rice: {
      emoji: '🌾',
      description: 'Staple grain crop requiring flooded conditions',
      growthPeriod: '100-130 days',
      season: 'Summer',
      difficulty: 'Medium',
      characteristics: ['Water intensive', 'High nutrition', 'Multiple varieties']
    },
    maize: {
      emoji: '🌽',
      description: 'Versatile cereal crop with high energy content',
      growthPeriod: '80-110 days',
      season: 'Summer',
      difficulty: 'Easy',
      characteristics: ['Heat loving', 'Fast growing', 'High yield']
    },
    tomato: {
      emoji: '🍅',
      description: 'Popular fruit vegetable rich in nutrients',
      growthPeriod: '70-90 days',
      season: 'Summer',
      difficulty: 'Medium',
      characteristics: ['Heat sensitive', 'Disease prone', 'High value']
    },
    potato: {
      emoji: '🥔',
      description: 'Underground tuber crop with global importance',
      growthPeriod: '90-120 days',
      season: 'Spring/Fall',
      difficulty: 'Easy',
      characteristics: ['Cool weather', 'Storage friendly', 'Versatile use']
    },
    soybean: {
      emoji: '🫘',
      description: 'High-protein legume with nitrogen-fixing ability',
      growthPeriod: '90-110 days',
      season: 'Spring/Summer',
      difficulty: 'Medium',
      characteristics: ['Nitrogen fixing', 'High protein', 'Soil improving']
    },
    cotton: {
      emoji: '🌿',
      description: 'Primary fiber crop for textile production',
      growthPeriod: '140-160 days',
      season: 'Spring/Summer',
      difficulty: 'Hard',
      characteristics: ['Heat loving', 'Long season', 'High value']
    },
    sunflower: {
      emoji: '🌻',
      description: 'Bright oilseed crop with large flower heads',
      growthPeriod: '100-120 days',
      season: 'Spring/Summer',
      difficulty: 'Easy',
      characteristics: ['Drought tolerant', 'Pollinator friendly', 'Oil production']
    },
    barley: {
      emoji: '🌾',
      description: 'Versatile cereal for food, feed, and brewing',
      growthPeriod: '90-110 days',
      season: 'Winter/Spring',
      difficulty: 'Medium',
      characteristics: ['Cold tolerant', 'Early maturing', 'Multiple uses']
    },
    canola: {
      emoji: '🟡',
      description: 'Cool-season oilseed with bright yellow flowers',
      growthPeriod: '120-140 days',
      season: 'Winter/Spring',
      difficulty: 'Medium',
      characteristics: ['Cool weather', 'Oil production', 'Early flowering']
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          sx={{ 
            color: 'primary.dark',
            fontWeight: 700,
            mb: 2
          }}
        >
          🌱 Select Your Crop
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ 
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Choose from our supported crops to get a personalized satellite-informed calendar with optimal planting and harvesting schedules.
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: { xs: 2, sm: 3, md: 4 },
          mt: 4
        }}
      >
        {crops.map((crop, index) => {
          const cropInfo = cropData[crop.name.toLowerCase() as keyof typeof cropData];
          const isSelected = selectedCrop === crop.name;
          const isHovered = hoveredCrop === crop.name;

          return (
            <Grow
              in={true}
              timeout={300 + index * 100}
              key={crop.name}
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  background: isSelected 
                    ? 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)'
                    : 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
                  border: isSelected 
                    ? '3px solid #4CAF50' 
                    : '2px solid transparent',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: isSelected
                    ? '0 12px 40px rgba(76,175,80,0.3)'
                    : isHovered
                    ? '0 8px 32px rgba(0,0,0,0.15)'
                    : '0 4px 16px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  minHeight: 320
                }}
                onMouseEnter={() => setHoveredCrop(crop.name)}
                onMouseLeave={() => setHoveredCrop(null)}
                onClick={() => onCropSelect?.(crop)}
              >
                {isSelected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 10,
                      bgcolor: 'success.main',
                      borderRadius: '50%',
                      p: 0.5
                    }}
                  >
                    <CheckCircle sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                )}

                <Box
                  sx={{
                    height: 160,
                    background: `linear-gradient(45deg, ${cropInfo?.emoji ? '#F8FFF8' : '#F5F5F5'} 0%, ${cropInfo?.emoji ? '#E8F5E8' : '#EEEEEE'} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 60,
                      height: 60,
                      background: 'radial-gradient(circle, rgba(76,175,80,0.1) 0%, transparent 70%)',
                      borderRadius: '50%'
                    }
                  }}
                >
                  <Typography 
                    sx={{ 
                      fontSize: '4rem',
                      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
                      transition: 'all 0.3s ease',
                      transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                    }}
                  >
                    {cropInfo?.emoji || '🌱'}
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 700,
                      color: 'primary.dark',
                      mb: 1,
                      textTransform: 'capitalize'
                    }}
                  >
                    {crop.name}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.5 }}
                  >
                    {cropInfo?.description || 'Premium crop variety with excellent yield potential'}
                  </Typography>

                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Growth:</strong> {cropInfo?.growthPeriod || '90-120 days'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WbSunny sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Season:</strong> {cropInfo?.season || 'All seasons'}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {cropInfo?.characteristics?.map((char, idx) => (
                        <Chip
                          key={idx}
                          label={char}
                          size="small"
                          sx={{
                            bgcolor: isSelected ? 'success.light' : 'grey.100',
                            color: isSelected ? 'success.dark' : 'text.secondary',
                            fontSize: '0.75rem',
                            height: 24
                          }}
                        />
                      ))}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grow>
          );
        })}
      </Box>

      {selectedCrop && (
        <Fade in={true} timeout={500}>
          <Paper 
            sx={{ 
              mt: 4, 
              p: 4, 
              background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
              border: '2px solid #4CAF50',
              borderRadius: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <CheckCircle sx={{ color: 'success.main', fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                Great Choice! {selectedCrop} Selected
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              You've selected {selectedCrop.toLowerCase()} for your crop calendar. Our satellite-powered system will generate 
              personalized planting, fertilization, and harvesting schedules based on your location and current growing conditions.
            </Typography>
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

export default CropSelectionStep;
