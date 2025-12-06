// 1) Importamos React y el CSS del header.
import React from 'react';
import '../styles/header.css';
// 2) Importamos la navegación para incluirla dentro del header.
import Nav from './Nav.jsx';

// 3) Componente funcional Header.
export default function Header() {
    return (
        <header className="header">
            {/* 4) Título de la aplicación */}
            <h1 className="header__title">CASTAPP</h1>
            {/* 5) Barra de navegación */}
            <Nav />
        </header>
    );
}