import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./components/Account";
import NotFound from "./components/NotFound";
import MovieDetails from "./components/MovieDetails";
import Popular from "./components/Popular";
import Search from "./components/Search";
import Player from "./components/Player";
import CastDetails from "./components/CastDetails";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/popular"
        element={
          <ProtectedRoute>
            <Popular/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/watch/:id"
        element={
          <ProtectedRoute>
            <Player/>
          </ProtectedRoute>
        }
      />

       <Route
        path="/cast/:id"
        element={
          <ProtectedRoute>
            <CastDetails/>
          </ProtectedRoute>
        }
      />
  
<Route
  path="/search"
  element={
    <ProtectedRoute>
      <Search />
    </ProtectedRoute>
  }
/>

      <Route path="/login" element={<Login />} />

      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;