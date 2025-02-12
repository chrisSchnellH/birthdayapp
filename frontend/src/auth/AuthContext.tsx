import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    role: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // Zustand synchron aus dem LocalStorage initialisieren
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token; // true, wenn ein Token vorhanden ist
    });

    const [role, setRole] = useState<string | null>(() => {
        return localStorage.getItem('role'); // Rolle aus dem LocalStorage lesen
    });

    const login = (token: string, role: string) => {
        localStorage.setItem('token', token); // Token speichern
        localStorage.setItem('role', role); // Rolle speichern
        setIsLoggedIn(true);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Token entfernen
        localStorage.removeItem('role'); // Rolle entfernen
        setIsLoggedIn(false);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};