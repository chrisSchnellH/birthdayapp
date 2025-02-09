import { Route, Routes } from "react-router-dom";
import { Footer } from './layouts/Footer';
import { Navbar } from './layouts/Navbar';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<LoginPage />} />
            </Routes>

            <Footer />
        </div>
    );

}