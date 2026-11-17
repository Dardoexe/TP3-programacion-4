import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export default function Vehiculos() {
    const [vehiculos, setVehiculos] = useState([]);
    const [dominio, setDominio] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [anio, setAnio] = useState('');
    const [capacidadCarga, setCapacidadCarga] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarVehiculos = async () => {
        try {
            const data = await apiFetch('/vehiculos');
            setVehiculos(data);
        } catch (err) {
            setError('Error al cargar la lista de vehículos.');
        }
    };

    useEffect(() => {
        cargarVehiculos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const nuevoVehiculo = await apiFetch('/vehiculos', {
                method: 'POST',
                body: JSON.stringify({
                    dominio,
                    marca,
                    modelo,
                    anio,
                    capacidad_carga: capacidadCarga
                })
            });

            if (nuevoVehiculo && nuevoVehiculo.id) {
                setVehiculos(prev => [...prev, nuevoVehiculo]);
            } else {
                await cargarVehiculos();
            }

            setDominio('');
            setMarca('');
            setModelo('');
            setAnio('');
            setCapacidadCarga('');
        } catch (err) {
            setError(err.message || 'Error al guardar el vehículo.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
            <div style={{ flex: 1, background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Registrar Nuevo Vehículo</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Dominio (Patente):</label>
                        <input
                            type="text"
                            value={dominio}
                            onChange={(e) => setDominio(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Marca:</label>
                        <input
                            type="text"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Modelo:</label>
                        <input
                            type="text"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Año:</label>
                        <input
                            type="number"
                            value={anio}
                            onChange={(e) => setAnio(e.target.value)}
                            required
                            placeholder="ej: 2022"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Capacidad de Carga (kg):</label>
                        <input
                            type="number"
                            value={capacidadCarga}
                            onChange={(e) => setCapacidadCarga(e.target.value)}
                            required
                            placeholder="ej: 1500"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                        {cargando ? 'Guardando...' : 'Guardar Vehículo'}
                    </button>
                </form>
            </div>

            <div style={{ flex: 1, background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Vehículos Registrados</h3>
                {vehiculos.length === 0 ? (
                    <p>No hay vehículos registrados aún.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {vehiculos.map((v) => (
                            <li key={v.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                                <strong>{v.dominio}</strong> - {v.marca} {v.modelo} ({v.anio}) | Carga: {v.capacidad_carga} kg
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}