import { useState } from 'react';
import { apiFetch } from '../services/api';

export default function Login({ onLoginSuccess }) {
    const [esRegistro, setEsRegistro] = useState(false);
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMensaje('');

        try {
            if (esRegistro) {
                // Petición de Registro
                await apiFetch('/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({ nombre, email, password })
                });
                setMensaje('¡Registro exitoso! Ahora puedes iniciar sesión.');
                setEsRegistro(false);
                setPassword('');
            } else {
                // Petición de Login
                const data = await apiFetch('/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                });

                // Guardamos el token y los datos del usuario en localStorage[cite: 2]
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));

                // Notificamos a App.jsx para actualizar la vista
                onLoginSuccess(data.usuario);
            }
        } catch (err) {
            setError(err.message || 'Ocurrió un error al procesar la solicitud.');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>{esRegistro ? 'Registrar Usuario' : 'Iniciar Sesión'}</h2>

                {error && <div style={styles.error}>{error}</div>}
                {mensaje && <div style={styles.success}>{mensaje}</div>}

                {esRegistro && (
                    <div style={styles.inputGroup}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div style={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" style={styles.button}>
                    {esRegistro ? 'Registrarse' : 'Ingresar'}
                </button>

                <p style={styles.toggleText}>
                    {esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                    <button
                        type="button"
                        onClick={() => {
                            setEsRegistro(!esRegistro);
                            setError('');
                            setMensaje('');
                        }}
                        style={styles.toggleButton}
                    >
                        {esRegistro ? 'Inicia sesión aquí' : 'Regístrate aquí'}
                    </button>
                </p>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
    },
    form: {
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
    },
    inputGroup: {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '1rem'
    },
    error: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem'
    },
    success: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem'
    },
    toggleText: {
        marginTop: '1rem',
        textAlign: 'center'
    },
    toggleButton: {
        background: 'none',
        border: 'none',
        color: '#007bff',
        cursor: 'pointer',
        textDecoration: 'underline',
        marginLeft: '0.5rem'
    }
};