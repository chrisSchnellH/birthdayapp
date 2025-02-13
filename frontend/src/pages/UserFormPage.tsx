// src/pages/admin/UserFormPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUser, updateUser, getUserById } from '../services/userService';

export const UserFormPage = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'USER' | 'ADMIN'>('USER'); // Standardrolle: USER
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            // Lade die Benutzerdaten, wenn eine ID vorhanden ist (Bearbeitungsmodus)
            const fetchUser = async () => {
                try {
                    const user = await getUserById(parseInt(id));
                    setEmail(user.email);
                    setRole(user.role as 'USER' | 'ADMIN');
                } catch (error) {
                    setError('Fehler beim Laden des Benutzers');
                }
            };

            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userRequest: { email: string; password?: string; role: 'USER' | 'ADMIN' } = { email, password, role };
            if (id) {
                // Beim Bearbeiten das Passwort nur senden, wenn es angegeben wurde
                if (!password) {
                    delete userRequest.password; // Passwort aus dem Request entfernen
                }
                await updateUser(parseInt(id), userRequest);
            } else {
                await createUser(userRequest);
            }
            navigate('/admin/users'); // Weiterleitung zur Benutzerliste
        } catch (error) {
            setError(id ? 'Fehler beim Aktualisieren des Benutzers' : 'Fehler beim Erstellen des Benutzers');
        }
    };

    return (
        <div className="container mt-5">
            <h2>{id ? 'Benutzer bearbeiten' : 'Neuen Benutzer erstellen'}</h2>
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
                        placeholder={id ? 'Leer lassen, um das Passwort beizubehalten' : ''}
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
                    {id ? 'Speichern' : 'Benutzer erstellen'}
                </button>
            </form>
        </div>
    );
};