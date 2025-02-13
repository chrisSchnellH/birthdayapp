import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/users'; // Backend-URL

interface UserResponse {
    id: number;
    email: string;
    role: string;
    // Weitere Felder, falls vorhanden
}

interface UserRequest {
    email: string;
    password?: string;
    role: 'USER' | 'ADMIN';
}

interface ApiResponse {
    content: UserResponse[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export const getUserById = async (id: number): Promise<UserResponse> => {
    try {
        const token = localStorage.getItem('token'); // Hole das JWT-Token aus dem LocalStorage
        const response = await axios.get<UserResponse>(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Füge das Token zum Header hinzu
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Fehler beim Laden des Benutzers');
    }
};

export const getAllUsers = async (
    page: number = 0,
    size: number = 5,
    sortBy: string = 'email' // Standard-Sortierung nach E-Mail
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
        throw new Error('Fehler beim Laden der Benutzer');
    }
};

export const createUser = async (userRequest: UserRequest): Promise<UserResponse> => {
    try {
        const token = localStorage.getItem('token'); // Hole das JWT-Token aus dem LocalStorage
        const response = await axios.post<UserResponse>(API_URL, userRequest, {
            headers: {
                Authorization: `Bearer ${token}`, // Füge das Token zum Header hinzu
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Fehler beim Erstellen des Benutzers');
    }
};

export const deleteUser = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem('token'); // Hole das JWT-Token aus dem LocalStorage
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Füge das Token zum Header hinzu
            },
        });
    } catch (error) {
        throw new Error('Fehler beim Löschen des Benutzers');
    }
};

export const updateUser = async (id: number, userRequest: UserRequest): Promise<UserResponse> => {
    try {
        const token = localStorage.getItem('token'); // Hole das JWT-Token aus dem LocalStorage
        const response = await axios.put<UserResponse>(`${API_URL}/${id}`, userRequest, {
            headers: {
                Authorization: `Bearer ${token}`, // Füge das Token zum Header hinzu
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Fehler beim Aktualisieren des Benutzers');
    }
};