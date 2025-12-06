// 1) Importamos React para usar JSX.
import React from 'react';
// 2) Importamos la tarjeta de plato que renderizaremos dentro del grill.
import DishCard from './DishCard.jsx';
// 3) Importamos el CSS del grill(opcional, pero recomendado).
import '../styles/dish-grid.css';

// 4) Componente funcional: recibe 'dishes' (array de platos) como prop.
export default function DishGrid({ dishes }) {
    // 5) Renderiza un contenedor con clase BEM y mapea cada plato a una DishCard.
    return (
        <div className="dish-grid">
            {dishes.map(dish => (
                // 6) Cada tarjeta necesita una key única; usamos 'dish.id'.
                <DishCard key={dish.id} dish={dish} />
            ))}
        </div>
    );
}