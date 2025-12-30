# Regal Stay - Luxury Hotel Website

A professional, responsive luxury hotel website built with HTML, CSS, and JavaScript. Features include sticky navigation, scroll animations, parallax effects, dynamic room loading from API, and a modern design.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Sticky Navigation**: Navbar changes style on scroll
- **Scroll Animations**: Fade-in, slide-in, zoom-in, and staggered animations
- **Parallax Effect**: Dynamic background movement on the home section
- **Dynamic Room Loading**: Fetches room data from backend API
- **Luxury Design**: Elegant fonts, high-quality images, and professional layout
- **Sections**: Home, About, Rooms, Services, Gallery, Testimonials, Contact, Footer

## Technologies Used

- HTML5
- CSS3 (with animations and transitions)
- JavaScript (Intersection Observer for scroll animations, Fetch API)
- Google Fonts (Playfair Display, Roboto)
- Font Awesome Icons

## Architecture

### Frontend (Vercel Cloud)
- Static website deployed on Vercel
- Fetches room data from backend API

### Backend (Debian 13 VM - On-Prem/IaaS)
- Node.js Express server
- RESTful API for room data
- Hosted on Debian 13 virtual machine

## Deployment

### Frontend Deployment to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts to link your GitHub repository or deploy manually.

The `vercel.json` configuration ensures proper routing for the single-page application.

### Backend Deployment to Debian 13 VM

See `backend/README.md` for detailed setup instructions.

## API Endpoints

- `GET /api/rooms` - Retrieve all available rooms with pricing

## How to View Locally

1. Start the backend server (see backend/README.md)
2. Open `index.html` in any modern web browser
3. The rooms section will dynamically load data from the API

## GitHub Pages

This project is hosted on GitHub Pages at: [https://adnanadriansyah.github.io/regal-stay/](https://adnanadriansyah.github.io/regal-stay/)

## License

This project is open source and available under the [MIT License](LICENSE).