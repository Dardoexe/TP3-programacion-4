import { useState, useEffect } from 'react';
import Login from './components/Login';
import Vehiculos from './components/Vehiculos';
import Conductores from './components/Conductores';
import Viajes from './components/Viajes';

export default function App() {
    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [vistaActual, setVistaActual] = useState('vehiculos');

    useEffect(() => {
        // Leemos token y usuario
        const tokenGuardado = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');

        if (tokenGuardado && usuarioGuardado) {
            setToken(tokenGuardado);
            try {
                setUsuario(JSON.parse(usuarioGuardado));
            } catch (e) {
                logout();
            }
        } else {
            // Si falta cualquiera de los dos, limpiamos todo
            logout();
        }
    }, []);

    const handleLoginSuccess = (usuarioData) => {
        const t = localStorage.getItem('token');
        setToken(t);
        setUsuario(usuarioData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
    };

    // SI NO HAY TOKEN VÁLIDO O USUARIO, MOSTRAR ÚNICAMENTE EL LOGIN
    if (!token || !usuario) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    // SI HAY TOKEN, MOSTRAR LA APLICACIÓN Y SUS PESTAÑAS
    return (
        <div>
            <nav className="navbar">
                <h2>Gestión de Transportes</h2>
                <ul>
                    <li><a href="#" onClick={() => setVistaActual('vehiculos')}>Vehículos</a></li>
                    <li><a href="#" onClick={() => setVistaActual('conductores')}>Conductores</a></li>
                    <li><a href="#" onClick={() => setVistaActual('viajes')}>Viajes</a></li>
                    <li><span>Hola, {usuario.nombre}</span></li>
                    <li><button onClick={logout}>Cerrar Sesión</button></li>
                </ul>
            </nav>

            <div className="container">
                {vistaActual === 'vehiculos' && <Vehiculos />}
                {vistaActual === 'conductores' && <Conductores />}
                {vistaActual === 'viajes' && <Viajes />}
            </div>
        </div>
    );
}