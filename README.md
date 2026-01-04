# Sugarland Theaters - Responsive Seat Selector UI

This project is part of a **Coursera course assignment** focused on creating a responsive web interface for cinema/theater seat booking.

## Project Overview

Sugarland Theaters needed a responsive seat booking web interface prototype that enables users to book seats smoothly across different devices. The interface displays seat maps, shows available and occupied seats, and adapts dynamically to various screen sizes.

## Features

### Core Functionality
- **Visual Seat Map**: Interactive theater layout with three seating sections (Left, Center, Right)
- **Seat Selection**: Click to select/deselect available seats
- **Real-time Updates**: Visual feedback for available (green), selected (cyan), and occupied (red) seats
- **Price Calculation**: Automatic total price calculation based on selected seats
- **Booking System**: Confirm bookings and mark seats as occupied

### 📱 Responsive Design
- **Desktop**: Full seat map display with all rows visible, no scrolling required
- **Tablet**: Optimized layout with larger touch targets
- **Mobile**: 
  - Sector-based navigation (Left/Center/Right sections)
  - Zoom functionality to view individual sectors
  - Scrolling enabled for better mobile experience
  - Larger buttons and touch-friendly interface

### Layout Structure
The theater is organized into **3 main sections**:

1. **Section 1**: 4 rows (A-D)
   - Left: 4 seats per row
   - Center: 10 seats per row
   - Right: 4 seats per row

2. **Section 2**: 4 rows (E-H) - identical to Section 1
   - Left: 4 seats per row
   - Center: 10 seats per row
   - Right: 4 seats per row

3. **Section 3**: 7 rows (I-O)
   - Left: 4 seats per row
   - Center: 10 seats per row
   - Right: 4 seats per row

**Total**: 15 rows with clear visual separators between sections

### Design Features
- Modern color scheme with teal/cyan accents
- Clean, minimal interface
- Visual aisle separators between seating blocks
- Section dividers for clear organization
- Smooth transitions and hover effects

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Responsive design with Flexbox and media queries
- **JavaScript (Vanilla)**: Interactive functionality and state management

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process or dependencies required!

### Usage
1. **Select Seats**: Click on available (green) seats to select them
2. **View Selection**: Selected seats appear in the "Selected Seats" section with total price
3. **Clear Selection**: Click "Clear Selection" to remove all selected seats
4. **Book Seats**: Click "Book Seats" to confirm your booking
5. **Mobile Navigation**: On mobile devices, tap a sector (Left/Center/Right) to zoom into that section

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Project Requirements Met

✅ Responsive seat map visual layout maximizing cross-device usage  
✅ Connected visual seat map to a grid of seats (columns and rows)  
✅ Dynamic controls that change based on screen size  
✅ Mobile-specific features (sector map, zoom functionality)  
✅ Visual representation of available, selected, and occupied seats  
✅ Price calculation and booking confirmation  

## Course Context

This project was developed as part of a **Coursera course assignment** focusing on:
- Responsive web design principles
- Cross-device user experience optimization
- Front-end development with HTML, CSS, and JavaScript
- UI/UX design for mobile and desktop interfaces

## License

This project is created for educational purposes as part of a Coursera course.

---

**Note**: This is a prototype interface. The seat data is simulated (15% of seats are randomly marked as occupied). In a production environment, this would connect to a backend database for real-time seat availability.
