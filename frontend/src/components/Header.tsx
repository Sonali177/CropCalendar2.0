import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Agriculture, Home, CalendarToday, Satellite, Menu as MenuIcon } from '@mui/icons-material';

const Header: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0, py: 1 }}>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.5, sm: 1 },
                p: { xs: 0.5, sm: 1 },
                borderRadius: 2,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Agriculture sx={{ fontSize: { xs: 24, sm: 32 }, color: '#81C784' }} />
              <Box>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1rem', sm: '1.3rem' },
                    lineHeight: 1.2
                  }}
                >
                  🌾 Crop Calendar
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    opacity: 0.8,
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  <Satellite sx={{ fontSize: 12 }} />
                  Satellite-Powered Agriculture
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Navigation */}
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #388E3C 100%)',
                    color: 'white',
                    '& .MuiMenuItem-root': {
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)'
                      }
                    }
                  }
                }}
              >
                <MenuItem
                  component={Link}
                  to="/"
                  onClick={handleMenuClose}
                  sx={{
                    bgcolor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 3,
                    py: 1.5
                  }}
                >
                  <Home sx={{ fontSize: 20 }} />
                  Home
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/crop-calendar"
                  onClick={handleMenuClose}
                  sx={{
                    bgcolor: location.pathname === '/crop-calendar' ? 'rgba(255,255,255,0.2)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 3,
                    py: 1.5
                  }}
                >
                  <CalendarToday sx={{ fontSize: 20 }} />
                  Calendar
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                component={Link}
                to="/"
                color="inherit"
                startIcon={<Home />}
                sx={{
                  bgcolor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  border: location.pathname === '/' ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/crop-calendar"
                color="inherit"
                startIcon={<CalendarToday />}
                sx={{
                  bgcolor: location.pathname === '/crop-calendar' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  border: location.pathname === '/crop-calendar' ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Calendar
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
