// 1) Importa React useState para manejar mensajitos temporales en pantalla.
import { useState } from 'react';
// 2) Importa el custom hook para persistir el carrito en el navegador.
import { useLocalStorage } from '../hooks/useLocalStorage.js';
// 3) Importa un componente Badge (etiquetitas) y el CSS de la tarjeta.
import Badge from './Badge.jsx';
import '../styles/dish-card.css';

// 4) Recibe el platillo (dish) como prop.
export default function DishCard({ dish }) {
    // 5) Guardamos el carrito en localStorage para que no se borre al recargar.
    const [cart, setCart] = useLocalStorage('cart', []);
    // 6) Estado para mostrar un aviso cortito cuando algo se agrega al carrito.
    const [addedMsg, setAddedMsg] = useState('');

    // 7) Esta función se ejecuta cuando damos clic en "Añadir":
    //    - Si el platillo ya está en el carrito, solo aumentamos la cantidad.
    //    - Si no está, lo agregamos con cantidad 1.
    const addToCart = () => {
        setCart(prevCart => {
            const exists = prevCart.find(item => item.id === dish.id);
            if (exists) {
                return prevCart.map(item =>
                    item.id === dish.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }
            return [
                ...prevCart,
                { id: dish.id, name: dish.name, price: dish.price, qty: 1 }
            ];
        });

        // 8) Mostramos un mensaje para confirmar que sí se agrego
        setAddedMsg(`Se agregó "${dish.name}" al carrito`);
        // 9) Ocultamos el mensaje solito después de 1.5 segundos.
        setTimeout(() => setAddedMsg(''), 1500);
    };

    // 10) Render de la tarjeta con clases BEM (solo es una manera ordenada de nombrar estilos).
    return (
        <article className="dish-card">
            {/* 7) Imagen del plato. */}
            <img className="dish-card__image" src={dish.image} alt={dish.name} />
            <div className="dish-card__body">
                {/* 8) Título y metadatos. */}
                <h3 className="dish-card__title">{dish.name}</h3>
                <p className="dish-card__meta">{dish.category}</p>
                {/* 8.1) Descripción corta del platillo (texto del mock). */}
                <p className="dish-card__desc">
                    {dish.description}
                </p>
                <p className="dish-card__price">${dish.price.toFixed(2)}</p>

                {/* 9) Etiquetas como badges: vegano, sin gluten, picante. */}
                <div className="dish-card__tags">
                    {dish.tags?.map(t => <Badge key={t} label={t} />)}
                    {dish.spicy && <Badge label="picante" />}
                    {dish.glutenFree && <Badge label="sin gluten" />}
                </div>

                {/* 11) Botón para añadir al carrito. "type=button" evita comportamientos raros en formularios. */}
                <button type="button" className="dish-card__btn" onClick={addToCart}>
                    Añadir
                </button>

                {/* 12) Mensaje temporal para avisar que sí se añadió al carrito. */}
                {addedMsg && (
                    <div className="dish-card__feedback" role="status" aria-live="polite">
                        {addedMsg}
                    </div>
                )}
            </div>
        </article>
    );
}