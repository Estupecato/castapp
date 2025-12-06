// 1) Importa React y estilos.
import React from 'react';
import '../styles/notfound.css';

export default function NotFound() {
    // 2) Renderiza un mensaje de error para rutas inexistentes.
    return (
        <section className="notfound">
            <h1 className="notfound__title">404</h1>
            <p className="notfound__desc">La página que buscas no existe... o quizas si pero no haz comprado lo suficiente.</p>
            <a href="/" className="notfound__link">Volver al inicio</a>
        </section>
    );
}