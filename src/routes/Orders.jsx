import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
// Importamos los estilos de esta vista para que se vea bonito y ordenado
import '../styles/orders.css';

export default function Orders() {
    const [orders, setOrders] = useLocalStorage('orders', []);

    function cancelOrder(id) {
        // Pedimos confirmación antes de cancelar
        if (!confirm('¿Estás seguro de que quieres cancelar este pedido?')) return;

        setOrders(prev =>
            prev.map(order =>
                order.id === id ? { ...order, status: 'cancelado' } : order
            )
        );
    }

    return (
        <section className="orders">
            <h1 className="orders__title">Pedidos</h1>
            
            {orders.length === 0 ? (
                <p className="orders__empty">No hay pedidos registrados actualmente.</p>
            ) : (
                <div className="orders__grid">
                    {orders.map(order => (
                        <div key={order.id} className={`orders__card ${order.status}`}>
                            <div className="orders__header">
                                <span className="orders__id">#{order.id.slice(-4)}</span>
                                <span className="orders__date">{order.date}</span>
                                <span className={`orders__status status-${order.status}`}>
                                    {order.status.toUpperCase()}
                                </span>
                            </div>
                            
                            <ul className="orders__items">
                                {order.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.qty}x {item.name}
                                    </li>
                                ))}
                            </ul>

                            <div className="orders__footer">
                                <p className="orders__total">Total: ${order.total.toFixed(2)}</p>
                                
                                {order.status === 'activo' && (
                                    <button 
                                        className="orders__cancel-btn"
                                        onClick={() => cancelOrder(order.id)}
                                    >
                                        Cancelar Pedido
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
