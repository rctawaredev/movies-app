## Netflix Clone 🍿

A responsive Netflix-inspired web application built with React, Vite, Tailwind CSS, and React Router.  
Users can log in, browse top-rated, trending, originals, and popular movies, view details, and search for movies using data from a remote movies API.

### Features

- **Authentication**
  - Login screen with username/password and form validation
  - JWT-based auth using cookies (`jwt_token`)
  - Protected routes for all app pages except login

- **Home page**
  - Dynamic hero banner with a randomly selected top-rated movie
  - Overview text and CTA button

- **Movie browsing**
  - Home sections: **Trending**, **Top Rated** (carousel), and **Originals**
  - **Popular** movies page (`/popular`) with **pagination** (8 per page)
  - Dedicated **Movie Details** page (`/movies/:id`)
  - **Search** page to find movies by keyword, with **pagination** (8 per page)

- **Account & Not Found**
  - Account page for user-specific information
  - Custom 404 / Not Found route

- **UI / UX**
  - Modern Netflix-style layout using Tailwind CSS
  - Responsive design for mobile, tablet, and desktop
  - **Pagination** on Popular and Search (prev/next, page indicator)
  - Loading states and error handling for API calls

### Tech Stack

- **Frontend**: React (Vite)
- **Routing**: `react-router-dom`
- **Styling**: Tailwind CSS
- **State & utilities**:
  - React hooks (`useState`, `useEffect`)
  - `js-cookie` for JWT storage
  - `react-spinners` for loading indicators
  - `react-icons` for icons
- **Carousels**: `embla-carousel-react` (e.g. Top Rated section)
- **Build tooling**: Vite, ESLint

---

## Getting Started

### Prerequisites

- **Node.js** \(recommended: v18+ or v20+\)
- **npm** (comes with Node) or **pnpm/yarn** if you prefer

### Installation

```bash
# clone the repository
git clone <your-repo-url>
cd netflixclone

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

- The app communicates with a remote movies API hosted under `https://apis.ccbp.in/movies-app`.
- Authentication uses a JWT stored in a cookie named `jwt_token`.
- Protected routes are implemented using a custom `ProtectedRoute` component that checks for a valid token before rendering the page.

> If you are using this as part of a course or assignment, refer to the corresponding documentation for valid login credentials and any API restrictions.

---

## Project Structure (high level)

```text
src/
  App.jsx              # Route configuration
  components/
    Login.jsx          # Login page
    Home.jsx           # Home page with hero + sections (Trending, TopRated, Originals)
    Trending.jsx       # Trending movies section
    TopRated.jsx       # Top Rated movies carousel (embla-carousel)
    Originals.jsx      # Originals movies section
    Popular.jsx        # Popular movies page (paginated)
    Search.jsx         # Search page (paginated)
    MovieDetails.jsx   # Movie details view
    Account.jsx        # Account page
    Navbar.jsx         # Top navigation bar
    ProtectedRoute.jsx # Auth guard for protected routes
    NotFound.jsx       # 404 page
```

---

## Deployment

The project is Vercel-ready (a `vercel.json` file is included).  
You can deploy by connecting your repository to Vercel and using the default Vite + React configuration, or by serving the `dist` folder from any static hosting provider.

---

## Author

- **LinkedIn**: [`https://www.linkedin.com/in/rctaware/`](https://www.linkedin.com/in/rctaware/)
