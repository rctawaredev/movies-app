## Netflix Clone 🍿

A responsive Netflix-inspired web application built with React 19, Vite, Tailwind CSS (v4), and React Router (v7).  
Users can log in, browse trending, top-rated, originals, and upcoming movies, view detailed information, watch trailers, and search for movies using data from The Movie Database (TMDB) API.

### Features

- **Authentication**
  - Login screen with username/password and form validation
  - JWT-based auth using cookies (`jwt_token`)
  - Protected routes for all app pages except login

- **Home page**
  - Dynamic hero banner with embedded YouTube trailer player
  - Randomly selected movie with autoplay, mute controls, and video progress tracking
  - Overview text and interactive buttons (Info, Watch Now)

- **Movie browsing**
  - Home sections: **Trending**, **Top Rated** (carousel), **Originals**, and **Upcoming Movies**
  - **Popular** movies page (`/popular`) with **pagination** (8 per page)
  - Dedicated **Movie Details** page (`/movies/:id`) with:
    - Full movie information (budget, runtime, release date, ratings)
    - Cast members with profiles and character details
    - Similar movies recommendations
    - Watch providers information
    - Add/remove from "My List" functionality
  - **Search** page (`/search`) to find movies by keyword, with **pagination** (8 per page)
  - **Watch** page (`/watch/:id`) for video playback
  - **Cast Details** page (`/cast/:id`) for individual cast members

- **My List & Favorites**
  - Save favorite movies to personal "My List"
  - Persistent storage using custom `useMyList` hook

- **Account & Not Found**
  - Account page for user-specific information
  - Custom 404 / Not Found route

- **UI / UX**
  - Modern Netflix-style layout using Tailwind CSS (v4)
  - Responsive design for mobile, tablet, and desktop
  - **Carousel** sections for browsing multiple movies (Embla Carousel)
  - **Pagination** on Popular and Search pages (prev/next, page indicator)
  - Embedded **YouTube trailer player** with controls
  - Loading spinners and error handling for all API calls
  - Lazy loading for images with fallback support

### Tech Stack

- **Frontend**: React 19 (Vite 7)
- **Routing**: `react-router-dom` v7
- **Styling**: Tailwind CSS v4 + Tailwind CSS Vite Plugin
- **State & utilities**:
  - React hooks (`useState`, `useEffect`, `useRef`)
  - `js-cookie` for JWT storage (v3)
  - `react-spinners` for loading indicators
  - `react-icons` for icon components
- **Carousels**: `embla-carousel-react` (v8) & `react-slick` for section carousels
- **Media**: YouTube iframe API for embedded video player
- **Build tooling**: Vite 7, ESLint 10

---

## Getting Started

### Prerequisites

- **Node.js** \(recommended: v18+ or v20+\)
- **npm** (comes with Node) or **pnpm/yarn** if you prefer

### Installation

```bash
# clone the repository
git clone <your-repo-url>
cd movies-app

# install dependencies
npm install
```

### Running the app in development

```bash
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`) in your browser.

### Building for production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Available Scripts

- **`npm run dev`**: Start the Vite dev server.
- **`npm run build`**: Create an optimized production build.
- **`npm run preview`**: Preview the production build locally.
- **`npm run lint`**: Run ESLint on the codebase.

---

## API & Authentication

- **Movie Data**: The Movie Database (TMDB) API – provides comprehensive movie data, trailers, cast information, and watch providers.
- **Authentication**: JWT-based authentication stored in a cookie named `jwt_token`.
- **Protected Routes**: Implemented using a custom `ProtectedRoute` component that validates the token before rendering protected pages.
- Protected routes are implemented using a custom `ProtectedRoute` component that checks for a valid token before rendering the page.

> If you are using this as part of a course or assignment, refer to the corresponding documentation for valid login credentials and any API restrictions.

---

## Project Structure

```text
src/
  App.jsx                    # Main route configuration
  tmdb.js                    # TMDB API calls and utilities
  components/
    Login.jsx                # Login page with authentication
    Home.jsx                 # Home page with hero banner + movie sections
    Trending.jsx             # Trending movies section
    TopRated.jsx             # Top Rated movies carousel
    Originals.jsx            # Originals movies section
    UpcomingMovies.jsx       # Upcoming movies section
    Popular.jsx              # Popular movies with pagination
    Search.jsx               # Movie search with pagination
    MovieDetails.jsx         # Movie details, cast, similar movies
    CastDetails.jsx          # Individual cast member details
    Player.jsx               # Video player component
    Account.jsx              # User account page
    Navbar.jsx               # Navigation bar
    LazyImage.jsx            # Lazy-loaded image component
    ProtectedRoute.jsx       # Auth guard wrapper
    NotFound.jsx             # 404 error page
  hooks/
    useMyList.js             # Custom hook for managing "My List" state
  assets/                    # Static assets (images, etc.)
  App.css, index.css         # Styling
```

---

## Deployment

The project is Vercel-ready (a `vercel.json` file is included).  
You can deploy by connecting your repository to Vercel and using the default Vite + React configuration, or by serving the `dist` folder from any static hosting provider.

---

## Author

- **LinkedIn**: [`https://www.linkedin.com/in/rctaware/`](https://www.linkedin.com/in/rctaware/)
