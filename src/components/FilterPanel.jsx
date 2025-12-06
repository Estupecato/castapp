// 1) Importamos React porque vamos a usar JSX.
import React from 'react';
// 2) Importamos el CSS específico para este componente.
import '../styles/filter-panel.css';

// 3) Definimos el componente funcional FilterPanel.
//    Recibe props: categoría actual, función para cambiar categoría,
//    etiqueta actual, función para cambiar etiqueta, y lista de platos.
export default function FilterPanel({ category, onCategoryChange, tag, onTagChange, dishes }) {
    // 4) Obtenemos todas las categorías únicas de los platos.
    const categories = ['Todas', ...new Set(dishes.map(d => d.category))];
    // 5) Definimos las etiquetas disponibles.
    const tags = ['Todas', 'vegano', 'vegetariano', 'sin gluten', 'picante'];

    // 6) Renderizamos el panel con dos selects: categoría y etiqueta.
    return (
        <div className="filter-panel">
            {/* Select de categorías */}
            <select
                className="filter-panel__select"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            {/* Select de etiquetas */}
            <select
                className="filter-panel__select"
                value={tag}
                onChange={(e) => onTagChange(e.target.value)}
            >
                {tags.map(t => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>
        </div>
    );
}