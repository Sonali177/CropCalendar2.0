import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  useTheme, 
  useMediaQuery,
  Card,
  CardContent,
  Chip,
  Fade,
  Grow,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActionTile from '../components/ActionTile';
import SOSButton from '../components/SOSButton';
import { CropCalendarAPI } from '../services/api';
import { designTokens } from '../theme/theme';
// import { AppIcons } from '../components/icons/AppIcons';
import { 
  Agriculture as AgricultureIcon,
  WbSunny as WeatherSunnyIcon,
  Nature as SustainableIcon,
  LocalHospital as EmergencyIcon,
  Event as CropCalendarIcon,
  AccountBalance as GovernmentIcon
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleSOSEmergency = async (emergencyData: any) => {
    try {
      console.log('SOS Emergency Data:', emergencyData);
      const response = await CropCalendarAPI.submitSOSEmergency(emergencyData);
      console.log('Emergency submitted successfully:', response);
      
      alert(`Emergency request submitted! 
      Ticket #: ${response.ticketNumber}
      Estimated response time: ${response.estimatedResponseTime}
      
      Emergency responders have been notified.`);
      
    } catch (error) {
      console.error('Failed to submit emergency:', error);
      alert('Failed to submit emergency request. Please try again or call 911 for immediate assistance.');
    }
  };

  const modules = [
    {
      title: 'Crop Calendar',
      subtitle: 'Personalized calendars with satellite data',
      icon: <CropCalendarIcon sx={{ fontSize: 'inherit' }} />,
      path: '/crop-calendar',
      color: 'primary' as const,
      size: 'lg' as const
    },
    {
      title: 'Weather',
      subtitle: 'Real-time conditions & forecasts',
      icon: <WeatherSunnyIcon sx={{ fontSize: 'inherit' }} />,
      path: '/weather',
      color: 'warning' as const,
      size: 'md' as const
    },
    {
      title: 'Government Schemes',
      subtitle: 'Farmer support programs',
      icon: <GovernmentIcon sx={{ fontSize: 'inherit' }} />,
      path: '/government-schemes',
      color: 'info' as const,
      size: 'md' as const
    },
    {
      title: 'Sustainable Practices',
      subtitle: 'Eco-friendly farming tips',
      icon: <SustainableIcon sx={{ fontSize: 'inherit' }} />,
      path: '/sustainable-practices',
      color: 'earth' as const,
      size: 'md' as const
    },
    {
      title: 'SOS Emergency',
      subtitle: 'Agricultural assistance',
      icon: <EmergencyIcon sx={{ fontSize: 'inherit' }} />,
      path: '/sos-emergency',
      color: 'secondary' as const,
      size: 'md' as const,
      badge: '24/7'
    }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, 
        ${designTokens.colors.primary[50]} 0%, 
        ${designTokens.colors.earth[50]} 30%, 
        ${designTokens.colors.primary[100]} 70%, 
        ${designTokens.colors.earth[100]} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23${designTokens.colors.primary[500].replace('#', '')}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          zIndex: 0,
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1.5, sm: 2, md: 3 },
          position: 'relative',
          zIndex: 1,
          width: '100%',
        }}
      >
        {/* SOS Emergency Button - Fixed Position */}
        <SOSButton onEmergencySubmit={handleSOSEmergency} />

        {/* Hero Section with Agricultural Imagery */}
        <Fade in timeout={1000}>
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 3, sm: 4, md: 5 },
            px: { xs: 0.5, sm: 1 },
            position: 'relative'
          }}>
            {/* Decorative Agriculture Icons */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: -15, sm: -20, md: -30 },
                left: { xs: '5%', sm: '10%', md: '15%' },
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' },
                },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <AgricultureIcon 
                sx={{ 
                  fontSize: { sm: 32, md: 48 }, 
                  color: designTokens.colors.earth[300],
                  opacity: 0.7
                }} 
              />
            </Box>
            
            <Box
              sx={{
                position: 'absolute',
                top: { xs: -10, sm: -15, md: -25 },
                right: { xs: '5%', sm: '15%', md: '20%' },
                animation: 'float 3s ease-in-out infinite 1.5s',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <WeatherSunnyIcon 
                sx={{ 
                  fontSize: { sm: 28, md: 40 }, 
                  color: '#FFA726',
                  opacity: 0.6
                }} 
              />
            </Box>

            <Typography 
              variant={isMobile ? 'h4' : isTablet ? 'h3' : 'h2'} 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: designTokens.typography.fontWeight.bold,
                background: `linear-gradient(135deg, ${designTokens.colors.primary[600]}, ${designTokens.colors.earth[700]})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: { xs: 1.5, sm: 2, md: 3 },
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
                zIndex: 2,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.5rem' },
              }}
            >
              🌱 CropCalendar
            </Typography>
            
            <Typography 
              variant={isMobile ? 'subtitle1' : isTablet ? 'h6' : 'h5'} 
              sx={{ 
                mb: { xs: 1.5, sm: 2, md: 3 },
                fontWeight: designTokens.typography.fontWeight.medium,
                lineHeight: designTokens.typography.lineHeight.relaxed,
                color: designTokens.colors.primary[800],
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                px: { xs: 1, sm: 0 },
              }}
            >
              Smart Agricultural Solutions Powered by Satellite Data
            </Typography>
            
            <Typography 
              variant={isMobile ? 'body2' : 'body1'} 
              color="text.secondary" 
              sx={{ 
                maxWidth: { xs: '100%', sm: 500, md: 600 }, 
                mx: 'auto',
                lineHeight: designTokens.typography.lineHeight.relaxed,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                px: { xs: 1, sm: 2, md: 0 },
              }}
            >
              Optimize your farming with AI-driven insights, real-time weather data, 
              and sustainable agricultural practices tailored to your location.
            </Typography>

            {/* Agricultural Stats */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 1, sm: 2, md: 4 },
                mt: { xs: 2, sm: 3, md: 4 },
                flexWrap: 'wrap',
                px: { xs: 1, sm: 0 },
              }}
            >
              {[
                { label: 'Farmers Helped', value: '10K+', icon: '👨‍🌾' },
                { label: 'Crops Tracked', value: '50+', icon: '🌾' },
                { label: 'Success Rate', value: '95%', icon: '📈' },
              ].map((stat, index) => (
                <Grow in timeout={1000 + index * 200} key={stat.label}>
                  <Chip
                    icon={<span style={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>{stat.icon}</span>}
                    label={
                      <Box sx={{ textAlign: 'center', px: { xs: 0.5, sm: 1 } }}>
                        <Typography 
                          variant={isMobile ? 'subtitle2' : 'h6'} 
                          sx={{ 
                            fontWeight: 'bold', 
                            lineHeight: 1,
                            fontSize: { xs: '0.875rem', sm: '1.25rem' }
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontSize: { xs: '0.6rem', sm: '0.7rem' }
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      backgroundColor: 'white',
                      border: `2px solid ${designTokens.colors.primary[200]}`,
                      height: 'auto',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 0.5, sm: 1 },
                      '& .MuiChip-label': { px: { xs: 1, sm: 2 } },
                      boxShadow: designTokens.shadows.sm,
                      minWidth: { xs: 'auto', sm: 80 },
                    }}
                  />
                </Grow>
              ))}
            </Box>
          </Box>
        </Fade>

        {/* Enhanced Modules Grid with Agricultural Theme */}
        <Fade in timeout={1200}>
          <Box sx={{ mb: { xs: 3, sm: 4, md: 5 } }}>
            <Typography 
              variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h4'} 
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: designTokens.typography.fontWeight.bold,
                color: designTokens.colors.primary[800],
                mb: { xs: 2, sm: 3, md: 4 },
                position: 'relative',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: { xs: 40, sm: 60 },
                  height: 3,
                  backgroundColor: designTokens.colors.earth[500],
                  borderRadius: 2,
                }
              }}
            >
              🚀 Smart Farming Tools
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(2, 1fr)', 
                  md: 'repeat(4, 1fr)',
                },
                gap: { xs: 1.5, sm: 2, md: 3 },
                justifyItems: 'center',
                maxWidth: '100%',
                mx: 'auto',
                px: { xs: 0.5, sm: 0 },
              }}
            >
              {modules.map((module, index) => (
                <Grow in timeout={1000 + index * 200} key={module.title}>
                  <Box sx={{ 
                    width: '100%', 
                    maxWidth: { xs: 160, sm: 180, md: 200 },
                    minWidth: { xs: 140, sm: 160 },
                  }}>
                    <ActionTile
                      title={module.title}
                      subtitle={module.subtitle}
                      icon={module.icon}
                      color={module.color}
                      size={isMobile ? 'sm' : module.size}
                      onClick={() => navigate(module.path)}
                      badge={module.badge}
                    />
                  </Box>
                </Grow>
              ))}
            </Box>
          </Box>
        </Fade>

        {/* Enhanced Features Section with Agricultural Cards */}
        <Fade in timeout={1400}>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: designTokens.borderRadius.xl,
              p: { xs: 2, sm: 3, md: 4 },
              mb: { xs: 3, sm: 4, md: 5 },
              border: `1px solid ${designTokens.colors.neutral[200]}`,
              backdropFilter: 'blur(10px)',
              boxShadow: designTokens.shadows.lg,
              mx: { xs: 0.5, sm: 0 },
            }}
          >
            <Typography 
              variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h4'} 
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{
                fontWeight: designTokens.typography.fontWeight.bold,
                color: designTokens.colors.primary[800],
                mb: { xs: 2, sm: 3, md: 4 },
                position: 'relative',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                '&::before': {
                  content: '"🌾"',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: { xs: -25, sm: -30 },
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }
              }}
            >
              Why Choose CropCalendar?
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: { xs: 2, sm: 2.5, md: 3 },
              }}
            >
              {[
                {
                  title: '🛰️ Real-time Satellite Data',
                  description: 'Get up-to-date vegetation indices, soil moisture, and weather conditions for your location.',
                  color: designTokens.colors.accent[600],
                  icon: '📡',
                  bgGradient: `linear-gradient(135deg, ${designTokens.colors.accent[50]}, ${designTokens.colors.accent[100]})`,
                },
                {
                  title: '📅 Personalized Calendar',
                  description: 'Receive customized planting, fertilization, and harvesting schedules based on your specific crop and location.',
                  color: designTokens.colors.primary[600],
                  icon: '🗓️',
                  bgGradient: `linear-gradient(135deg, ${designTokens.colors.primary[50]}, ${designTokens.colors.primary[100]})`,
                },
                {
                  title: '📈 Yield Optimization',
                  description: 'Maximize your crop yield with data-driven insights and optimal timing recommendations.',
                  color: designTokens.colors.earth[600],
                  icon: '🎯',
                  bgGradient: `linear-gradient(135deg, ${designTokens.colors.earth[50]}, ${designTokens.colors.earth[100]})`,
                },
              ].map((feature, index) => (
                <Grow in timeout={1200 + index * 300} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      background: feature.bgGradient,
                      borderRadius: designTokens.borderRadius.lg,
                      border: `2px solid ${feature.color}20`,
                      boxShadow: designTokens.shadows.md,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: designTokens.shadows.xl,
                        '& .feature-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        background: `radial-gradient(circle, ${feature.color}15 0%, transparent 70%)`,
                        borderRadius: '50%',
                        transform: 'translate(25px, -25px)',
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      p: { xs: 2, sm: 3 }, 
                      textAlign: 'center', 
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}>
                      <Box
                        className="feature-icon"
                        sx={{
                          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                          mb: { xs: 1, sm: 2 },
                          transition: 'transform 0.3s ease',
                          display: 'inline-block',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      
                      <Typography 
                        variant={isMobile ? 'subtitle1' : isTablet ? 'h6' : 'h6'}
                        gutterBottom
                        sx={{
                          fontWeight: designTokens.typography.fontWeight.semibold,
                          color: feature.color,
                          mb: { xs: 1, sm: 2 },
                          lineHeight: 1.3,
                          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography 
                        variant={isMobile ? 'body2' : 'body1'}
                        color="text.secondary"
                        sx={{
                          lineHeight: designTokens.typography.lineHeight.relaxed,
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </Box>
          </Box>
        </Fade>

        {/* Enhanced CTA Section */}
        <Fade in timeout={1600}>
          <Box 
            sx={{ 
              textAlign: 'center',
              background: `linear-gradient(135deg, ${designTokens.colors.primary[100]}, ${designTokens.colors.earth[100]})`,
              borderRadius: designTokens.borderRadius.xl,
              p: { xs: 3, sm: 4, md: 5 },
              border: `2px solid ${designTokens.colors.primary[200]}`,
              position: 'relative',
              overflow: 'hidden',
              mx: { xs: 0.5, sm: 0 },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -50,
                left: -50,
                width: 100,
                height: 100,
                background: `radial-gradient(circle, ${designTokens.colors.earth[300]}20 0%, transparent 70%)`,
                borderRadius: '50%',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -30,
                right: -30,
                width: 80,
                height: 80,
                background: `radial-gradient(circle, ${designTokens.colors.primary[300]}20 0%, transparent 70%)`,
                borderRadius: '50%',
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant={isMobile ? 'h5' : isTablet ? 'h4' : 'h4'} 
                gutterBottom
                sx={{
                  fontWeight: designTokens.typography.fontWeight.bold,
                  color: designTokens.colors.primary[900],
                  mb: { xs: 1.5, sm: 2, md: 3 },
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                }}
              >
                🚀 Ready to Transform Your Farming?
              </Typography>
              
              <Typography 
                variant={isMobile ? 'body1' : isTablet ? 'h6' : 'h6'} 
                color="text.secondary" 
                sx={{ 
                  mb: { xs: 2, sm: 3, md: 4 },
                  lineHeight: designTokens.typography.lineHeight.relaxed,
                  maxWidth: { xs: '100%', sm: 500 },
                  mx: 'auto',
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  px: { xs: 1, sm: 0 },
                }}
              >
                Join thousands of farmers using smart technology to boost their harvest and reduce costs
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 2, sm: 2 }} 
                justifyContent="center" 
                alignItems="center"
                sx={{ px: { xs: 1, sm: 0 } }}
              >
                <Button 
                  variant="contained" 
                  size={isMobile ? 'medium' : 'large'}
                  onClick={() => navigate('/crop-calendar')}
                  sx={{ 
                    px: { xs: 3, sm: 4, md: 5 }, 
                    py: { xs: 1, sm: 1.5, md: 2 },
                    borderRadius: designTokens.borderRadius.lg,
                    fontWeight: designTokens.typography.fontWeight.bold,
                    textTransform: 'none',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    boxShadow: designTokens.shadows.lg,
                    background: `linear-gradient(135deg, ${designTokens.colors.primary[600]}, ${designTokens.colors.primary[700]})`,
                    minWidth: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '100%', sm: '240px' },
                    '&:hover': {
                      boxShadow: designTokens.shadows.xl,
                      transform: 'translateY(-2px)',
                      background: `linear-gradient(135deg, ${designTokens.colors.primary[700]}, ${designTokens.colors.primary[800]})`,
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.5s ease',
                    },
                    '&:hover::before': {
                      left: '100%',
                    }
                  }}
                  startIcon={<CropCalendarIcon />}
                >
                  Start Smart Farming
                </Button>
                
                <Button 
                  variant="outlined" 
                  size={isMobile ? 'medium' : 'large'}
                  onClick={() => navigate('/weather')}
                  sx={{ 
                    px: { xs: 3, sm: 3, md: 4 }, 
                    py: { xs: 1, sm: 1.5, md: 2 },
                    borderRadius: designTokens.borderRadius.lg,
                    fontWeight: designTokens.typography.fontWeight.semibold,
                    textTransform: 'none',
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                    borderColor: designTokens.colors.earth[500],
                    color: designTokens.colors.earth[700],
                    minWidth: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '100%', sm: '200px' },
                    '&:hover': {
                      borderColor: designTokens.colors.earth[600],
                      backgroundColor: designTokens.colors.earth[50],
                      transform: 'translateY(-1px)',
                    },
                  }}
                  startIcon={<WeatherSunnyIcon />}
                >
                  Check Weather
                </Button>
              </Stack>

              {/* Trust Indicators */}
              <Box 
                sx={{ 
                  mt: { xs: 2, sm: 3, md: 4 },
                  pt: { xs: 2, sm: 2, md: 3 },
                  borderTop: `1px solid ${designTokens.colors.neutral[300]}`,
                }}
              >
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  Trusted by farmers worldwide
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={{ xs: 1, sm: 3 }} 
                  justifyContent="center" 
                  alignItems="center"
                >
                  {['⭐ 4.9/5 Rating', '🌍 50+ Countries', '📱 Mobile Ready'].map((item, index) => (
                    <Typography 
                      key={index}
                      variant="caption" 
                      sx={{ 
                        color: designTokens.colors.primary[700],
                        fontWeight: 'medium',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' }
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default HomePage;
