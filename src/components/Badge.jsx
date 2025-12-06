// 1) Importamos React y el CSS del badge.
import React from 'react';
import '../styles/badge.css';

// 2) Componente funcional Badge.
//    Recibe 'label' como prop para mostrar el texto de la etiqueta.
export default function Badge({ label }) {
    return (
        <span className="badge">{label}</span>
    );
}