import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL_EMAIL_LOGS; // Backend-URL

interface EmailLog {
    id: number;
    sentAt: string; // LocalDateTime wird als String zurückgegeben
    user: {
        id: number;
        email: string;
    };
    recipientEmail: string;
    status: string;
    errorMessage?: string; // Optional, falls vorhanden
}

export const getAllEmailLogs = async (): Promise<EmailLog[]> => {
    try {
        const token = localStorage.getItem('token'); // Hole das JWT-Token aus dem LocalStorage
        const response = await axios.get<EmailLog[]>(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`, // Füge das Token zum Header hinzu
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Fehler beim Laden der E-Mail-Logs');
    }
};

export const deleteEmailLog = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem('token'); // Hole das JWT-Token aus dem LocalStorage
        await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Füge das Token zum Header hinzu
            },
        });
    } catch (error) {
        throw new Error('Fehler beim Löschen des E-Mail-Logs');
    }
};