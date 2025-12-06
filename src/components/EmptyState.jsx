// 1) Importamos React porque vamos a usar JSX.
import React from 'react';
// 2) Importamos el CSS específico para este componente.
import '../styles/empty-state.css';

// 3) Definimos el componente funcional EmptyState.
//    Recibe 'message' como prop para mostrar un texto dinámico.
export default function EmptyState({ message }) {
    return (
        <div className="empty-state">
            {/* 4) Renderizamos el mensaje recibido */}
            <p className="empty-state__text">{message}</p>
        </div>
    );
}