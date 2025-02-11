// src/pages/PersonFormPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPersonById, createPerson, updatePerson } from '../services/personService';

export const PersonFormPage = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [person, setPerson] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
        note: '',
    });

    useEffect(() => {
        if (id) {
            // Lade die Person-Daten, wenn eine ID vorhanden ist (Bearbeitungsmodus)
            getPersonById(parseInt(id))
                .then((data) => setPerson(data))
                .catch((error) => console.error('Fehler beim Laden der Person:', error));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id) {
                await updatePerson({ ...person, id: parseInt(id) });
            } else {
                await createPerson(person);
            }
            navigate('/persons'); // Weiterleitung zur Personenliste
        } catch (error) {
            console.error('Fehler beim Speichern der Person:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>{id ? 'Person bearbeiten' : 'Neue Person erstellen'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Vorname</label>
                    <input
                        type="text"
                        className="form-control"
                        value={person.firstname}
                        onChange={(e) => setPerson({ ...person, firstname: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nachname</label>
                    <input
                        type="text"
                        className="form-control"
                        value={person.lastname}
                        onChange={(e) => setPerson({ ...person, lastname: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Geburtsdatum</label>
                    <input
                        type="date"
                        className="form-control"
                        value={person.birthdate}
                        onChange={(e) => setPerson({ ...person, birthdate: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Notiz</label>
                    <textarea
                        className="form-control"
                        value={person.note}
                        onChange={(e) => setPerson({ ...person, note: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? 'Speichern' : 'Erstellen'}
                </button>
            </form>
        </div>
    );
};