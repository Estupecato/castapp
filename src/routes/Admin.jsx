// 1) Importa React y estilos.
import React from 'react';
import '../styles/admin.css';

export default function Admin() {
    // 2) Renderiza una vista simple de administración.
    return (
        <section className="admin">
            <h1 className="admin__title">Panel de administración</h1>
            <p className="admin__desc">
                Aquí podrías gestionar estadísticas, pedidos históricos o configuración del menú.
            </p>
            <ul className="admin__list">
                <li className="admin__item">Pedidos completados: 120</li>
                <li className="admin__item">Platos activos: 15</li>
                <li className="admin__item">Usuarios registrados: 45</li>
            </ul>
        </section>
    );
}