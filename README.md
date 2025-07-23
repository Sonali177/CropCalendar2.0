# Crop Calendar - Agricultural Advisory System

A comprehensive full-stack application that generates personalized crop calendars for farmers using real-time satellite data and agricultural intelligence.

## 🌾 Overview

The Crop Calendar application helps farmers optimize their agricultural decisions by providing:
- **Real-time satellite data integration** (vegetation indices, soil moisture, weather conditions)
- **Personalized crop calendars** with planting, fertilization, and harvesting schedules
- **Location-based recommendations** tailored to specific geographic conditions
- **Responsive web interface** accessible on desktop, tablet, and mobile devices

## 🏗️ Architecture

### Backend (Node.js/Express)
- **API Server**: RESTful API built with Express.js
- **Satellite Data Service**: Integrates with NASA and weather APIs (with simulation fallback)
- **Crop Calendar Generator**: Advanced algorithms for agricultural planning
- **Data Models**: Comprehensive crop database with growth stages and requirements

### Frontend (React/TypeScript)
- **Modern React App**: Built with TypeScript for type safety
- **Material-UI**: Professional UI components with agricultural theme
- **Context API**: State management for crop calendar workflow
- **Responsive Design**: Optimized for all device types

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone and setup the project:**
   ```bash
   cd /path/to/CropCalendar
   npm run install:all
   ```

2. **Configure environment variables:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your API keys (optional - works with demo data)
   ```

3. **Start the development servers:**
   ```bash
   # Start both backend and frontend
   npm run dev
   ```

   Or start individually:
   ```bash
   # Backend only (port 5000)
   npm run server:dev
   
   # Frontend only (port 3000)
   npm run client:dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/health

## 📡 API Endpoints

### Crop Calendar API
- `POST /api/crop-calendar/generate` - Generate personalized crop calendar
- `GET /api/crop-calendar/crops` - Get supported crop types
- `POST /api/crop-calendar/validate-location` - Validate agricultural suitability

### Satellite Data API
- `POST /api/satellite-data/current` - Get current satellite data for location
- `POST /api/satellite-data/historical` - Get historical trends

### Example Request
```json
{
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "area": 5.5,
  "cropType": "wheat"
}
```

## 🌱 Supported Crops

Current crop database includes:
- **Cereals**: Wheat, Rice, Maize
- **Vegetables**: Tomato, Potato
- **Growing**: Additional crops being added regularly

Each crop includes:
- Growth stages and timelines
- Fertilization schedules
- Irrigation requirements
- Optimal planting seasons
- Expected yields

## 🛰️ Satellite Data Integration

### Current Data Sources
- **Vegetation Health**: NDVI and EVI indices
- **Soil Moisture**: Real-time soil moisture levels
- **Weather Data**: Temperature, precipitation, humidity
- **Environmental**: Wind speed, cloud cover, sunlight hours

### API Integrations
- NASA Earth API (for vegetation indices)
- OpenWeather API (for weather data)
- SMAP (for soil moisture data)
- *Note: Demo mode with simulated data available*

## 🎨 Features

### For Farmers
- **Interactive Location Selection**: GPS or manual coordinate input
- **Crop Selection**: Browse supported crops with detailed information
- **Area Input**: Specify farm size for accurate recommendations
- **Personalized Calendar**: Complete timeline with specific dates
- **Satellite Insights**: Real-time agricultural conditions
- **Mobile Responsive**: Works on all devices

### For Developers
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Hooks, Context API, functional components
- **Material-UI**: Professional and accessible UI components
- **API Integration**: Comprehensive error handling and loading states
- **Scalable Architecture**: Clean separation of concerns

## 🔧 Development

### Project Structure
```
CropCalendar/
├── backend/                 # Node.js API server
│   ├── data/               # Crop database
│   ├── routes/             # API route handlers
│   ├── services/           # Business logic
│   └── server.js           # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Context providers
│   │   ├── services/       # API client
│   │   └── types/          # TypeScript definitions
│   └── public/             # Static assets
└── package.json            # Root package.json
```

### Available Scripts
```bash
# Development
npm run dev                 # Start both servers
npm run server:dev          # Backend only
npm run client:dev          # Frontend only

# Production
npm run build              # Build frontend
npm run start              # Start production backend

# Utilities
npm run install:all        # Install all dependencies
```

### Environment Variables
```bash
# Backend (.env)
PORT=5000
NODE_ENV=development
NASA_API_KEY=your_nasa_api_key
OPENWEATHER_API_KEY=your_weather_api_key
CORS_ORIGIN=http://localhost:3000
```

## 🌟 Key Features Implemented

### Backend Features
✅ **Satellite Data Integration** - Real-time and simulated data  
✅ **Crop Calendar Generation** - Advanced agricultural algorithms  
✅ **Location Validation** - Agricultural suitability assessment  
✅ **Comprehensive Crop Database** - 5+ crops with detailed information  
✅ **RESTful API** - Well-documented endpoints with validation  
✅ **Error Handling** - Comprehensive error responses  

### Frontend Features  
✅ **Multi-step Form** - Guided crop calendar generation  
✅ **Location Services** - GPS integration and manual input  
✅ **Responsive Design** - Mobile-first approach  
✅ **Real-time Feedback** - Loading states and error handling  
✅ **Professional UI** - Material-UI with agricultural theme  
✅ **TypeScript Integration** - Full type safety  

## 🚧 Future Enhancements

### Short Term
- [ ] Complete step components implementation
- [ ] Interactive maps for location selection
- [ ] Enhanced crop calendar visualization
- [ ] Historical data charts and trends

### Long Term
- [ ] User authentication and saved calendars
- [ ] SMS/email notifications for farming activities
- [ ] Integration with IoT sensors
- [ ] Machine learning yield predictions
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please:
1. Check the API health endpoint: `/health`
2. Review error messages in browser console
3. Verify environment variables are set correctly
4. Ensure all dependencies are installed

## 🎯 Technology Stack

**Backend:**
- Node.js & Express.js
- Axios for API calls
- Moment.js for date handling
- Express Validator for input validation
- Morgan for logging

**Frontend:**
- React 18 with TypeScript
- Material-UI (MUI)
- React Router for navigation
- Context API for state management
- Axios for API communication

**Development:**
- ESLint & TypeScript for code quality
- Concurrently for parallel development
- Nodemon for backend hot reload

---

*Built with ❤️ for the agricultural community*
