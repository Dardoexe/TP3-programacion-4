import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export default function Viajes() {
    const [viajes, setViajes] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [conductores, setConductores] = useState([]);

    const [vehiculoId, setVehiculoId] = useState('');
    const [conductorId, setConductorId] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [fechaLlegada, setFechaLlegada] = useState('');
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [kilometros, setKilometros] = useState('');
    const [observaciones, setObservaciones] = useState('');
    
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const cargarDatos = async () => {
        try {
            const [dataViajes, dataVehiculos, dataConductores] = await Promise.all([
                apiFetch('/viajes'),
                apiFetch('/vehiculos'),
                apiFetch('/conductores')
            ]);
            setViajes(dataViajes);
            setVehiculos(dataVehiculos);
            setConductores(dataConductores);
        } catch (err) {
            setError('Error al cargar los datos iniciales.');
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            // Enviamos exactamente los campos que espera el backend según la tabla
            const nuevoViaje = await apiFetch('/viajes', {
                method: 'POST',
                body: JSON.stringify({
                    vehiculo_id: vehiculoId,
                    conductor_id: conductorId,
                    fecha_salida: fechaSalida,
                    fecha_llegada: fechaLlegada,
                    origen,
                    destino,
                    kilometros,
                    observaciones
                })
            });

            if (nuevoViaje && nuevoViaje.id) {
                setViajes(prev => [...prev, nuevoViaje]);
            } else {
                await cargarDatos();
            }

            // Limpiar formulario
            setVehiculoId('');
            setConductorId('');
            setFechaSalida('');
            setFechaLlegada('');
            setOrigen('');
            setDestino('');
            setKilometros('');
            setObservaciones('');
        } catch (err) {
            setError(err.message || 'Error al registrar el viaje.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
            <div style={{ flex: 1, background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Registrar Nuevo Viaje</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Vehículo:</label>
                        <select 
                            value={vehiculoId} 
                            onChange={(e) => setVehiculoId(e.target.value)} 
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        >
                            <option value="">Seleccione un vehículo...</option>
                            {vehiculos.map(v => (
                                <option key={v.id} value={v.id}>{v.dominio || v.patente} - {v.marca} {v.modelo}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Conductor:</label>
                        <select 
                            value={conductorId} 
                            onChange={(e) => setConductorId(e.target.value)} 
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        >
                            <option value="">Seleccione un conductor...</option>
                            {conductores.map(c => (
                                <option key={c.id} value={c.id}>{c.nombre} {c.apellido} (DNI: {c.dni})</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Fecha y Hora Salida:</label>
                        <input
                            type="datetime-local"
                            value={fechaSalida}
                            onChange={(e) => setFechaSalida(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Fecha y Hora Llegada:</label>
                        <input
                            type="datetime-local"
                            value={fechaLlegada}
                            onChange={(e) => setFechaLlegada(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Origen:</label>
                        <input
                            type="text"
                            value={origen}
                            onChange={(e) => setOrigen(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Destino:</label>
                        <input
                            type="text"
                            value={destino}
                            onChange={(e) => setDestino(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Kilómetros:</label>
                        <input
                            type="number"
                            step="0.01"
                            value={kilometros}
                            onChange={(e) => setKilometros(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label>Observaciones:</label>
                        <textarea
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>

                    <button type="submit" disabled={cargando} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                        {cargando ? 'Guardando...' : 'Guardar Viaje'}
                    </button>
                </form>
            </div>

            <div style={{ flex: 1, background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h3>Viajes Registrados</h3>
                {viajes.length === 0 ? (
                    <p>No hay viajes registrados aún.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {viajes.map((v) => (
                            <li key={v.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                                <strong>{v.origen} ➔ {v.destino}</strong><br />
                                <small>Km: {v.kilometros} | Salida: {new Date(v.fecha_salida).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}