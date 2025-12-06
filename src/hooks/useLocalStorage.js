// 1) Importa hooks nativos de React.
import { useEffect, useState } from 'react';

// 2) Define el custom hook: maneja estado + persistencia en localStorage.

export function useLocalStorage(key, initialValue) {
    // 3) Estado inicial: intenta leer de localStorage; si no, usa initialValue.

    const [value, setValue] = useState(() => {
        const saved = window.localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });

    // 4) Efecto: cada vez que 'value' o 'key' cambian, guarda en localStorage.

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // 5) Devuelve el estado y su setter para usarlo como cualquier useState.
    return [value, setValue];
}