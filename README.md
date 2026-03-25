# 🎬 Movies App - Netflix Clone

A fully-featured Netflix-inspired streaming application built with modern web technologies. Browse trending movies, top-rated films, originals, and upcoming releases. Watch trailers, search for movies, manage a personal watchlist, and explore cast information.

> **Tech Stack**: React 19 • Vite 7 • Tailwind CSS v4 • React Router v7 • TMDB API

---

## ✨ Key Features

### 🔐 Authentication & Security

- **Login System**: Email/username and password authentication
- **JWT-Based Sessions**: Secure token-based authentication via HTTP-only cookies
- **Protected Routes**: All application pages (except login) require authentication
- **Form Validation**: Client-side validation for login credentials

### 🏠 Home Page

- **Dynamic Hero Banner**: Randomly selected featured movie with backdrop image
- **YouTube Trailer Integration**: Embedded YouTube player with:
  - Autoplay support
  - Mute/unmute controls
  - Play/pause and progress tracking
  - Responsive video player
- **Movie Overview**: Synopsis and interactive action buttons (Info, Watch Now)

### 🎞️ Movie Browsing & Discovery

**Home Page Sections:**

- **Trending** - Currently popular movies (carousel)
- **Top Rated** - Highest-rated movies (carousel)
- **Originals** - Platform originals (carousel)
- **Upcoming Movies** - Upcoming releases (carousel)

**Popular Page** (`/popular`)

- Grid view of popular movies
- Pagination with 8 movies per page
- Navigation buttons and page indicators

**Search Page** (`/search`)

- Search movies by keyword
- Real-time search results with pagination (8 per page)
- Filter and discover by title

**Movie Details Page** (`/movies/:id`)

- Comprehensive movie information:
  - Synopsis, budget, runtime, release date
  - IMDb rating and vote counts
  - Genre tags
- **Cast Section**: Actor profiles and character details with clickable links
- **Similar Movies**: Recommendations based on the current movie
- **Watch Providers**: Where to watch the movie (streaming services)
- **Add to List**: Save/unsave movies to personal watchlist

**Cast Details Page** (`/cast/:id`)

- Actor/actress profile information
- Filmography and career details
- Movie credits with character names

**Video Player Page** (`/watch/:id`)

- Dedicated video playback experience
- Full-screen support
- Playback controls

### ❤️ Personal Watchlist

- **My List Feature**: Save favorite movies to personal collection
- **Persistent Storage**: Uses browser localStorage to persist watchlist
- **Add/Remove**: Easy toggle to add/remove movies from watchlist
- **Cross-Session**: Watchlist persists across browser sessions
- **Saved Videos Page** (`/saved-videos`): View all saved movies

### 📱 User Experience

- **Account Page** (`/account`): User profile and account information
- **404 Handling**: Custom Not Found page for invalid routes
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Loading States**: Smooth loading spinners with React Spinners
- **Error Handling**: Graceful error messages and retry options
- **Lazy Image Loading**: Lazy image component with fallback support
- **Navigation Bar**: Persistent navbar with search and menu options

---

## 🛠️ Tech Stack & Dependencies

### Core Framework

- **React 19.2.0** - UI library with latest features
- **Vite 7.3.1** - Lightning-fast build tool and dev server
- **React Router DOM 7.13.0** - Client-side routing and navigation

### Styling & UI

- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Tailwind CSS Vite Plugin** - Optimized Tailwind integration with Vite
- **React Icons 5.5.0** - Icon components (Fa, Ai, etc.)

### Data & State Management

- **React Hooks**: `useState`, `useEffect`, `useRef` (built-in state management)
- **Custom Hooks**: `useMyList` - localStorage-based watchlist management
- **JS Cookie 3.0.5** - JWT token management via cookies

### UI Components & Effects

- **Embla Carousel React 8.6.0** - High-performance carousel for movie sections
- **React Slick 0.31.0** - Alternative carousel library
- **Slick Carousel 1.8.1** - CSS and styles for react-slick
- **React Spinners 0.17.0** - Loading spinners and loaders

### External APIs & Services

- **TMDB API (The Movie Database)** - Movie data, images, cast info, trailers
- **YouTube iframe API** - Embedded video player for trailers

### Development Tools

- **ESLint 10.0.1** - Code quality and linting
- **Vite React Plugin 5.1.1** - React Fast Refresh during development

---

## 📁 Project Structure

```
movies-app/
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   │   ├── Home.jsx          # Home page with hero and sections
│   │   ├── Login.jsx         # Login authentication page
│   │   ├── MovieDetails.jsx  # Movie detail view with cast & info
│   │   ├── Popular.jsx       # Popular movies with pagination
│   │   ├── Search.jsx        # Search movies functionality
│   │   ├── Player.jsx        # Video player for watching movies
│   │   ├── CastDetails.jsx   # Individual cast member details
│   │   ├── List.jsx          # Saved movies watchlist view
│   │   ├── Account.jsx       # User account page
│   │   ├── Navbar.jsx        # Navigation bar component
│   │   ├── Footer.jsx        # Footer component
│   │   ├── ProtectedRoute.jsx # Route wrapper for auth protection
│   │   ├── NotFound.jsx      # 404 page
│   │   ├── Trending.jsx      # Trending movies carousel
│   │   ├── TopRated.jsx      # Top-rated movies carousel
│   │   ├── Originals.jsx     # Originals carousel
│   │   ├── UpcomingMovies.jsx # Upcoming movies carousel
│   │   └── LazyImage.jsx     # Lazy loading image component
│   ├── hooks/                # Custom React hooks
│   │   └── useMyList.js      # Watchlist management hook
│   ├── assets/               # Images, icons, media files
│   ├── App.jsx               # Main app component & route setup
│   ├── main.jsx              # React app entry point
│   ├── index.css             # Global styles
│   └── App.css               # App-level styles
├── index.html                # HTML entry point
├── package.json              # Project metadata & dependencies
├── vite.config.js            # Vite configuration
├── vercel.json               # Vercel deployment config
├── eslint.config.js          # ESLint configuration
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ or v20+ (recommended)
- **npm**, **pnpm**, or **yarn** package manager
- **TMDB API Key** (free account at [themoviedb.org](https://www.themoviedb.org))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movies-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root:

   ```env
   VITE_TMDB_BEARER_TOKEN=your_tmdb_api_bearer_token_here
   ```

   Get your TMDB API key:
   - Go to [api.themoviedb.org](https://api.themoviedb.org)
   - Create a free account
   - Generate an API key (v3 auth or Bearer token)
   - Paste it in `.env.local`

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
# Check code quality
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

---

## 🔑 Environment Variables

| Variable                 | Description                              | Example         |
| ------------------------ | ---------------------------------------- | --------------- |
| `VITE_TMDB_BEARER_TOKEN` | TMDB API Bearer token for authentication | `eyJhbGciOi...` |

---

## 🌐 Available Routes

| Route           | Description                            | Protected |
| --------------- | -------------------------------------- | --------- |
| `/`             | Home page with hero and movie sections | ✅ Yes    |
| `/login`        | Login page                             | ❌ No     |
| `/popular`      | Popular movies with pagination         | ✅ Yes    |
| `/search`       | Search movies by keyword               | ✅ Yes    |
| `/movies/:id`   | Movie details, cast, recommendations   | ✅ Yes    |
| `/watch/:id`    | Video player for movie                 | ✅ Yes    |
| `/cast/:id`     | Cast member details and filmography    | ✅ Yes    |
| `/saved-videos` | Personal watchlist                     | ✅ Yes    |
| `/account`      | User account page                      | ✅ Yes    |
| `*`             | 404 Not Found page                     | ✅ Yes    |

---

## 🎥 API Integration

### TMDB API Endpoints Used

- **Now Playing Movies** - Featured movie for hero banner
- **Popular Movies** - Popular page content
- **Top Rated Movies** - Top-rated section carousel
- **Trending Movies** - Trending section carousel
- **Upcoming Movies** - Upcoming section carousel
- **Movie Details** - Full movie information, cast, similar movies
- **Search Movies** - Search functionality
- **Cast Details** - Actor/actress information
- **Watch Providers** - Where to watch information
- **Movie Trailers** - YouTube video keys for embedded player

---

## 🚢 Deployment

### Vercel Deployment

The project is configured for easy deployment on Vercel.

1. **Connect repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

2. **Environment variables on Vercel**
   - Add `VITE_TMDB_BEARER_TOKEN` in project settings

3. **Build command**: `npm run build` (automatic)
4. **Output directory**: `dist` (automatic)

The `vercel.json` file contains SPA routing configuration to support client-side routing.

---

## 📝 Key Architectural Decisions

### Authentication

- JWT tokens stored in HTTP-only cookies for security
- Protected routes prevent unauthorized access
- Login page is the only publicly accessible route

### State Management

- **React Hooks** for component-level state (useState, useEffect)
- **Custom Hook** (`useMyList`) for watchlist persistence
- **localStorage** for client-side data persistence
- No global state manager needed for current scale

### Data Fetching

- Direct API calls using native `fetch` API
- Bearer token authentication for TMDB requests
- Error handling with try-catch blocks
- Loading states for better UX

### UI/UX

- **Tailwind CSS** for consistent, responsive styling
- **Carousels** for horizontal scrolling through collections
- **Pagination** for grid-based views (Popular, Search)
- **Lazy loading** for images to improve performance
- **Loading spinners** for async operations

### Image Handling

- TMDB image CDN: `https://image.tmdb.org/t/p/{size}{path}`
- Multiple sizes (w500, w1280, etc.) for responsive design
- LazyImage component with fallback for missing images

---

## 🐛 Troubleshooting

### "API Key not working"

- Verify the API key format in `.env.local`
- Ensure the Bearer token is used (not the API key)
- Check TMDB website for active API credentials

### "Protected routes redirecting to login"

- Clear browser cookies: Dev Tools → Application → Cookies → Delete jwt_token
- Log in again with valid credentials

### "Images not loading"

- Check network tab for TMDB CDN errors
- Verify internet connection
- Ensure backdropPath includes valid TMDB image path

### "YouTube player not embedding"

- Check browser console for errors
- Verify YouTube iframe API script loads
- Ensure browser allows iframe embeds

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Some potential enhancements:

- Add user authentication backend
- Implement movie ratings system
- Add watchlist sharing features
- Integrate additional streaming services
- Dark/Light theme toggle
- Multi-language support

---

Live- https://rctawaredev-moviesappclonebyrct.vercel.app/

**Built with ❤️ using React, Vite, and TMDB API**


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
