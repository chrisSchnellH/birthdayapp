import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getAllPersons, deletePerson } from '../services/personService';
import { useNavigate } from 'react-router-dom';

interface Person {
    id: number;
    firstname: string;
    lastname: string;
    birthdate: string;
    note: string;
}

export const PersonListPage = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0); // Aktuelle Seite
    const [size, setSize] = useState(5); // Anzahl der Elemente pro Seite
    const [sortBy, setSortBy] = useState('birthdate'); // Sortierung nach Spalte
    const [totalPages, setTotalPages] = useState(0); // Gesamtanzahl der Seiten
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/'); // Weiterleitung zur Login-Seite, wenn nicht eingeloggt
            return;
        }

        const fetchPersons = async () => {
            try {
                const data = await getAllPersons(page, size, sortBy);
                setPersons(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                setError('Fehler beim Laden der Personen - Logout und Login erneut');
            } finally {
                setLoading(false);
            }
        };

        fetchPersons();
    }, [isLoggedIn, navigate, page, size, sortBy]);

    const handleDelete = async (id: number) => {
        if (window.confirm('Möchten Sie diese Person wirklich löschen?')) {
            try {
                await deletePerson(id);
                setPersons(persons.filter((person) => person.id !== id)); // Aktualisiere die Personenliste
            } catch (error) {
                setError('Fehler beim Löschen der Person');
            }
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSizeChange = (newSize: number) => {
        setSize(newSize);
        setPage(0); // Zurück zur ersten Seite, wenn die Größe geändert wird
    };

    const handleSortChange = (newSortBy: string) => {
        setSortBy(newSortBy);
        setPage(0); // Zurück zur ersten Seite, wenn die Sortierung geändert wird
    };

    if (loading) {
        return <div className='container mt-5'>Lade Daten...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Personenliste</h2>
            <button
                onClick={() => navigate('/persons/new')}
                className="btn btn-outline-success btn-sm mb-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle mb-1" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg> Neue Person erstellen
            </button>

            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Sortierung */}
                <div className="d-flex align-items-center">
                    <label htmlFor="sortBy" className="form-label me-2 mb-0">Sortieren nach:</label>
                    <select
                        id="sortBy"
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="birthdate">Geburtsdatum</option>
                        <option value="firstname">Vorname</option>
                        <option value="lastname">Nachname</option>
                    </select>
                </div>

                {/* Elemente pro Seite */}
                <div className="d-flex align-items-center">
                    <label htmlFor="size" className="form-label me-2 mb-0">Elemente pro Seite:</label>
                    <select
                        id="size"
                        className="form-select"
                        value={size}
                        onChange={(e) => handleSizeChange(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>



            {/* Tabelle */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>Geburtsdatum</th>
                        <th>Notiz</th>
                        <th style={{ width: '150px' }} className='text-nowrap'>Aktion</th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map((person) => (
                        <tr key={person.id}>
                            <td>{person.firstname}</td>
                            <td>{person.lastname}</td>
                            <td>{person.birthdate}</td>
                            <td>{person.note}</td>
                            <td>
                                <button
                                    onClick={() => navigate(`/persons/edit/${person.id}`)}
                                    className="btn btn-primary btn-sm mb-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill mb-1" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                    </svg> Bearbeiten
                                </button>

                                <button
                                    onClick={() => handleDelete(person.id)}
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
            <div className="d-flex justify-content-center mb-5">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${page === index ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(index)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};