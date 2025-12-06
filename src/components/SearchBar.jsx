// 1) Importa hooks nativos y el custom hook de debounce.
import { useState, useEffect } from 'react';
import { useDebouncedValue } from '../hooks/useDebouncedValue.js';
// 2) Importa el CSS específico con BEM.
import '../styles/search-bar.css';

// 3) Componente funcional: recibe 'onSearch' para comunicar el término.

export default function SearchBar({ onSearch }) {
    // 4) Estado controlado del input de búsqueda.

    const [query, setQuery] = useState('');

    // 5) Aplica debounce para no disparar búsqueda en cada pulsación.

    const debouncedQuery = useDebouncedValue(query, 300);

    // 6) Efecto: cuando el valor "debounceado" cambia, llama a onSearch.
    useEffect(() => {
        onSearch(debouncedQuery.trim().toLowerCase());
    }, [debouncedQuery, onSearch]);

    // 7) Render: bloque BEM 'search-bar' con label e input.

    return (
        <div className="search-bar">
            <label className="search-bar__label" htmlFor="q">Buscar platos</label>
            <input
                id="q"
                className="search-bar__input"
                type="text"
                placeholder="Nombre, categoría, etiqueta..."
                value={query}
                // 8) Actualiza estado al escribir.
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}