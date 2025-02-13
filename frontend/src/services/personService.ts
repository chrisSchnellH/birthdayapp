
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/persons'; // Backend-URL

interface PersonResponse {
    id: number;
    firstname: string;
    lastname: string;
    birthdate: string;
    note: string;
}

interface ApiResponse {
    content: PersonResponse[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

interface Person {
    id?: number;
    firstname: string;
    lastname: string;
    birthdate: string;
    note: string;
}

export const getAllPersons = async (
    page: number = 0,
    size: number = 5,
    sortBy: string = 'birthdate'
): Promise<ApiResponse> => {
    try {
        const token = localStorage.getItem('token'); // Hole das JWT-Token aus dem LocalStorage
        const response = await axios.get<ApiResponse>(API_URL, {
            params: { page, size, sortBy }, // Pagination- und Sortierungsparameter
            headers: {
                Authorization: `Bearer ${token}`, // Füge das Token zum Header hinzu
            },
        });
        return response.data; // Gib das gesamte ApiResponse-Objekt zurück
    } catch (error) {
        throw new Error('Fehler beim Laden der Personen');
    }
};

export const createPerson = async (person: Person): Promise<void> => {
    const token = localStorage.getItem('token');
    await axios.post(API_URL, person, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deletePerson = async (id: number): Promise<void> => {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getPersonById = async (id: number): Promise<Person> => {
    const token = localStorage.getItem('token');
    const response = await axios.get<Person>(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updatePerson = async (person: Person): Promise<void> => {
    const token = localStorage.getItem('token');
    await axios.put(`${API_URL}/${person.id}`, person, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
