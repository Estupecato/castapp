import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import '../styles/orders.css';

export default function Orders() {
    const [orders, setOrders] = useLocalStorage('orders', []);

    function cancelOrder(id) {
        setOrders(prev =>
            prev.map(order =>
                order.id === id ? { ...order, status: 'cancelado' } : order
            )
        );
    }

    return (
        <section className="orders">
            <h2>Pedidos</h2>
            {orders.length === 0 ? (
                <p>No hay pedidos registrados.</p>
            ) : (
                <ul className="orders__list">
                    {orders.map(order => (
                        <li key={order.id} className="orders__item">
                            <p><strong>Fecha:</strong> {order.date}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <ul>
                                {order.items.map(i => (
                                    <li key={i.id}>{i.name} x{i.qty}</li>
                                ))}
                            </ul>
                            {order.status === 'activo' && (
                                <button onClick={() => cancelOrder(order.id)}>Cancelar</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}