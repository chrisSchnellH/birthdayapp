// src/layouts/Navbar.tsx
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const { isLoggedIn, logout } = useAuth(); // Hole den Login-Status und die logout-Funktion aus dem AuthContext
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Führe die logout-Funktion aus
        navigate('/'); // Weiterleitung zur Login-Seite
    };

    const handleLogin = () => {
        navigate('/'); // Weiterleitung zur Login-Seite
    };

    return (
        <nav className="navbar navbar-expand-lg bg-primary fixed-top pt-1" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Birthday App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        {isLoggedIn && ( // Zeige die Personen-Seite nur an, wenn eingeloggt
                            <li className="nav-item">
                                <a className="nav-link" href="/persons">Personen</a>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="btn btn-outline-light">
                                Logout
                            </button>
                        ) : (
                            <button onClick={handleLogin} className="btn btn-outline-light">
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};