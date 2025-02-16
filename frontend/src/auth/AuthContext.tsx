import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isLoggedIn: boolean;
    user: { email: string } | null;
    role: string | null;
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    const [role, setRole] = useState<string | null>(() => {
        return localStorage.getItem('role');
    });

    const [user, setUser] = useState<{ email: string } | null>(() => {
        const email = localStorage.getItem('email');
        return email ? { email } : null;
    });

    const login = (token: string, role: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setIsLoggedIn(true);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setRole(null);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};