import { StrictMode } from 'react'
import './index.css'

// 1) Importa React para usar JSX.
import React from 'react';
// 2) Importa el metodo moderno para montar React en el DOM.
import { createRoot } from 'react-dom/client';
// 3) Importa las funciones del Router v6 para crear y proveer rutas.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 4) Importa el layout principal y las vistas.
import App from './App.jsx';
import Home from './routes/Home.jsx';
import Menu from './routes/Menu.jsx';
import DishDetail from './routes/DishDetail.jsx';
import Cart from './routes/Cart.jsx';
import Kitchen from './routes/Kitchen.jsx';
import Admin from './routes/Admin.jsx';
import NotFound from './routes/NotFound.jsx';

// 5) Importa estilos base globales.
import './styles/base.css';

// 6) Define el árbol de rutas con Router v6.
const router = createBrowserRouter([
    {
        // 7) Ruta raíz que usa App como layout.
        path: '/',
        element: <App />,
        // 8) Rutas hijas renderizadas dentro de <Outlet /> en App.
        children: [
            // 9) Ruta index: Home (equivalente a path '/').
            { index: true, element: <Home /> },
            // 10) Listado del menú.
            { path: 'menu', element: <Menu /> },
            // 11) Detalle de un plato por id dinámico.
            { path: 'menu/:id', element: <DishDetail /> },
            // 12) Carrito/pedido del cliente.
            { path: 'cart', element: <Cart /> },
            // 13) Vista de cocina/solicitudes.
            { path: 'kitchen', element: <Kitchen /> },
            // 14) Sección administrativa básica.
            { path: 'admin', element: <Admin /> },
            // 15) Captura cualquier ruta no definida.
            { path: '*', element: <NotFound /> }
        ]
    }
]);

// 16) Monta el Router en el nodo root del HTML.
createRoot(document.getElementById('root')).render(

    // 17) StrictMode ayuda a detectar problemas en desarrollo.
    <React.StrictMode>
        {/* 18) Proveedor del router: habilita la navegación en toda la app. */}
        <RouterProvider router={router} />

    </React.StrictMode>
);

