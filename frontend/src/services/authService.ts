import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_AUTH; // Backend-URL

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    role: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
        return response.data;
    } catch (error) {
        throw new Error('Login fehlgeschlagen');
    }
};