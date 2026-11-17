const API_URL = 'http://localhost:3000/api';

// Función auxiliar para incluir el encabezado de autorización
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const apiFetch = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers
        }
    });

    if (response.status === 401) {
        // Si el token venció o es inválido, limpiamos la sesión
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.reload();
        throw new Error('Sesión expirada. Por favor inicie sesión de nuevo.');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Error en la petición');
    }
    return data;
};