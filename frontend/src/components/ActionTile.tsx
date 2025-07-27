import React from 'react';
import { Box, Card, CardContent, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { designTokens } from '../theme/theme';

interface ActionTileProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'earth';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  badge?: string | number;
}

const ActionTile: React.FC<ActionTileProps> = ({
  title,
  subtitle,
  icon,
  onClick,
  color = 'primary',
  size = 'md',
  disabled = false,
  badge,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Responsive tile sizing
  const getTileSize = () => {
    if (isMobile) {
      switch (size) {
        case 'sm': return designTokens.tiles.size.sm;
        case 'lg': return designTokens.tiles.size.md;
        default: return designTokens.tiles.size.sm;
      }
    }
    return designTokens.tiles.size[size];
  };

  // Color mapping
  const getColorScheme = () => {
    const colorMap = {
      primary: {
        bg: designTokens.colors.primary[50],
        hover: designTokens.colors.primary[100],
        border: designTokens.colors.primary[200],
        icon: designTokens.colors.primary[600],
        text: designTokens.colors.primary[800],
      },
      secondary: {
        bg: designTokens.colors.secondary[50],
        hover: designTokens.colors.secondary[100],
        border: designTokens.colors.secondary[200],
        icon: designTokens.colors.secondary[600],
        text: designTokens.colors.secondary[800],
      },
      info: {
        bg: designTokens.colors.accent[50],
        hover: designTokens.colors.accent[100],
        border: designTokens.colors.accent[200],
        icon: designTokens.colors.accent[600],
        text: designTokens.colors.accent[800],
      },
      warning: {
        bg: '#FFF8E1',
        hover: '#FFECB3',
        border: '#FFE082',
        icon: '#F57C00',
        text: '#E65100',
      },
      success: {
        bg: designTokens.colors.primary[50],
        hover: designTokens.colors.primary[100],
        border: designTokens.colors.primary[200],
        icon: designTokens.colors.primary[700],
        text: designTokens.colors.primary[900],
      },
      earth: {
        bg: designTokens.colors.earth[50],
        hover: designTokens.colors.earth[100],
        border: designTokens.colors.earth[200],
        icon: designTokens.colors.earth[600],
        text: designTokens.colors.earth[800],
      },
    };
    return colorMap[color];
  };

  const colorScheme = getColorScheme();
  const tileSize = getTileSize();

  return (
    <Card
      sx={{
        width: tileSize,
        height: tileSize,
        display: 'flex',
        flexDirection: 'column',
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: colorScheme.bg,
        border: `2px solid ${colorScheme.border}`,
        borderRadius: designTokens.borderRadius.lg,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: designTokens.shadows.sm,
        '&:hover': disabled ? {} : {
          transform: 'translateY(-4px) scale(1.02)',
          backgroundColor: colorScheme.hover,
          borderColor: colorScheme.icon,
          boxShadow: designTokens.shadows.lg,
          '& .tile-icon': {
            transform: 'scale(1.15) rotate(5deg)',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
          },
          '& .tile-content': {
            transform: 'translateY(-2px)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          background: `radial-gradient(circle, ${colorScheme.icon}15 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(20px, -20px)',
          opacity: 0.6,
        },
        '&::after': badge ? {
          content: `"${badge}"`,
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: designTokens.colors.secondary[500],
          color: 'white',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          padding: '2px 6px',
          borderRadius: '10px',
          zIndex: 2,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1, transform: 'scale(1)' },
            '50%': { opacity: 0.8, transform: 'scale(1.05)' },
          }
        } : {},
        opacity: disabled ? 0.6 : 1,
      }}
      onClick={disabled ? undefined : onClick}
    >
      {/* Badge */}
      {badge && (
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: theme.palette.error.main,
            color: 'white',
            borderRadius: designTokens.borderRadius.full,
            minWidth: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: designTokens.typography.fontSize.xs,
            fontWeight: designTokens.typography.fontWeight.bold,
            zIndex: 1,
            boxShadow: designTokens.shadows.md,
          }}
        >
          {badge}
        </Box>
      )}

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: designTokens.spacing[4],
          '&:last-child': {
            paddingBottom: designTokens.spacing[4],
          },
        }}
      >
        {/* Icon Container */}
        <Box
          sx={{
            width: isMobile ? '48px' : '56px',
            height: isMobile ? '48px' : '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: designTokens.borderRadius.lg,
            mb: 2,
            boxShadow: designTokens.shadows.sm,
            color: colorScheme.icon,
            transition: 'all 0.2s ease',
            '& > *': {
              fontSize: isMobile ? '24px' : '28px',
            },
          }}
        >
          {icon}
        </Box>

        {/* Title */}
        <Typography
          variant={isMobile ? 'body2' : 'h6'}
          sx={{
            fontWeight: designTokens.typography.fontWeight.semibold,
            color: colorScheme.text,
            lineHeight: designTokens.typography.lineHeight.tight,
            mb: subtitle ? 0.5 : 0,
            fontSize: isMobile ? designTokens.typography.fontSize.sm : designTokens.typography.fontSize.base,
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: designTokens.colors.neutral[600],
              lineHeight: designTokens.typography.lineHeight.normal,
              fontSize: isMobile ? '0.7rem' : designTokens.typography.fontSize.xs,
              textAlign: 'center',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ActionTile;
