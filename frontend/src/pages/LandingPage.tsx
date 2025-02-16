import Confetti from 'react-confetti';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // AuthContext für den Benutzerzustand
import './../index.scss'; // SCSS importieren


const LandingPage = () => {
    const { isLoggedIn } = useAuth(); // Benutzerzustand aus dem AuthContext

    return (
        <div className="landing-page">
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <div className="background-elements">
                <div className="envelope envelope-1">✉️</div>
                <div className="envelope envelope-2">✉️</div>
                <div className="cake cake-1">🎂</div>
                <div className="cake cake-2">🎂</div>
            </div>
            <div className="content text-center">
                {/* Dynamischer Inhalt basierend auf dem Benutzerzustand */}
                {isLoggedIn ? (
                    // Inhalt für eingeloggte Benutzer
                    <>
                        <h1 className="display-4 fw-bold">Willkommen zurück!</h1>
                        <p className="lead mt-3">
                            Schön, dass du wieder da bist. Hier sind deine wichtigsten Funktionen:
                        </p>
                        <div className="mt-4">
                            <Link to="/persons" className="btn btn-primary btn-lg m-1">
                                ➡️ Zur Personenliste
                            </Link>
                        </div>
                    </>
                ) : (
                    // Inhalt für nicht eingeloggte Benutzer
                    <>
                        <h1 className="display-4 fw-bold">Birthday App</h1>
                        <p className="lead mt-3">
                            Keine Geburtstage mehr vergessen und morgens um 06:00 Uhr eine Liste der heutigen Geburtstage per Mail erhalten.
                        </p>
                        <div className="mt-4">
                            <Link to="/login" className="btn btn-primary btn-lg m-1">
                                ➡️ Login
                            </Link>
                            <a href="mailto:aarondienstag@web.com" className="btn btn-outline-secondary btn-lg m-1">
                                Noch kein Account? ✉️ Schreibe mir eine Mail
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LandingPage;