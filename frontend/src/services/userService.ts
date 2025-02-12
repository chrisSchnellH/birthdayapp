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
    password: string;
    role: 'USER' | 'ADMIN';
}

interface ApiResponse {
    content: UserResponse[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export const getAllUsers = async (): Promise<UserResponse[]> => {
    try {
        const token = localStorage.getItem('token'); // Hole das JWT-Token aus dem LocalStorage
        const response = await axios.get<ApiResponse>(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`, // Füge das Token zum Header hinzu
            },
        });
        return response.data.content; // Extrahiere das `content`-Array
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