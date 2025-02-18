// src/pages/admin/LogsPage.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { deleteEmailLog, getAllEmailLogs } from '../services/logService';
import { useNavigate } from 'react-router-dom';

interface EmailLog {
    id: number;
    sentAt: string;
    user: {
        id: number;
        email: string;
    };
    recipientEmail: string;
    status: string;
    errorMessage?: string;
}

export const LogsPage = () => {
    const [logs, setLogs] = useState<EmailLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isLoggedIn, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn || role !== 'ROLE_ADMIN') {
            navigate('/'); // Weiterleitung zur Login-Seite, wenn nicht eingeloggt oder kein Admin
            return;
        }

        const fetchLogs = async () => {
            try {
                const data = await getAllEmailLogs();
                setLogs(data);
            } catch (error) {
                setError('Fehler beim Laden der E-Mail-Logs - Logout und Login erneut');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [isLoggedIn, role, navigate]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Möchten Sie diesen E-Mail-Log wirklich löschen?')) {
            try {
                await deleteEmailLog(id);
                setLogs(logs.filter(log => log.id !== id));
            } catch (error) {
                setError('Fehler beim Löschen des E-Mail-Logs');
            }
        }
    };

    if (loading) {
        return <div className='container mt-5'>Lade Daten...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5 mb-5">
            <h2>E-Mail-Logs</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Gesendet am</th>
                        <th>Benutzer</th>
                        <th>Empfänger</th>
                        <th>Status</th>
                        <th>Fehlermeldung</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{new Date(log.sentAt).toLocaleString()}</td>
                            <td>{log.user.email}</td>
                            <td>{log.recipientEmail}</td>
                            <td>{log.status}</td>
                            <td>{log.errorMessage || '-'}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(log.id)} // Löschfunktion aufrufen
                                >
                                    Löschen
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};