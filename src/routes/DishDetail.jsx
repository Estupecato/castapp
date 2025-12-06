// 1) Importa React y hooks de Router para leer parámetros de la URL.
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// 2) Importa los datos mock de platos.
import { DISHES } from '../mocks/dishes.js';

// 3) Importa el hook de carrito y estilos.
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import '../styles/dish-details.css';

export default function DishDetail() {
    // 4) useParams nos da el id dinámico de la URL (ej: /menu/d1).
    const { id } = useParams();

    // 5) Buscamos el plato correspondiente en el mock.
    const dish = DISHES.find(d => d.id === id);

    // 6) Carrito persistente en localStorage.
    const [cart, setCart] = useLocalStorage('cart', []);
    // 6.1) Mensaje temporal para avisar que se agregó al carrito.
    const [addedMsg, setAddedMsg] = useState('');

    // 7) Función para añadir el plato al carrito consolidando cantidades.
    const addToCart = () => {
        setCart(prevCart => {
            const exists = prevCart.find(item => item.id === dish.id);
            if (exists) {
                // Si ya existe, incrementamos qty
                return prevCart.map(item =>
                    item.id === dish.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                // Si no existe, lo añadimos con qty = 1
                return [...prevCart, { id: dish.id, name: dish.name, price: dish.price, qty: 1 }];
            }
        });

        // 7.1) Activamos un mensajito amable por 1.5 segundos.
        setAddedMsg(`Se agregó "${dish.name}" al carrito`);
        setTimeout(() => setAddedMsg(''), 1500);
    };

    // 8) Render: si no existe el plato, mostramos mensaje.
    if (!dish) return <p>Plato no encontrado.</p>;

    return (
        <section className="dish-detail">
            <h1 className="dish-detail__title">{dish.name}</h1>
            <img className="dish-detail__image" src={dish.image} alt={dish.name} />
            <p className="dish-detail__desc">{dish.description}</p>
            <p className="dish-detail__price">${dish.price.toFixed(2)}</p>
            <button type="button" className="dish-detail__btn" onClick={addToCart}>
                Añadir al carrito
            </button>
            {/* 9) Mensaje temporal de confirmación de agregado. */}
            {addedMsg && (
                <div className="dish-detail__feedback" role="status" aria-live="polite">
                    {addedMsg}
                </div>
            )}
        </section>
    );
}