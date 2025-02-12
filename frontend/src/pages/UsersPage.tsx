// src/pages/admin/UsersPage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { deleteUser, getAllUsers } from '../services/userService';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    email: string;
    role: string;
}

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn || role !== 'ROLE_ADMIN') {
            navigate('/persons'); // Weiterleitung zur Login-Seite, wenn nicht eingeloggt oder kein Admin
            return;
        }

        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                setError('Fehler beim Laden der Benutzer');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [isLoggedIn, role, navigate]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter((user) => user.id !== id)); // Benutzer aus der Liste entfernen
            } catch (error) {
                setError('Fehler beim Löschen des Benutzers');
            }
        }
    };

    if (loading) {
        return <div>Lade Daten...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Benutzerliste</h2>
            <button
                onClick={() => navigate('/admin/users/new')}
                className="btn btn-outline-success"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle mb-1" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg> Neuen Benutzer erstellen
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>E-Mail</th>
                        <th>Rolle</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle mb-1" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg> Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};