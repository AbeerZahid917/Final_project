import './App.css';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import WatchLaterPage from './components/WatchLaterPage';
import Favorites from './components/Favorites';
import Home from './components/Home';
import Movies from './components/Movies';
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";




function AppContent({ alert, showAlert, isAdmin, setIsAdmin }) {
  const location = useLocation();
  const no_navbar = ['/', '/login', '/signup'];
  const [progress, setProgress] = useState(0);


  const handleRemoveFromWatchLater = async (movie) =>{
    try
    {
      const res = await fetch("http://localhost:5000/api/watch_later_movies/remove", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }, 
        body: JSON.stringify ({
          movieId: movie.movieId || movie.id
        })
      })

      const res_json = await res.json()
      if (!res_json)
      {
        showAlert("failed to remove from watch later", "danger");
        return { success: false };
      }
      else
      {
        showAlert("Removed from watch later playlist successfully", "success");
        return { success: true, movieId: movie.movieId || movie.id };
      }
    }
    catch (err)
    {
      showAlert("error", "danger")
    }
  }


  const handleRemoveFromFavorites = async (movie) =>{
    try
    {
      const res = await fetch("http://localhost:5000/api/favorites/removeFav", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify ({
          movieId: movie.movieId || movie.id
        })
      })

      const res_json = await res.json();

      if (!res_json)
      {
        showAlert("failed to remove from favorites", "danger");
        return { success: false };
      }
      else
      {
        showAlert("removed from favorites successfully", "success")
        return { success: true, movieId: movie.movieId || movie.id };
      }
    }
    catch (err)
    {
      showAlert("error", "danger")
    }
  }
  
  
  return (
    <>
      {!no_navbar.includes(location.pathname) && (
        <Navbar setIsAdmin={setIsAdmin} />
      )}
      <Alert alert={alert} />
      <LoadingBar
          color="#f11946"
          height={3} 
          progress={progress}
      />

      <div className="container">
        <Routes>
          <Route path="/" element={<Login setProgress={setProgress} showAlert={showAlert} setIsAdmin={setIsAdmin} />} />
          <Route path="/home" element={<Home setProgress={setProgress} setIsAdmin={setIsAdmin} showAlert={showAlert}/>} />
          <Route path="/login" element={<Login setProgress={setProgress} showAlert={showAlert} setIsAdmin={setIsAdmin} />} />
          <Route path="/signup" element={<Signup setProgress={setProgress} showAlert={showAlert} setIsAdmin={setIsAdmin} />} />

          <Route path="/watchLaterPage" element={<WatchLaterPage setProgress={setProgress} showAlert={showAlert} onRemoveFromWatchLater={handleRemoveFromWatchLater}/>} />
          <Route path="/favorites" element={<Favorites setProgress={setProgress} showAlert={showAlert} onRemoveFromFavorites={handleRemoveFromFavorites}/>} />
        </Routes>
      </div>
    </>
  );
}




function App() {
  const [alert, setAlert] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
  };

  setTimeout(() => {
    setAlert(null)
  }, 1500);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsAdmin(token && role === 'admin');
  }, []);


  return (
    <div style={{ backgroundColor: '#242323', minHeight: '100vh' }}>
      <Router>
        <AppContent
          alert={alert}
          showAlert={showAlert}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      </Router>
    </div>
  );
}

export default App;
