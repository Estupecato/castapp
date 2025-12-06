// este es el carrito
// lo quiero mas bonito tipo tarjetas como en pedidos
// intento escribir los comentarios como yo hablo, sin tanta formalidad
import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useNavigate } from 'react-router-dom';
import { DISHES } from '../mocks/dishes.js';
import '../styles/cart.css';

export default function Cart() {
    const [cart, setCart] = useLocalStorage('cart', []);
    const [orders, setOrders] = useLocalStorage('orders', []);
    const navigate = useNavigate();

    // total del carrito, asi de simple
    const total = useMemo(() => {
        return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    }, [cart]);

    // junto datos extras del platillo para mostrar imagen y descripcion
    const cartWithMeta = useMemo(() => {
        return cart.map(item => {
            const dish = DISHES.find(d => d.id === item.id);
            return { ...item, dish };
        });
    }, [cart]);

    // quitar solo una unidad, si queda en 0 lo saco
    const removeFromCart = (id) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, qty: item.qty - 1 }
                        : item
                )
                .filter(item => item.qty > 0)
        );
    };

    // confirmar compra y mandar a pedidos
    const handleCheckout = () => {
        if (cart.length === 0) return;

        const newOrder = {
            id: Date.now().toString(), // id sencillo basado en tiempo
            date: new Date().toLocaleString(), // fecha legible
            items: cart,
            total: total,
            status: 'activo' // empieza activo
        };

        // guardo la orden arriba de las demas
        setOrders(prev => [newOrder, ...prev]);

        // limpio carrito
        setCart([]);

        // aviso rapido y navego a pedidos
        alert('¡Pedido realizado con éxito!');
        navigate('/kitchen');
    };

    return (
        <section className="cart">
            <h1 className="cart__title">tu pedido</h1>

            {cart.length === 0 ? (
                <p className="cart__empty">aun no agregas nada al carrito</p>
            ) : (
                <>
                    {/* tarjetas tipo pedidos pero para items del carrito */}
                    <div className="cart__grid">
                        {cartWithMeta.map(item => (
                            <article key={item.id} className="cart__card">
                                <img
                                    className="cart__image"
                                    src={item.dish?.image}
                                    alt={item.name}
                                />

                                <div className="cart__body">
                                    <div className="cart__header">
                                        <h3 className="cart__name">{item.name}</h3>
                                        <span className="cart__qty">x{item.qty}</span>
                                    </div>

                                    {item.dish?.description && (
                                        <p className="cart__desc">{item.dish.description}</p>
                                    )}

                                    <div className="cart__footer">
                                        <p className="cart__subtotal">
                                            ${ (item.price * item.qty).toFixed(2) }
                                        </p>

                                        <button
                                            className="cart__remove"
                                            title="Quitar 1 unidad"
                                            aria-label={`Quitar una unidad de ${item.name}`}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            quitar 1
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="cart__summary">
                        <p className="cart__total">total: ${total.toFixed(2)}</p>
                        <button className="cart__checkout" onClick={handleCheckout}>
                            confirmar compra
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}