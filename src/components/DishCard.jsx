// 1) Importa el custom hook para persistir el carrito.
import { useLocalStorage } from '../hooks/useLocalStorage.js';
// 2) Importa un componente Badge y el CSS de la tarjeta.
import Badge from './Badge.jsx';
import '../styles/dish-card.css';

// 3) Recibe el plato como prop.
export default function DishCard({ dish }) {
    // 4) Carrito persistente en localStorage.
    const [cart, setCart] = useLocalStorage('cart', []);

    // 5) Función para añadir al carrito:
    //    - Si ya existe el producto, incrementa qty.
    //    - Si no existe, lo agrega con qty: 1.
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
    };

    // 6) Render de la tarjeta con BEM.
    return (
        <article className="dish-card">
            {/* 7) Imagen del plato. */}
            <img className="dish-card__image" src={dish.image} alt={dish.name} />
            <div className="dish-card__body">
                {/* 8) Título y metadatos. */}
                <h3 className="dish-card__title">{dish.name}</h3>
                <p className="dish-card__meta">{dish.category}</p>
                <p className="dish-card__price">${dish.price.toFixed(2)}</p>

                {/* 9) Etiquetas como badges: vegano, sin gluten, picante. */}
                <div className="dish-card__tags">
                    {dish.tags?.map(t => <Badge key={t} label={t} />)}
                    {dish.spicy && <Badge label="picante" />}
                    {dish.glutenFree && <Badge label="sin gluten" />}
                </div>

                {/* 10) Botón para añadir al carrito. */}
                <button className="dish-card__btn" onClick={addToCart}>
                    Añadir
                </button>
            </div>
        </article>
    );
}