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
          <Route path="/home" element={<Home setProgress={setProgress} setIsAdmin={setIsAdmin} />} />
          <Route path="/login" element={<Login setProgress={setProgress} showAlert={showAlert} setIsAdmin={setIsAdmin} />} />
          <Route path="/signup" element={<Signup setProgress={setProgress} showAlert={showAlert} setIsAdmin={setIsAdmin} />} />

          {/* <Route path="/movies" element={<Movies setProgress={setProgress} />} /> */}
          <Route path="/watchLaterPage" element={localStorage.getItem("role") === "admin" ? <WatchLaterPage setProgress={setProgress}/> : null} />
          <Route path="/favorites" element={localStorage.getItem("role") === "admin" ? <Favorites setProgress={setProgress}/> : null} />
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
