// 1) Importamos React y el CSS del nav.
import React from 'react';
import '../styles/nav.css';

// 2) Componente funcional Nav.
//    Contiene enlaces de navegación a las rutas principales.
export default function Nav() {
    return (
        <nav className="nav">
            <a href="/" className="nav__link">Inicio</a>
            <a href="/menu" className="nav__link">Menú</a>
            <a href="/cart" className="nav__link">Carrito</a>
            <a href="/kitchen" className="nav__link">Pedidos</a>
            <a href="/admin" className="nav__link">Admin</a>
        </nav>
    );
}