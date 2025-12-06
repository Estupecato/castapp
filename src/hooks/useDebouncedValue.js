// 1) Importa hooks nativos.
import { useEffect, useState } from 'react';

// 2) Recibe un valor y un delay: devuelve el valor con "rebote" (debounce).

export function useDebouncedValue(value, delay = 300) {
    // 3) Estado interno que se actualiza retrasado.
    const [debounced, setDebounced] = useState(value);

    // 4) Efecto: programa un timeout para actualizar tras 'delay'.

    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        // 5) Limpia el timeout si el valor cambia antes de que se cumpla el tiempo.
        return () => clearTimeout(t);
    }, [value, delay]);

    // 6) Devuelve el valor ya "debounceado".
    return debounced;
}