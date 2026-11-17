import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export default function Conductores() {
    const [conductores, setConductores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [licencia, setLicencia] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarConductores = async () => {
        try {
            const data = await apiFetch('/conductores');
            setConductores(data);
        } catch (err) {
            setError('Error al cargar la lista de conductores.');
        }
    };

    useEffect(() => {
        cargarConductores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const nuevoConductor = await apiFetch('/conductores', {
                method: 'POST',
                body: JSON.stringify({
                    nombre,
                    apellido,
                    dni,
                    licencia,
                    fecha_alta_licencia: fechaAlta,
                    fecha_vencimiento_licencia: fechaVencimiento
                })
            });

            if (nuevoConductor && nuevoConductor.id) {
                setConductores(prev => [...prev, nuevoConductor]);
            } else {
                await cargarConductores();
            }

            setNombre('');
            setApellido('');
            setDni('');
            setLicencia('');
            setFechaAlta('');
            setFechaVencimiento('');
        } catch (err) {
            setError(err.message || 'Error al guardar el conductor.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
            <div style={{ flex: 1, background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Registrar Nuevo Conductor</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Apellido:</label>
                        <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>DNI:</label>
                        <input
                            type="text"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>N° Licencia:</label>
                        <input
                            type="text"
                            value={licencia}
                            onChange={(e) => setLicencia(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Fecha Alta Licencia:</label>
                        <input
                            type="date"
                            value={fechaAlta}
                            onChange={(e) => setFechaAlta(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Fecha Vencimiento Licencia:</label>
                        <input
                            type="date"
                            value={fechaVencimiento}
                            onChange={(e) => setFechaVencimiento(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                        {cargando ? 'Guardando...' : 'Guardar Conductor'}
                    </button>
                </form>
            </div>

            <div style={{ flex: 1, background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Conductores Registrados</h3>
                {conductores.length === 0 ? (
                    <p>No hay conductores registrados aún.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {conductores.map((c) => (
                            <li key={c.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                                <strong>{c.nombre} {c.apellido}</strong> — DNI: {c.dni}<br />
                                <small>Licencia: {c.licencia} | Vence: {c.fecha_vencimiento_licencia ? new Date(c.fecha_vencimiento_licencia).toLocaleDateString() : 'N/A'}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}