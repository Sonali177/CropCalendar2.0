import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Skeleton,
  Paper
} from '@mui/material';
import {
  Search as SearchIcon,
  Phone as PhoneIcon,
  Launch as LaunchIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  AccountBalance as GovernmentIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { GovernmentSchemesAPI } from '../services/api';
import { useTheme } from '@mui/material/styles';
import { designTokens } from '../theme/theme';

interface Scheme {
  id: number;
  title: string;
  category: string;
  description: string;
  benefits: string[];
  eligibility: string;
  contactNumber?: string;
  website: string;
  priority: 'high' | 'medium' | 'low';
}

const GovernmentSchemesPage: React.FC = () => {
  const theme = useTheme();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [categories, setCategories] = useState<SchemeCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);

  // Load schemes and categories on component mount
  useEffect(() => {
    loadSchemes();
    loadStatistics();
  }, []);

  // Filter schemes when search or filters change
  useEffect(() => {
    filterSchemes();
  }, [schemes, searchTerm, selectedCategory, selectedPriority]);

  const loadSchemes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await GovernmentSchemesAPI.getAllSchemes();
      
      if (response.success) {
        setSchemes(response.data);
        setCategories(response.categories || []);
      } else {
        setError(response.error || 'Failed to load government schemes');
      }
    } catch (err: any) {
      console.error('Error loading schemes:', err);
      setError(err.message || 'Failed to load government schemes');
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const response = await GovernmentSchemesAPI.getSchemeStatistics();
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (err) {
      console.error('Error loading statistics:', err);
    }
  };

  const filterSchemes = () => {
    let filtered = [...schemes];

    // Search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(scheme =>
        scheme.title.toLowerCase().includes(search) ||
        scheme.category.toLowerCase().includes(search) ||
        scheme.description.toLowerCase().includes(search) ||
        scheme.benefits.some(benefit => benefit.toLowerCase().includes(search)) ||
        scheme.eligibility.toLowerCase().includes(search)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme =>
        scheme.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Priority filter
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(scheme => scheme.priority === selectedPriority);
    }

    // Sort by priority (high first)
    filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    setFilteredSchemes(filtered);
  };

  const handleSchemeClick = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedScheme(null);
  };

  const handleCallScheme = (contactNumber: string) => {
    window.open(`tel:${contactNumber}`, '_self');
  };

  const handleVisitWebsite = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <WarningIcon sx={{ color: '#ef4444' }} />;
      case 'medium': return <InfoIcon sx={{ color: '#f59e0b' }} />;
      case 'low': return <CheckCircleIcon sx={{ color: '#10b981' }} />;
      default: return <InfoIcon />;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" height={60} width="60%" />
          <Skeleton variant="text" height={40} width="80%" />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: 3
          }}
        >
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={300} />
          ))}
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={loadSchemes}>
              <RefreshIcon sx={{ mr: 1 }} />
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${designTokens.colors.primary[600]} 0%, ${designTokens.colors.primary[800]} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          🏛️ Government Schemes
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Comprehensive support programs for Indian farmers
        </Typography>
        
        {statistics && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              icon={<AssignmentIcon />} 
              label={`${statistics.totalSchemes} Total Schemes`} 
              color="primary" 
            />
            <Chip 
              icon={<PhoneIcon />} 
              label={`${statistics.withContactNumbers} Helplines`} 
              color="secondary" 
            />
            <Chip 
              icon={<StarIcon />} 
              label={`${statistics.byPriority?.high || 0} High Priority`} 
              sx={{ bgcolor: '#ef4444', color: 'white' }}
            />
          </Box>
        )}
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '2fr 1fr 1fr 1fr'
            },
            gap: 2,
            alignItems: 'center'
          }}
        >
          <TextField
            fullWidth
            placeholder="Search schemes, benefits, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="helpline">Helpline & Support</MenuItem>
              <MenuItem value="market">Market Platform</MenuItem>
              <MenuItem value="development">Development</MenuItem>
              <MenuItem value="infrastructure">Infrastructure</MenuItem>
              <MenuItem value="insurance">Insurance</MenuItem>
              <MenuItem value="dbt">Direct Benefit</MenuItem>
              <MenuItem value="soil">Soil Management</MenuItem>
              <MenuItem value="water">Water Management</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={selectedPriority}
              label="Priority"
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="high">High Priority</MenuItem>
              <MenuItem value="medium">Medium Priority</MenuItem>
              <MenuItem value="low">Low Priority</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedPriority('all');
            }}
          >
            Clear Filters
          </Button>
        </Box>
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Found {filteredSchemes.length} scheme{filteredSchemes.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </Typography>
      </Box>

      {/* Schemes Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: 3
        }}
      >
        {filteredSchemes.map((scheme) => (
          <Card
            key={scheme.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
              },
              position: 'relative',
              overflow: 'visible'
            }}
            onClick={() => handleSchemeClick(scheme)}
          >
              {/* Priority Badge */}
              <Chip
                size="small"
                label={scheme.priority.toUpperCase()}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  bgcolor: getPriorityColor(scheme.priority),
                  color: 'white',
                  fontWeight: 'bold',
                  zIndex: 1
                }}
              />

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: scheme.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      flexShrink: 0
                    }}
                  >
                    <AppIcons.Government sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {scheme.title}
                    </Typography>
                    <Chip 
                      label={scheme.category} 
                      size="small" 
                      variant="outlined" 
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Box>
                </Box>

                {/* Description */}
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {scheme.description}
                </Typography>

                {/* Key Benefits */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Key Benefits:
                  </Typography>
                  <List dense sx={{ py: 0 }}>
                    {scheme.benefits.slice(0, 2).map((benefit, index) => (
                      <ListItem key={index} sx={{ py: 0.25, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={benefit} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                    {scheme.benefits.length > 2 && (
                      <ListItem sx={{ py: 0.25, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <InfoIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`+ ${scheme.benefits.length - 2} more benefits`}
                          primaryTypographyProps={{ 
                            variant: 'body2', 
                            color: 'text.secondary',
                            fontStyle: 'italic'
                          }}
                        />
                      </ListItem>
                    )}
                  </List>
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSchemeClick(scheme);
                    }}
                    sx={{ flexGrow: 1 }}
                  >
                    Learn More
                  </Button>
                  {scheme.contactNumber && (
                    <Tooltip title={`Call ${scheme.contactNumber}`}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallScheme(scheme.contactNumber!);
                        }}
                      >
                        <PhoneIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Visit Official Website">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVisitWebsite(scheme.website);
                      }}
                    >
                      <LaunchIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
        ))}
      </Box>

      {/* No Results */}
      {filteredSchemes.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center', mt: 4 }}>
          <AppIcons.Search sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
            No schemes found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search criteria or browse all available schemes
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedPriority('all');
            }}
          >
            Show All Schemes
          </Button>
        </Paper>
      )}

      {/* Scheme Detail Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        {selectedScheme && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: selectedScheme.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <AppIcons.Government sx={{ color: 'white', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                      {selectedScheme.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Chip label={selectedScheme.category} size="small" color="primary" />
                      <Chip 
                        label={selectedScheme.priority.toUpperCase()} 
                        size="small" 
                        sx={{ 
                          bgcolor: getPriorityColor(selectedScheme.priority),
                          color: 'white'
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedScheme.description}
              </Typography>

              {/* Benefits */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Benefits & Features
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {selectedScheme.benefits.map((benefit, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary={benefit} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Eligibility */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Eligibility Criteria
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{selectedScheme.eligibility}</Typography>
                </AccordionDetails>
              </Accordion>

              {/* Application Process */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Application Process
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {selectedScheme.applicationProcess.map((step, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 'bold'
                            }}
                          >
                            {index + 1}
                          </Box>
                        </ListItemIcon>
                        <ListItemText primary={step} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              {/* Required Documents */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Required Documents
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {selectedScheme.documents.map((document, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={document} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 1 }}>
              {selectedScheme.contactNumber && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<PhoneIcon />}
                  onClick={() => handleCallScheme(selectedScheme.contactNumber!)}
                >
                  Call {selectedScheme.contactNumber}
                </Button>
              )}
              <Button
                variant="contained"
                startIcon={<LaunchIcon />}
                onClick={() => handleVisitWebsite(selectedScheme.website)}
              >
                Visit Official Website
              </Button>
              <Button variant="outlined" onClick={handleCloseModal}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default GovernmentSchemesPage;
