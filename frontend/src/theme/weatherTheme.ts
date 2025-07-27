import { createTheme } from '@mui/material/styles';
import { agriculturalTheme, designTokens } from './theme';

// Weather-specific theme that extends the base agricultural theme
export const weatherTheme = createTheme({
  ...agriculturalTheme,
  
  palette: {
    ...agriculturalTheme.palette,
    primary: {
      light: designTokens.colors.weather[300],
      main: designTokens.colors.weather[500],
      dark: designTokens.colors.weather[700],
      contrastText: '#ffffff',
    },
    background: {
      default: designTokens.colors.weather[50],
      paper: '#ffffff',
    },
  },
  
  components: {
    ...agriculturalTheme.components,
    
    // Weather Card Styling
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.xl,
          background: `linear-gradient(135deg, ${designTokens.colors.weather[50]} 0%, #ffffff 100%)`,
          border: `1px solid ${designTokens.colors.weather[200]}`,
          boxShadow: `0 8px 32px rgba(33, 150, 243, 0.1)`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: `0 12px 40px rgba(33, 150, 243, 0.15)`,
            transform: 'translateY(-4px)',
            borderColor: designTokens.colors.weather[300],
          },
          // Weather data card specific styling
          '&.weather-data-card': {
            background: `linear-gradient(135deg, ${designTokens.colors.weather[100]} 0%, ${designTokens.colors.weather[50]} 100%)`,
            borderColor: designTokens.colors.weather[200],
          },
          // Forecast card styling
          '&.forecast-card': {
            background: `linear-gradient(145deg, ${designTokens.colors.weather[50]} 0%, #ffffff 100%)`,
            borderColor: designTokens.colors.weather[100],
          },
        },
      },
    },
    
    // Weather Paper Components
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          // Weather overview paper
          '&.weather-overview': {
            background: `linear-gradient(135deg, ${designTokens.colors.weather[600]} 0%, ${designTokens.colors.weather[800]} 100%)`,
            color: '#ffffff',
            borderRadius: designTokens.borderRadius.xl,
            padding: designTokens.spacing[6],
            boxShadow: `0 16px 64px rgba(33, 150, 243, 0.2)`,
          },
          // Current weather display
          '&.current-weather': {
            background: `linear-gradient(135deg, ${designTokens.colors.weather[500]} 0%, ${designTokens.colors.weather[700]} 100%)`,
            color: '#ffffff',
            textAlign: 'center',
            padding: designTokens.spacing[8],
            borderRadius: designTokens.borderRadius.xl,
            boxShadow: `0 12px 48px rgba(33, 150, 243, 0.25)`,
          },
        },
      },
    },
    
    // Weather Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          ...agriculturalTheme.components?.MuiButton?.styleOverrides?.root,
          // Weather action buttons
          '&.weather-action': {
            background: `linear-gradient(135deg, ${designTokens.colors.weather[500]} 0%, ${designTokens.colors.weather[600]} 100%)`,
            color: '#ffffff',
            borderRadius: designTokens.borderRadius.lg,
            padding: `${designTokens.spacing[3]} ${designTokens.spacing[6]}`,
            boxShadow: `0 4px 16px rgba(33, 150, 243, 0.3)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${designTokens.colors.weather[600]} 0%, ${designTokens.colors.weather[700]} 100%)`,
              boxShadow: `0 6px 24px rgba(33, 150, 243, 0.4)`,
              transform: 'translateY(-2px)',
            },
          },
          // Location button
          '&.location-button': {
            background: `linear-gradient(135deg, ${designTokens.colors.weather[400]} 0%, ${designTokens.colors.weather[500]} 100%)`,
            color: '#ffffff',
            borderRadius: designTokens.borderRadius.full,
            minWidth: '48px',
            minHeight: '48px',
          },
        },
      },
    },
    
    // Weather Chips
    MuiChip: {
      styleOverrides: {
        root: {
          ...agriculturalTheme.components?.MuiChip?.styleOverrides?.root,
          // Weather condition chips
          '&.weather-chip': {
            background: `linear-gradient(135deg, ${designTokens.colors.weather[100]} 0%, ${designTokens.colors.weather[200]} 100%)`,
            color: designTokens.colors.weather[800],
            fontWeight: designTokens.typography.fontWeight.semibold,
            border: `1px solid ${designTokens.colors.weather[300]}`,
          },
          // Temperature chips
          '&.temperature-chip': {
            background: `linear-gradient(135deg, ${designTokens.colors.weather[500]} 0%, ${designTokens.colors.weather[600]} 100%)`,
            color: '#ffffff',
            fontWeight: designTokens.typography.fontWeight.bold,
            fontSize: designTokens.typography.fontSize.lg,
            height: '36px',
            padding: `0 ${designTokens.spacing[4]}`,
          },
        },
      },
    },
    
    // Weather Typography
    MuiTypography: {
      styleOverrides: {
        root: {
          // Weather titles
          '&.weather-title': {
            color: designTokens.colors.weather[800],
            fontWeight: designTokens.typography.fontWeight.bold,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          },
          // Weather values (temperature, humidity, etc.)
          '&.weather-value': {
            color: designTokens.colors.weather[700],
            fontWeight: designTokens.typography.fontWeight.semibold,
            fontSize: designTokens.typography.fontSize.xl,
          },
          // Weather descriptions
          '&.weather-description': {
            color: designTokens.colors.weather[600],
            fontWeight: designTokens.typography.fontWeight.medium,
          },
          // Current weather text on dark background
          '&.weather-current-text': {
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    
    // Weather Tabs
    MuiTabs: {
      styleOverrides: {
        root: {
          ...agriculturalTheme.components?.MuiTabs?.styleOverrides?.root,
          '&.weather-tabs': {
            backgroundColor: designTokens.colors.weather[100],
            borderRadius: designTokens.borderRadius.lg,
            padding: designTokens.spacing[1],
          },
        },
        indicator: {
          backgroundColor: 'transparent',
        },
      },
    },
    
    MuiTab: {
      styleOverrides: {
        root: {
          ...agriculturalTheme.components?.MuiTab?.styleOverrides?.root,
          '&.weather-tab': {
            borderRadius: designTokens.borderRadius.md,
            color: designTokens.colors.weather[600],
            '&.Mui-selected': {
              backgroundColor: designTokens.colors.weather[500],
              color: '#ffffff',
              boxShadow: `0 2px 8px rgba(33, 150, 243, 0.3)`,
            },
          },
        },
      },
    },
    
    // Weather Icons
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.weather-icon': {
            color: designTokens.colors.weather[600],
            filter: 'drop-shadow(0 2px 4px rgba(33, 150, 243, 0.2))',
          },
          '&.weather-icon-large': {
            fontSize: '4rem',
            color: designTokens.colors.weather[500],
            filter: 'drop-shadow(0 4px 8px rgba(33, 150, 243, 0.3))',
          },
          '&.weather-icon-white': {
            color: '#ffffff',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
          },
        },
      },
    },
    
    // Weather Floating Action Button
    MuiFab: {
      styleOverrides: {
        root: {
          ...agriculturalTheme.components?.MuiFab?.styleOverrides?.root,
          '&.weather-fab': {
            background: `linear-gradient(135deg, ${designTokens.colors.weather[500]} 0%, ${designTokens.colors.weather[600]} 100%)`,
            color: '#ffffff',
            boxShadow: `0 8px 32px rgba(33, 150, 243, 0.3)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${designTokens.colors.weather[600]} 0%, ${designTokens.colors.weather[700]} 100%)`,
              boxShadow: `0 12px 40px rgba(33, 150, 243, 0.4)`,
            },
          },
        },
      },
    },
  },
});

// Weather-specific design utilities
export const weatherStyles = {
  // Background gradients for different weather conditions
  backgroundGradients: {
    sunny: designTokens.colors.weatherConditions.sunny.gradient,
    cloudy: designTokens.colors.weatherConditions.cloudy.gradient,
    rainy: designTokens.colors.weatherConditions.rainy.gradient,
    stormy: designTokens.colors.weatherConditions.stormy.gradient,
    snowy: designTokens.colors.weatherConditions.snowy.gradient,
    default: `linear-gradient(135deg, ${designTokens.colors.weather[500]} 0%, ${designTokens.colors.weather[700]} 100%)`,
  },
  
  // Text colors for optimal contrast
  textColors: {
    onDarkBlue: '#ffffff',
    onLightBlue: designTokens.colors.weather[800],
    onWeatherBg: designTokens.colors.weather[900],
    primary: designTokens.colors.weather[700],
    secondary: designTokens.colors.weather[600],
  },
  
  // Box shadows for weather elements
  shadows: {
    weatherCard: `0 8px 32px rgba(33, 150, 243, 0.1)`,
    weatherCardHover: `0 12px 40px rgba(33, 150, 243, 0.15)`,
    currentWeather: `0 16px 64px rgba(33, 150, 243, 0.2)`,
    weatherButton: `0 4px 16px rgba(33, 150, 243, 0.3)`,
  },
};
