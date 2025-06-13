import { Link, useLocation, useNavigate } from "react-router-dom"


export default function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();
    const role = localStorage.getItem('role');
    const isAdmin = !!localStorage.getItem('token');

    const handleLogout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    }

    const handleCreate = ()=>{
        navigate('/signup');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#a31212'}}>
                <div className="container-fluid">
                    
                    <Link className="navbar-brand" to="/">Netflix</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/home"? "active": ""}`} aria-current="page" to="/home">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/watchLaterPage"? "active": ""}`} aria-current="page" to="/watchLaterPage">Watch Later</Link>
                            </li>
                            

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/favorites"? "active": ""}`} aria-current="page" to="/favorites">Favorites</Link>
                            </li>
                        </ul>
                        
                        {isAdmin && role === 'admin' && (
                            <button onClick={handleCreate} className="btn btn-dark mx-2" style={{backgroundColor: '#a31212'}}>Create User</button>
                        )}
                        <button onClick={handleLogout} className="btn btn-dark" style={{backgroundColor: '#a31212'}}>Logout</button>                           
                    </div>
                </div>
            </nav>
        </div>
    )
}