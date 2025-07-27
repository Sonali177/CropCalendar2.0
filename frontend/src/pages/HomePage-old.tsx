import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
} from '@mui/material';
import {
  Agriculture,
  Satellite,
  Schedule,
  TrendingUp,
  CheckCircle,
  ArrowForward,
  Nature,
  WaterDrop,
  Thermostat,
  Cloud,
} from '@mui/icons-material';
import SOSButton from '../components/SOSButton';
import { CropCalendarAPI } from '../services/api';

const HomePage: React.FC = () => {
  const handleSOSEmergency = async (emergencyData: any) => {
    try {
      console.log('SOS Emergency Data:', emergencyData);
      // In a real implementation, this would call the API
      const response = await CropCalendarAPI.submitSOSEmergency(emergencyData);
      console.log('Emergency submitted successfully:', response);
      
      // Show success notification (you could use a toast library)
      alert(`Emergency request submitted! 
      Ticket #: ${response.ticketNumber}
      Estimated response time: ${response.estimatedResponseTime}
      
      Emergency responders have been notified.`);
      
    } catch (error) {
      console.error('Failed to submit emergency:', error);
      alert('Failed to submit emergency request. Please try again or call 911 for immediate assistance.');
    }
  };

  const features = [
    {
      icon: <Satellite />,
      title: 'Real-time Satellite Data',
      description: 'Get up-to-date vegetation indices, soil moisture, and weather conditions for your location.',
      color: '#2196F3',
    },
    {
      icon: <Schedule />,
      title: 'Personalized Calendar',
      description: 'Receive customized planting, fertilization, and harvesting schedules based on your specific crop and location.',
      color: '#4CAF50',
    },
    {
      icon: <TrendingUp />,
      title: 'Yield Optimization',
      description: 'Maximize your crop yield with data-driven insights and optimal timing recommendations.',
      color: '#FF9800',
    },
  ];

  const benefits = [
    'Reduce crop failure risk with satellite-informed decisions',
    'Optimize resource usage (water, fertilizer, labor)',
    'Increase yield potential by 15-30%',
    'Save time with automated scheduling',
    'Access weather-adjusted recommendations',
    'Get location-specific agricultural insights',
  ];

  const supportedCrops = [
    'Wheat 🌾', 'Rice 🌾', 'Maize 🌽', 'Tomato 🍅', 'Potato 🥔', 
    'Soybean 🫘', 'Cotton 🌿', 'Sunflower 🌻', 'Barley 🌾', 'Canola 🟡'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 8,
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 0 },
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #4CAF50 100%)',
          color: 'white',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(76,175,80,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139,195,74,0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(46,125,50,0.2) 0%, transparent 50%)
            `,
            zIndex: 1
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: { xs: '100%', md: '40%' },
            height: '100%',
            background: `
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="20" cy="30" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="20" r="1.5" fill="rgba(255,255,255,0.08)"/><circle cx="60" cy="70" r="1" fill="rgba(255,255,255,0.06)"/><path d="M10 90 Q 30 70 50 85 T 90 80" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" fill="none"/><path d="M5 60 Q 25 40 45 55 T 85 50" stroke="rgba(255,255,255,0.08)" stroke-width="0.3" fill="none"/></svg>') no-repeat center/cover
            `,
            opacity: 0.3,
            zIndex: 1
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          {/* Agriculture Background Elements */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: { xs: 10, md: 20 },
              left: { xs: 10, md: 30 },
              fontSize: { xs: '2rem', md: '3rem' },
              opacity: 0.2,
              zIndex: 1
            }}
          >
            🌱
          </Box>
          <Box 
            sx={{ 
              position: 'absolute',
              top: { xs: 20, md: 40 },
              right: { xs: 15, md: 50 },
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              opacity: 0.3,
              zIndex: 1
            }}
          >
            🌾
          </Box>
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: { xs: 20, md: 30 },
              left: { xs: '20%', md: '15%' },
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              opacity: 0.25,
              zIndex: 1
            }}
          >
            🌽
          </Box>
          <Box 
            sx={{ 
              position: 'absolute',
              bottom: { xs: 30, md: 50 },
              right: { xs: '25%', md: '20%' },
              fontSize: { xs: '1.6rem', md: '2.2rem' },
              opacity: 0.2,
              zIndex: 1
            }}
          >
            🍅
          </Box>

          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2,
              position: 'relative',
              zIndex: 2
            }}
          >
            🌾 Smart Agriculture with Satellite Intelligence
          </Typography>
          <Typography 
            variant="h5" 
            paragraph 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto',
              opacity: 0.95,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.3rem' },
              lineHeight: 1.6,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              px: { xs: 2, md: 0 },
              position: 'relative',
              zIndex: 2
            }}
          >
            Transform your farming with AI-powered crop calendars using real-time satellite data, weather intelligence, and precision agriculture insights.
          </Typography>
          
          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: { xs: 2, sm: 3 },
            mt: 4,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button
              component={Link}
              to="/crop-calendar"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ 
                px: { xs: 4, md: 5 }, 
                py: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.95)',
                color: 'primary.dark',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 2,
                '&:hover': { 
                  bgcolor: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              🚀 Generate Your Crop Calendar
            </Button>

            <Button
              component={Link}
              to="/sustainable-practices"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ 
                px: { xs: 4, md: 5 }, 
                py: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                bgcolor: 'rgba(139,195,74,0.95)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 2,
                '&:hover': { 
                  bgcolor: '#8BC34A',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              🌱 Sustainable Practices
            </Button>

            <Button
              component={Link}
              to="/weather"
              variant="contained"
              size="large"
              endIcon={<Cloud />}
              sx={{ 
                px: { xs: 4, md: 5 }, 
                py: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                bgcolor: 'rgba(33,150,243,0.95)',
                color: 'white',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 2,
                '&:hover': { 
                  bgcolor: '#2196F3',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              🌤️ Weather Overview
            </Button>
            
            {/* SOS Emergency Button */}
            <SOSButton onEmergencySubmit={handleSOSEmergency} />
          </Box>
        </Box>
      </Box>

      {/* Crops Showcase Section */}
      <Paper 
        sx={{ 
          p: { xs: 3, md: 6 }, 
          mb: 8, 
          background: 'linear-gradient(135deg, #F1F8E9 0%, #E8F5E8 100%)',
          borderRadius: 4,
          border: '1px solid rgba(76,175,80,0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom 
          sx={{ 
            mb: 4,
            color: 'primary.dark',
            fontWeight: 600,
            fontSize: { xs: '1.8rem', md: '2.2rem' }
          }}
        >
          🌱 Supported Crops
        </Typography>
        
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)', 
              sm: 'repeat(3, 1fr)', 
              md: 'repeat(5, 1fr)' 
            },
            gap: { xs: 2, md: 3 },
            mb: 4
          }}
        >
          {[
            { name: 'Wheat', emoji: '🌾', color: '#D4B831', desc: 'Winter & Spring' },
            { name: 'Rice', emoji: '🌾', color: '#8BC34A', desc: 'Paddy Cultivation' },
            { name: 'Maize', emoji: '🌽', color: '#FFC107', desc: 'High Yield Corn' },
            { name: 'Tomato', emoji: '🍅', color: '#F44336', desc: 'Greenhouse Ready' },
            { name: 'Potato', emoji: '🥔', color: '#8D6E63', desc: 'Root Vegetable' },
            { name: 'Soybean', emoji: '🫘', color: '#4CAF50', desc: 'Protein Rich' },
            { name: 'Cotton', emoji: '🌿', color: '#66BB6A', desc: 'Fiber Crop' },
            { name: 'Sunflower', emoji: '🌻', color: '#FFB300', desc: 'Oil Seeds' },
            { name: 'Barley', emoji: '🌾', color: '#A1887F', desc: 'Brewing & Feed' },
            { name: 'Canola', emoji: '🟡', color: '#FFCA28', desc: 'Oilseed Rape' }
          ].map((crop, index) => (
            <Card
              key={index}
              sx={{
                p: { xs: 2, md: 3 },
                textAlign: 'center',
                background: `linear-gradient(135deg, ${crop.color}15 0%, ${crop.color}08 100%)`,
                border: `2px solid ${crop.color}40`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px) scale(1.05)',
                  boxShadow: `0 12px 25px ${crop.color}40`,
                  border: `2px solid ${crop.color}80`
                }
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  mb: 1,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              >
                {crop.emoji}
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.dark',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  mb: 0.5
                }}
              >
                {crop.name}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', md: '0.75rem' },
                  fontWeight: 500
                }}
              >
                {crop.desc}
              </Typography>
            </Card>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 500,
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            📈 Each crop comes with personalized growth stages, optimal planting windows, and satellite-informed care schedules
          </Typography>
        </Box>
      </Paper>

      {/* Features Section */}
      <Typography 
        variant="h2" 
        component="h2" 
        textAlign="center" 
        gutterBottom 
        sx={{ 
          mb: 6,
          color: 'primary.dark',
          fontWeight: 600,
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        🛰️ How Our Technology Works
      </Typography>
      
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3, md: 4 }} sx={{ mb: 10 }}>
        {features.map((feature, index) => (
          <Card
            key={index}
            sx={{
              flex: 1,
              height: '100%',
              background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
              border: '2px solid transparent',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: { xs: 'translateY(-4px)', md: 'translateY(-8px) scale(1.02)' },
                boxShadow: '0 20px 40px rgba(76,175,80,0.3)',
                borderColor: feature.color,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFF8 100%)',
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: { xs: 3, md: 4 } }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  p: { xs: 2, md: 3 },
                  borderRadius: '50%',
                  bgcolor: `${feature.color}15`,
                  color: feature.color,
                  mb: { xs: 2, md: 3 },
                  border: `2px solid ${feature.color}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(10deg) scale(1.1)',
                    bgcolor: feature.color,
                    color: 'white',
                  }
                }}
              >
                {React.cloneElement(feature.icon, { sx: { fontSize: { xs: 28, md: 36 } } })}
              </Box>
              <Typography 
                variant="h5" 
                component="h3" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'primary.dark',
                  mb: 2,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                {feature.title}
              </Typography>
              <Typography 
                color="text.secondary" 
                sx={{ 
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', md: '1rem' }
                }}
              >
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Benefits and Supported Crops Section */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} sx={{ mb: 8 }}>
        {/* Benefits */}
        <Box sx={{ flex: 2 }}>
          <Paper 
            sx={{ 
              p: 5, 
              height: '100%',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFF8 100%)',
              borderRadius: 3,
              border: '1px solid rgba(76,175,80,0.2)',
              boxShadow: '0 8px 32px rgba(76,175,80,0.1)',
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom 
              sx={{ 
                color: 'primary.dark',
                fontWeight: 600,
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              ✨ Why Choose Our Platform?
            </Typography>
            <List sx={{ '& .MuiListItem-root': { py: 1.5 } }}>
              {benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon>
                    <CheckCircle 
                      sx={{ 
                        color: 'success.main',
                        fontSize: 28,
                        filter: 'drop-shadow(2px 2px 4px rgba(76,175,80,0.3))'
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={benefit} 
                    sx={{ 
                      '& .MuiListItemText-primary': {
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: 'text.primary'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Supported Crops */}
        <Box sx={{ flex: 1 }}>
          <Paper 
            sx={{ 
              p: 5, 
              height: '100%', 
              background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
              color: 'white',
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 80,
                height: 80,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 2 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                🌱 Supported Crops
              </Typography>
              <Typography 
                variant="body2" 
                paragraph 
                sx={{ 
                  opacity: 0.9,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  mb: 3
                }}
              >
                Get AI-powered calendars for various crop types with satellite-informed insights:
              </Typography>
              <Stack spacing={2}>
                {supportedCrops.map((crop, index) => {
                  const cropEmojis = ['🌾', '🌾', '🌽', '🍅', '🥔'];
                  return (
                    <Box
                      key={crop}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.25)',
                          transform: 'translateX(8px)'
                        }
                      }}
                    >
                      <Typography sx={{ fontSize: '1.5rem' }}>
                        {cropEmojis[index]}
                      </Typography>
                      <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                        {crop}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 3, 
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  fontStyle: 'italic'
                }}
              >
                + Many more varieties with seasonal optimization...
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Stack>

      {/* Satellite Data Preview */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 8,
          p: 6,
          background: 'linear-gradient(135deg, #F1F8E9 0%, #E8F5E8 100%)',
          borderRadius: 3,
          position: 'relative'
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            color: 'primary.dark',
            fontWeight: 600,
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.2rem' }
          }}
        >
          🛰️ Real-time Agricultural Intelligence
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            maxWidth: '800px',
            mx: 'auto',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            mb: 4
          }}
        >
          Our platform integrates multiple satellite data sources and AI algorithms to provide comprehensive agricultural insights for precision farming decisions.
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ mt: 5 }}>
          <Box 
            sx={{ 
              flex: 1, 
              textAlign: 'center',
              p: 3,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                bgcolor: 'white',
                boxShadow: '0 10px 30px rgba(76,175,80,0.2)'
              }
            }}
          >
            <Nature sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Vegetation Health</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              NDVI and EVI indices to monitor crop health, growth patterns, and stress detection
            </Typography>
          </Box>
          <Box 
            sx={{ 
              flex: 1, 
              textAlign: 'center',
              p: 3,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                bgcolor: 'white',
                boxShadow: '0 10px 30px rgba(33,150,243,0.2)'
              }
            }}
          >
            <WaterDrop sx={{ fontSize: 60, color: 'info.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Soil Moisture</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Real-time soil moisture levels to optimize irrigation schedules and water management
            </Typography>
          </Box>
          <Box 
            sx={{ 
              flex: 1, 
              textAlign: 'center',
              p: 3,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.7)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                bgcolor: 'white',
                boxShadow: '0 10px 30px rgba(255,152,0,0.2)'
              }
            }}
          >
            <Thermostat sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Weather Intelligence</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Temperature, precipitation, and climate forecasts for your specific farming area
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 4,
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 30%, #388E3C 70%, #4CAF50 100%)',
          color: 'white',
          borderRadius: 4,
          mt: 6,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -100,
            left: -100,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 160,
            height: 160,
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '2rem', md: '2.8rem' }
            }}
          >
            🚀 Ready to Transform Your Farming?
          </Typography>
          <Typography 
            variant="h6" 
            paragraph 
            sx={{ 
              opacity: 0.95, 
              maxWidth: '700px', 
              mx: 'auto',
              lineHeight: 1.6,
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            Join thousands of progressive farmers who are already using satellite-informed crop calendars to increase yields by up to 30% and reduce risks.
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={3} 
            justifyContent="center"
            alignItems="center"
          >
            <Button
              component={Link}
              to="/crop-calendar"
              variant="contained"
              size="large"
              endIcon={<Agriculture />}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.95)',
                color: 'primary.dark',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                '&:hover': { 
                  bgcolor: 'white',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              🌾 Start Your Crop Calendar
            </Button>
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.8,
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              ⭐ Free to start • No credit card required
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
