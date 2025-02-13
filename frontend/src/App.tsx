// App.tsx
import { Route, Routes } from "react-router-dom";
import { Footer } from './layouts/Footer';
import { Navbar } from './layouts/Navbar';
import { LoginPage } from './pages/LoginPage';
import { PersonListPage } from './pages/PersonsPage';
import { AuthProvider } from './auth/AuthContext';
import { PersonFormPage } from "./pages/PersonFormPage";
import { UsersPage } from "./pages/UsersPage";
import { LogsPage } from "./pages/LogsPage";
import { UserFormPage } from "./pages/UserFormPage";

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
                    <Route path="/admin/users" element={<UsersPage />} />
                    <Route path="/admin/users/new" element={<UserFormPage />} />
                    <Route path="/admin/users/edit/:id" element={<UserFormPage />} />
                    <Route path="/admin/logs" element={<LogsPage />} />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
};