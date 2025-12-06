// 1) Importa hooks nativos de React.
import { useEffect, useState } from 'react';

// 2) Custom hook con sincronización real entre componentes.
//    Explicación rápida (lenguaje sencillo):
//    - Varias tarjetas (DishCard) usan el mismo carrito guardado en localStorage.
//    - Si cada tarjeta guarda su propia copia en memoria, al dar clic muy rápido
//      en tarjetas distintas, una puede sobrescribir a la otra con datos viejos.
//    - Para evitarlo, aquí siempre leemos el valor MÁS RECIENTE de localStorage
//      justo antes de guardar, y avisamos a las demás copias para que se actualicen.

export function useLocalStorage(key, initialValue) {
    // Lee el valor actual desde localStorage de forma segura.
    const readValue = () => {
        try {
            const saved = window.localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        } catch (_) {
            return initialValue;
        }
    };

    // 3) Estado inicial: tomamos lo que haya en localStorage.
    const [value, setValue] = useState(readValue);

    // 4) Setter seguro: acepta valor o función (como useState),
    //    pero calcula el nuevo valor partiendo de lo ÚLTIMO guardado en localStorage.
    const set = (updater) => {
        const current = readValue();
        const newValue = typeof updater === 'function' ? updater(current) : updater;
        // Guardamos primero en localStorage (fuente de verdad compartida)
        window.localStorage.setItem(key, JSON.stringify(newValue));
        // Actualizamos este estado local
        setValue(newValue);
        // Avisamos a otros componentes en esta misma pestaña/ventana.
        window.dispatchEvent(new CustomEvent('local-storage', { detail: { key, value: newValue } }));
    };

    // 5) Suscripción: si otra parte de la app cambia este key, nos actualizamos.
    useEffect(() => {
        // Evento nativo 'storage' (se dispara en otras pestañas). Aquí no ayuda dentro
        // de la misma pestaña, pero lo dejamos por si abres el sitio en otra ventana.
        const onStorage = (e) => {
            if (e.key === key) {
                setValue(readValue());
            }
        };

        // Evento personalizado para esta misma pestaña (emitido arriba en 'set').
        const onCustom = (e) => {
            if (e.detail?.key === key) {
                setValue(e.detail.value);
            }
        };

        window.addEventListener('storage', onStorage);
        window.addEventListener('local-storage', onCustom);
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('local-storage', onCustom);
        };
    }, [key]);

    // 6) Devolvemos el valor y nuestro setter seguro.
    return [value, set];
}