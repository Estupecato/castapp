// 1) Importamos React porque vamos a usar JSX.
import React from 'react';
// 2) Importamos el CSS específico para la vista Home.
import '../styles/home.css';
// 3) Importamos algunos componentes reutilizables.
import DishGrid from '../components/DishGrid.jsx';
import { DISHES } from '../mocks/dishes.js';

// 4) Definimos el componente funcional Home.
export default function Home() {
    // 5) Seleccionamos algunos platos destacados para mostrar en portada.
    const featured = DISHES.slice(0, 3); // toma los primeros 3 platos

    // 6) Renderizamos la sección principal de la página Home.
    return (
        <section className="home">
            {/* 7) Título principal de la aplicación */}
            <h1 className="home__title">Bienvenido a CASTAPP</h1>

            {/* 8) Subtítulo con mensaje introductorio */}
            <p className="home__subtitle">
                Explora nuestro menú digital y crea tu pedido fácilmente.
            </p>

            {/* 9) Sección de destacados */}
            <div className="home__featured">
                <h2 className="home__featured-title">Platos destacados</h2>
                {/* 10) Usamos DishGrid para mostrar los platos seleccionados */}
                <DishGrid dishes={featured} />
            </div>

            {/* 11) Llamada a la acción para ir al menú completo */}
            <div className="home__cta">
                <a href="/menu" className="home__cta-btn">Ver menú completo</a>
            </div>
        </section>
    );
}