// 1) Importa React y el formulario de solicitudes a cocina.
import React from 'react';
import KitchenRequestForm from '../components/KitchenReqForm.jsx';
// 2) Importa datos mock de cocinas y platos.
import { DISHES } from '../mocks/dishes.js';
import { KITCHENS } from '../mocks/sucursales.js';
// 3) Estilos.
import '../styles/kitchen.css';

export default function Kitchen() {
    // 4) Función para manejar el envío del formulario.
    const handleSubmit = (form) => {
        console.log('Solicitud enviada a cocina:', form);
        alert('Solicitud enviada correctamente');
    };

    // 5) Renderiza el formulario con datos mock.
    return (
        <section className="kitchen">
            <h1 className="kitchen__title">Gestión de cocina</h1>
            <KitchenRequestForm kitchens={KITCHENS} dishes={DISHES} onSubmit={handleSubmit} />
        </section>
    );
}