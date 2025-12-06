// 1) Importa Outlet para renderizar rutas hijas o children dentro del layout.
import { Outlet } from 'react-router-dom';
// 2) Importa componentes de layout.
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// 3) Componente funcional principal del layout.
export default function App() {
    return (
        // 4) Bloque BEM del layout.
        <div className="layout">
            {/* 5) encabezado persistente con navegación. */}
            <Header />
            {/* 6) Contenedor principal donde se renderizan las rutas hijas. */}
            <main className="layout__main">
                {/* 7) Outlet inserta el componente de la ruta actual aquí. */}
                <Outlet />
            </main>
            {/* 8) Pie persistente. */}
            <Footer />
        </div>
    );
}