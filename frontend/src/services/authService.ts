import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
        return response.data;
    } catch (error) {
        throw new Error('Login fehlgeschlagen');
    }
};