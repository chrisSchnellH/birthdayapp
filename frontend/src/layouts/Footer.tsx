export const Footer = () => {
    return (
        <footer className="bg-primary text-light text-center py-3 mt-4 fixed-bottom">
            <div className="container">
                <p className="mb-0">&copy; {new Date().getFullYear()} Birthday App - Alle Rechte vorbehalten.</p>
            </div>
        </footer>
    );
};
