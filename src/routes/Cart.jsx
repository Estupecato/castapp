// 1) Importa el hook de localStorage y componentes de carrito.
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import OrderSummary from '../components/OrderSummary.jsx';
import EmptyState from '../components/EmptyState.jsx';
// 2) Estilos de la vista.
import '../styles/cart.css';

// 3) Componente para la ruta del carrito.
export default function Cart() {
    // 4) Carrito persistente: arreglo de items {id, name, price, qty}.
    const [cart, setCart] = useLocalStorage('cart', []);

    // 5) Elimina por id.
    const removeItem = (id) => setCart(cart.filter(i => i.id !== id));
    // 6) Limpia todo el carrito.
    const clearCart = () => setCart([]);

    // 7) Render: título y contenido según haya items o no.
    return (
        <section className="cart">
            <h1 className="cart__title">Tu pedido</h1>
            {cart.length ? (
                <OrderSummary items={cart} onRemove={removeItem} onClear={clearCart} />
            ) : (
                <EmptyState message="Tu carrito está vacío." />
            )}
        </section>
    );
}