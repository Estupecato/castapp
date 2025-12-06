// 1) Importamos React porque vamos a usar JSX.
import React from 'react';
// 2) Importamos el CSS específico para este componente.
import '../styles/order-summary.css';

// 3) Definimos el componente funcional OrderSummary.
//    Recibe 'items' (array de platos en el carrito),
//    'onRemove' (función para eliminar un plato),
//    y 'onClear' (función para vaciar el carrito).
export default function OrderSummary({ items, onRemove, onClear }) {
    // 4) Calculamos el total del pedido sumando precio * cantidad.
    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    // 5) Renderizamos la sección con lista de platos y total.
    return (
        <div className="order-summary">
            <h2 className="order-summary__title">Resumen del pedido</h2>

            {/* 6) Lista de platos en el carrito */}
            <ul className="order-summary__list">
                {items.map(item => (
                    <li key={item.id} className="order-summary__item">
                        <span className="order-summary__name">{item.name}</span>
                        <span className="order-summary__qty">x{item.qty}</span>
                        <span className="order-summary__price">${item.price.toFixed(2)}</span>
                        {/* 7) Botón para eliminar un plato */}
                        <button
                            className="order-summary__remove"
                            onClick={() => onRemove(item.id)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            {/* 8) Total del pedido */}
            <p className="order-summary__total">Total: ${total.toFixed(2)}</p>

            {/* 9) Botón para vaciar el carrito */}
            <button className="order-summary__clear" onClick={onClear}>
                Vaciar carrito
            </button>
        </div>
    );
}