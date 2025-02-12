import { useState } from "react";
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { login: authLogin } = useAuth(); // Verwende die login-Funktion aus dem AuthContext
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            // API-Aufruf zum Backend
            const response = await login({ email, password });

            // Speichere das Token und die Rolle im LocalStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);

            // Aktualisiere den Login-Status und die Rolle im AuthContext
            authLogin(response.token, response.role);

            // Weiterleitung zur Personenliste
            navigate('/persons');
        } catch (error) {
            setError('Login fehlgeschlagen. Bitte überprüfe deine Anmeldedaten.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Willkommen bei Birthday App</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">E-Mail</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Passwort</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};