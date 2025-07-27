import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Tab,
  Tabs,
  IconButton,
  Divider,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Fab
} from '@mui/material';
import {
  CalendarToday,
  TrendingUp,
  ArrowUpward,
  ArrowDownward,
  MyLocation,
  Edit,
  WbTwilight
} from '@mui/icons-material';
import { CropCalendarAPI } from '../services/api';
import { WeatherThemeProvider } from '../theme/WeatherThemeProvider';
import { weatherStyles } from '../theme/weatherTheme';
import {
  WeatherSunnyIcon,
  WeatherCloudyIcon,
  WeatherRainyIcon,
  WeatherStormyIcon,
  WeatherSnowyIcon,
  LocationIcon,
  RefreshIcon,
  TemperatureIcon,
  HumidityIcon,
  WindIcon,
  VisibilityIcon,
  SearchIcon
} from '../components/icons/AppIcons';

interface WeatherData {
  current?: any;
  forecast?: any;
  metadata?: any;
}

interface LocationData {
  latitude: number;
  longitude: number;
  name?: string;
  country?: string;
  state?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Popular cities for quick selection
const POPULAR_CITIES = [
  { name: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090 },
  { name: 'Mumbai', country: 'India', latitude: 19.0760, longitude: 72.8777 },
  { name: 'Bangalore', country: 'India', latitude: 12.9716, longitude: 77.5946 },
  { name: 'Chennai', country: 'India', latitude: 13.0827, longitude: 80.2707 },
  { name: 'Kolkata', country: 'India', latitude: 22.5726, longitude: 88.3639 },
  { name: 'Hyderabad', country: 'India', latitude: 17.3850, longitude: 78.4867 },
  { name: 'Pune', country: 'India', latitude: 18.5204, longitude: 73.8567 },
  { name: 'Ahmedabad', country: 'India', latitude: 23.0225, longitude: 72.5714 },
  { name: 'New York', country: 'USA', latitude: 40.7128, longitude: -74.0060 },
  { name: 'London', country: 'UK', latitude: 51.5074, longitude: -0.1278 },
  { name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
  { name: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093 }
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`weather-tabpanel-${index}`}
      aria-labelledby={`weather-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [location, setLocation] = useState<LocationData>({ 
    latitude: 28.6139, 
    longitude: 77.2090, 
    name: 'Delhi',
    country: 'India'
  });
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [customLatitude, setCustomLatitude] = useState('');
  const [customLongitude, setCustomLongitude] = useState('');
  const [selectedCity, setSelectedCity] = useState<any>(null);

  useEffect(() => {
    // Try to get user's current location on component mount
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherData();
    }
  }, [location]);

  const getCurrentLocation = () => {
    setGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            name: 'Current Location',
            country: ''
          });
          setGettingLocation(false);
        },
        (error) => {
          console.warn('❌ Geolocation error:', error.message);
          setGettingLocation(false);
          // Keep default location (Delhi) if geolocation fails
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      console.warn('❌ Geolocation not supported');
      setGettingLocation(false);
    }
  };

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await CropCalendarAPI.getComprehensiveWeatherData(
        location.latitude,
        location.longitude,
        15 // Get 15-day forecast
      );
      
      setWeatherData(response);
      
    } catch (err: any) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLocationDialogOpen = () => {
    setLocationDialogOpen(true);
    setCustomLatitude(location.latitude.toString());
    setCustomLongitude(location.longitude.toString());
    setSelectedCity(POPULAR_CITIES.find(city => 
      Math.abs(city.latitude - location.latitude) < 0.1 && 
      Math.abs(city.longitude - location.longitude) < 0.1
    ) || null);
  };

  const handleLocationDialogClose = () => {
    setLocationDialogOpen(false);
    setCustomLatitude('');
    setCustomLongitude('');
    setSelectedCity(null);
  };

  const handleCitySelect = (city: any) => {
    if (city) {
      setLocation({
        latitude: city.latitude,
        longitude: city.longitude,
        name: city.name,
        country: city.country
      });
      setLocationDialogOpen(false);
    }
  };

  const handleCustomLocationSet = () => {
    const lat = parseFloat(customLatitude);
    const lon = parseFloat(customLongitude);
    
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      alert('Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180)');
      return;
    }
    
    setLocation({
      latitude: lat,
      longitude: lon,
      name: 'Custom Location',
      country: ''
    });
    setLocationDialogOpen(false);
  };

  const getWeatherIcon = (iconCode: string, size: 'small' | 'medium' | 'large' = 'medium') => {
    const iconSize = size === 'small' ? 24 : size === 'medium' ? 32 : 48;
    const iconProps = { 
      sx: { 
        fontSize: iconSize,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
        transition: 'all 0.3s ease'
      } 
    };
    
    switch (iconCode?.slice(0, 2)) {
      case '01': return <WeatherSunnyIcon {...iconProps} />;
      case '02': return <WeatherCloudyIcon {...iconProps} />;
      case '03':
      case '04': return <WeatherCloudyIcon {...iconProps} />;
      case '09':
      case '10': return <WeatherRainyIcon {...iconProps} />;
      case '11': return <WeatherStormyIcon {...iconProps} />;
      case '13': return <WeatherSnowyIcon {...iconProps} />;
      default: return <WeatherSunnyIcon {...iconProps} />;
    }
  };

  const formatTemperature = (temp: number) => `${temp}°C`;

  const getCurrentWeatherCard = () => {
    if (!weatherData.current) {
      console.warn('⚠️ No current weather data available');
      return null;
    }

    const current = weatherData.current;
    
    // Debug logging
    
    return (
      <Card className="current-weather" sx={{ 
        background: `linear-gradient(135deg, 
          ${weatherStyles.backgroundGradients.default} 0%, 
          rgba(33, 150, 243, 0.9) 50%, 
          rgba(21, 101, 192, 0.95) 100%)`,
        color: '#ffffff',
        mb: 3,
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(33, 150, 243, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.1,
          pointerEvents: 'none'
        }
      }}>
                <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <LocationIcon className="weather-icon-white" sx={{ fontSize: 24, opacity: 0.9 }} />
                <Typography variant="h5" className="weather-current-text" sx={{ 
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  {current.location?.name || location.name || 'Unknown Location'}
                </Typography>
                {current.location?.country && (
                  <Chip 
                    className="weather-chip"
                    label={current.location.country}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}
                  />
                )}
                <Chip 
                  label="LIVE" 
                  size="small" 
                  sx={{
                    bgcolor: '#4CAF50',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                      '100%': { opacity: 1 }
                    }
                  }}
                />
              </Box>
              
              <Typography variant="body2" className="weather-current-text" sx={{ 
                opacity: 0.8, 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                🌍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </Typography>
              
              <Typography variant="body2" className="weather-current-text" sx={{ 
                opacity: 0.8, 
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                ⏰ Last updated: {new Date(current.lastUpdated).toLocaleTimeString()}
              </Typography>
              
              {/* Main Weather Display */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box sx={{ 
                  position: 'relative',
                  '& .weather-icon': {
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                    transform: 'scale(1.2)'
                  }
                }}>
                  {getWeatherIcon(current.weather?.icon || '01d', 'large')}
                </Box>
                <Box>
                  <Typography variant="h2" className="weather-current-text" sx={{ 
                    fontWeight: 800, 
                    lineHeight: 1,
                    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {formatTemperature(current.current?.temperature || 0)}
                  </Typography>
                  <Typography variant="h6" className="weather-current-text" sx={{ 
                    opacity: 0.9, 
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    mt: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}>
                    {current.weather?.description || current.weather?.main || 'Loading...'}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <IconButton 
                onClick={fetchWeatherData} 
                disabled={loading}
                sx={{ 
                  color: 'white', 
                  bgcolor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.25)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <RefreshIcon sx={{ 
                  animation: loading ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }} />
              </IconButton>
              
              <Chip 
                className="weather-chip"
                label={current.source || 'Unknown Source'}
                size="small"
                sx={{ 
                  bgcolor: current.source === 'OpenWeatherMap' ? 'rgba(76, 175, 80, 0.8)' : 'rgba(255, 152, 0, 0.8)',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              />
            </Box>
          </Box>

          {/* Enhanced Weather Stats Grid */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, 
            gap: 3, 
            mb: 4 
          }}>
            <Box sx={{ 
              textAlign: 'center',
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
                transform: 'translateY(-2px)'
              }
            }}>
              <TemperatureIcon sx={{ fontSize: 28, mb: 1, opacity: 0.9, color: '#FF7043' }} />
              <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Feels Like
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                {formatTemperature(current.current?.feelsLike || 0)}
              </Typography>
            </Box>
            
            <Box sx={{ 
              textAlign: 'center',
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
                transform: 'translateY(-2px)'
              }
            }}>
              <HumidityIcon sx={{ fontSize: 28, mb: 1, opacity: 0.9, color: '#42A5F5' }} />
              <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Humidity
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                {current.current?.humidity || 0}%
              </Typography>
            </Box>
            
            <Box sx={{ 
              textAlign: 'center',
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
                transform: 'translateY(-2px)'
              }
            }}>
              <WindIcon sx={{ fontSize: 28, mb: 1, opacity: 0.9, color: '#66BB6A' }} />
              <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Wind
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                {current.wind?.speed || 0} km/h
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>
                {current.wind?.directionText || 'N'}
              </Typography>
            </Box>
            
            <Box sx={{ 
              textAlign: 'center',
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
                transform: 'translateY(-2px)'
              }
            }}>
              <VisibilityIcon sx={{ fontSize: 28, mb: 1, opacity: 0.9, color: '#AB47BC' }} />
              <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Visibility
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                {current.current?.visibility || 0} km
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.3)' }} />

          {/* Enhanced Temperature Range and Sun Times */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, 
            gap: 3,
            mb: 2
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <ArrowUpward sx={{ fontSize: 24, color: '#FF7043' }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.75rem' }}>
                  High
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatTemperature(current.current?.maxTemp || 0)}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <ArrowDownward sx={{ fontSize: 24, color: '#42A5F5' }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.75rem' }}>
                  Low
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatTemperature(current.current?.minTemp || 0)}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <WbTwilight sx={{ fontSize: 24, color: '#FFD54F' }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.75rem' }}>
                  Sunrise
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {new Date(current.sun?.sunrise || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <WbTwilight sx={{ fontSize: 24, color: '#FF7043', transform: 'rotate(180deg)' }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.75rem' }}>
                  Sunset
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {new Date(current.sun?.sunset || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const getForecastCards = (days: number) => {
    if (!weatherData.forecast?.forecast) return null;

    const forecastData = weatherData.forecast.forecast.slice(0, days);

    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)' }, gap: 2 }}>
        {forecastData.map((day: any, index: number) => (
          <Card key={day.date} sx={{ 
            height: '100%',
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                {getWeatherIcon(day.weather?.icon || '01d', 'medium')}
              </Box>
              
              <Typography variant="caption" sx={{ 
                display: 'block', 
                textAlign: 'center', 
                mb: 2, 
                textTransform: 'capitalize',
                color: 'text.secondary' 
              }}>
                {day.weather?.description || 'Clear'}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>
                  {formatTemperature(day.temperature?.max || 0)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                  {formatTemperature(day.temperature?.min || 0)}
                </Typography>
              </Box>
              
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Humidity
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {day.humidity || 0}%
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Wind
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {day.windSpeed || 0} km/h
                  </Typography>
                </Box>
                
                {day.precipitation > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Rain
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {day.precipitation} mm
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
          <CircularProgress size={60} sx={{ color: '#4CAF50', mb: 3 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            Loading Weather Data...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fetching real-time weather conditions and forecasts
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={fetchWeatherData}>
              Retry
            </Button>
          }
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Weather Data Unavailable
          </Typography>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <WeatherThemeProvider>
      <Container maxWidth="lg" sx={{ 
        py: 4, 
        background: weatherStyles.backgroundGradients.default,
        minHeight: '100vh',
        borderRadius: 0,
      }}>
        {/* Header with Location Controls */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="h3" className="weather-title" sx={{ fontWeight: 700, mb: 1, color: '#ffffff' }}>
                🌤️ Weather Overview
              </Typography>
              <Typography variant="h6" className="weather-current-text" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 400, mb: 2 }}>
                Real-time weather conditions and multi-day forecasts
              </Typography>
              
              {/* Current Location Display */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LocationIcon className="weather-icon-white" sx={{ fontSize: 20 }} />
              <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                {location.name || 'Unknown Location'}
                {location.country && `, ${location.country}`}
              </Typography>
              <Chip 
                label={`${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
                size="small"
                variant="outlined"
                sx={{ ml: 1 }}
              />
              <IconButton 
                onClick={handleLocationDialogOpen}
                size="small"
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  ml: 1,
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                <Edit sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
          
          {/* Location Action Buttons */}
          <Stack direction="row" spacing={1}>
            <Button
              onClick={getCurrentLocation}
              disabled={gettingLocation}
              variant="outlined"
              className="weather-action"
              startIcon={gettingLocation ? <CircularProgress size={16} /> : <MyLocation className="weather-icon-white" />}
              size="small"
              sx={{ borderRadius: 2, borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff' }}
            >
              {gettingLocation ? 'Getting...' : 'Use Current Location'}
            </Button>
            <Button
              onClick={handleLocationDialogOpen}
              variant="contained"
              className="weather-action"
              startIcon={<SearchIcon className="weather-icon-white" />}
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Change Location
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Current Weather */}
      {getCurrentWeatherCard()}

      {/* Forecast Tabs */}
      <Paper className="weather-data-card" sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: weatherStyles.shadows.weatherCard }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'rgba(33, 150, 243, 0.05)' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            className="weather-tabs"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                py: 2
              }
            }}
          >
            <Tab 
              className="weather-tab"
              label="7-Day Forecast" 
              icon={<CalendarToday className="weather-icon" />} 
              iconPosition="start"
            />
            <Tab 
              className="weather-tab"
              label="15-Day Forecast" 
              icon={<TrendingUp className="weather-icon" />} 
              iconPosition="start"
            />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" className="weather-title" sx={{ mb: 3, fontWeight: 600 }}>
            📅 Next 7 Days
          </Typography>
          {getForecastCards(7)}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" className="weather-title" sx={{ mb: 3, fontWeight: 600 }}>
            📈 Extended 15-Day Forecast
          </Typography>
          {getForecastCards(15)}
        </TabPanel>
      </Paper>

      {/* Footer Info */}
      <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          Weather data sourced from OpenWeatherMap API • Updated every hour • 
          Coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Typography>
      </Box>

      {/* Location Selection Dialog */}
      <Dialog 
        open={locationDialogOpen} 
        onClose={handleLocationDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon sx={{ color: 'primary.main' }} />
            Change Weather Location
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            
            {/* Popular Cities */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                📍 Popular Cities
              </Typography>
              <Autocomplete
                value={selectedCity}
                onChange={(event, newValue) => setSelectedCity(newValue)}
                options={POPULAR_CITIES}
                getOptionLabel={(option) => `${option.name}, ${option.country}`}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Select a city"
                    variant="outlined"
                    fullWidth
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {option.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.country} • {option.latitude.toFixed(4)}, {option.longitude.toFixed(4)}
                      </Typography>
                    </Box>
                  </Box>
                )}
              />
              {selectedCity && (
                <Button
                  onClick={() => handleCitySelect(selectedCity)}
                  variant="contained"
                  startIcon={<LocationIcon />}
                  sx={{ mt: 2 }}
                  fullWidth
                >
                  Use {selectedCity.name}, {selectedCity.country}
                </Button>
              )}
            </Box>

            <Divider />

            {/* Custom Coordinates */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                🌐 Custom Coordinates
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                <TextField
                  label="Latitude"
                  type="number"
                  value={customLatitude}
                  onChange={(e) => setCustomLatitude(e.target.value)}
                  placeholder="e.g., 28.6139"
                  inputProps={{ step: 0.0001, min: -90, max: 90 }}
                  helperText="Range: -90 to 90"
                />
                <TextField
                  label="Longitude"
                  type="number"
                  value={customLongitude}
                  onChange={(e) => setCustomLongitude(e.target.value)}
                  placeholder="e.g., 77.2090"
                  inputProps={{ step: 0.0001, min: -180, max: 180 }}
                  helperText="Range: -180 to 180"
                />
              </Box>
              <Button
                onClick={handleCustomLocationSet}
                variant="outlined"
                startIcon={<SearchIcon />}
                fullWidth
                disabled={!customLatitude || !customLongitude}
              >
                Use Custom Coordinates
              </Button>
            </Box>

            <Divider />

            {/* Current Location Option */}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                📱 Device Location
              </Typography>
              <Button
                onClick={() => {
                  getCurrentLocation();
                  setLocationDialogOpen(false);
                }}
                variant="outlined"
                startIcon={gettingLocation ? <CircularProgress size={16} /> : <MyLocation />}
                fullWidth
                disabled={gettingLocation}
                sx={{ 
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.50'
                  }
                }}
              >
                {gettingLocation ? 'Getting Your Location...' : 'Use My Current Location'}
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleLocationDialogClose} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button for Quick Location Change */}
      <Fab
        className="weather-fab"
        onClick={handleLocationDialogOpen}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <LocationIcon className="weather-icon-white" />
      </Fab>
    </Container>
    </WeatherThemeProvider>
  );
};

export default WeatherPage;
