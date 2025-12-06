import React from 'react';
import OrderSummary from '../components/OrderSummary.jsx';
import useLocalStorage from '../hooks/useLocalStorage.js';

export default function Cart() {
    // items = [{ id, name, price, qty }]
    const [items, setItems] = useLocalStorage('cart', []);

    // 🔧 Reducir cantidad o eliminar si llega a 0
    function handleRemove(id) {
        setItems(prevItems =>
            prevItems
                .map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0)
        );
    }

    // 🔧 Vaciar carrito completo
    function handleClear() {
        setItems([]);
    }

    return (
        <div className="cart">
            <h2>Carrito</h2>
            <OrderSummary
                items={items}
                onRemove={handleRemove}
                onClear={handleClear}
            />
        </div>
    );
}