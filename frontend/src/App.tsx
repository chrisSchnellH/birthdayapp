// App.tsx
import { Route, Routes } from "react-router-dom";
import { Footer } from './layouts/Footer';
import { Navbar } from './layouts/Navbar';
import { LoginPage } from './pages/LoginPage';
import { PersonListPage } from './pages/PersonListPage';
import { AuthProvider } from './auth/AuthContext';
import { PersonFormPage } from "./pages/PersonFormPage";

export const App = () => {
    return (
        <AuthProvider>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/persons" element={<PersonListPage />} />
                    <Route path="/persons/new" element={<PersonFormPage />} />
                    <Route path="/persons/edit/:id" element={<PersonFormPage />} />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
};