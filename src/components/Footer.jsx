// 1) Importamos React y el CSS del footer.
import React from 'react';
import '../styles/footer.css';

// 2) Componente funcional Footer.
export default function Footer() {
    return (
        <footer className="footer">
            {/* 3) Texto del pie de página */}
            <p className="footer__text">
                © {new Date().getFullYear()} CastAAP. Todos los derechos reservados.
            </p>
        </footer>
    );
}