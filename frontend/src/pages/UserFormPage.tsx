import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';

export const UserFormPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'USER' | 'ADMIN'>('USER'); // Standardrolle: USER
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userRequest = { email, password, role };
            await createUser(userRequest);
            navigate('/admin/users'); // Weiterleitung zur Benutzerliste
        } catch (error) {
            setError('Fehler beim Erstellen des Benutzers');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Neuen Benutzer erstellen</h2>
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
                <div className="mb-3">
                    <label className="form-label">Rolle</label>
                    <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN')}
                        required
                    >
                        <option value="USER">Benutzer</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Benutzer erstellen
                </button>
            </form>
        </div>
    );
};