// 1) Importa hooks de React.
import { useMemo, useState } from 'react';

// 2) Importa los datos mock de platos.
import { DISHES } from '../mocks/dishes.js';

// 3) Importa componentes de UI.
import SearchBar from '../components/SearchBar.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import DishGrid from '../components/DishGrid.jsx';
import EmptyState from '../components/EmptyState.jsx';

// 4) Estilos de la vista.
import '../styles/menu.css';
import DishCard from "../components/DishCard.jsx";

// 5) Componente de la página Menú.
export default function Menu() {
    // 6) Estado para término de búsqueda.
    const [query, setQuery] = useState('');

    // 7) Estado para filtros por categoría y etiquetas.
    const [category, setCategory] = useState('Todas');
    const [tag, setTag] = useState('Todas');

    // 8) Cálculo memorizado: filtra platos según query, categoría y tag.
    const filtered = useMemo(() => {
        return DISHES.filter(d => {
            // 9) Coincidencia por texto: nombre, categoría o tags.
            const q = query ? (
                d.name.toLowerCase().includes(query) ||
                d.category.toLowerCase().includes(query) ||
                d.tags.some(t => t.toLowerCase().includes(query))
            ) : true;
            // 10) Filtro por categoría (o todas).
            const c = category === 'Todas' ? true : d.category === category;
            // 11) Filtro por tag (o todas).
            const t = tag === 'Todas' ? true : d.tags.includes(tag.toLowerCase());
            // 12) Devuelve si cumple las tres condiciones.
            return q && c && t;
        });
    }, [query, category, tag]);

    // 13) Render con controles y resultados.
    return (
        <section className="menu">
            <h1 className="menu__title">Menú principal</h1>
            <div className="menu__controls">
                {/* 14) SearchBar comunica el término hacia 'setQuery'. */}
                <SearchBar onSearch={setQuery} />

                {/* 15) Panel de filtros: categorías y etiquetas disponibles. */}

                <FilterPanel
                    category={category}
                    onCategoryChange={setCategory}
                    tag={tag}
                    onTagChange={setTag}
                    dishes={DISHES}
                />
            </div>
            <div className="menu__list">
                {DISHES.map(dish => (
                    <DishCard key={dish.id} dish={dish} />
                ))}
            </div>

            {/* 16) Renderiza la grilla o un estado vacío si no hay resultados. */}
            {filtered.length ? (
                <DishGrid dishes={filtered} />
            ) : (
                <EmptyState message="Aun no inventamos el platillo que estas buscando." />
            )}
        </section>
    );
}