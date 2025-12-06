// 1) Importa useState para manejar el formulario controlado.
import { useState } from 'react';
// 2) Importa estilos de la vista/form.
import '../styles/kitchen.css';

// 3) Recibe listas y callback onSubmit para procesar la solicitud.
export default function KitchenReqForm({ kitchens, dishes, onSubmit }) {
    // 4) Estado del formulario: cocina, plato del día, acción y notas.
    const [form, setForm] = useState({
        kitchenId: '',
        dishId: '',
        action: 'activar_plato_del_dia', // o 'reponer_ingredientes'
        notes: ''
    });

    // 5) Actualiza estado según los inputs del formulario.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // 6) Envía la solicitud, resetea el formulario.
    const submit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ kitchenId: '', dishId: '', action: 'activar_plato_del_dia', notes: '' });
    };

    // 7) Render del formulario con clases BEM.
    return (
        <form className="kitchen-form" onSubmit={submit}>
            <h2 className="kitchen-form__title">Solicitud a cocina</h2>

            <div className="kitchen-form__row">
                <label className="kitchen-form__label">Cocina</label>
                <select
                    name="kitchenId"
                    className="kitchen-form__select"
                    value={form.kitchenId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona cocina</option>
                    {kitchens.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
                </select>
            </div>

            <div className="kitchen-form__row">
                <label className="kitchen-form__label">Plato</label>
                <select
                    name="dishId"
                    className="kitchen-form__select"
                    value={form.dishId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona plato</option>
                    {dishes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
            </div>

            <div className="kitchen-form__row">
                <label className="kitchen-form__label">Acción</label>
                <select
                    name="action"
                    className="kitchen-form__select"
                    value={form.action}
                    onChange={handleChange}
                >
                    <option value="activar_plato_del_dia">Activar plato del día</option>
                    <option value="reponer_ingredientes">Reponer ingredientes</option>
                </select>
            </div>

            <div className="kitchen-form__row">
                <label className="kitchen-form__label">Notas</label>
                <textarea
                    name="notes"
                    className="kitchen-form__textarea"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Urgencia, detalles, sustituciones..."
                />
            </div>

            <button className="kitchen-form__btn">Enviar solicitud</button>
        </form>
    );
}