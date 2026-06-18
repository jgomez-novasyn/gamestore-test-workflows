const API_URL = 'http://localhost:3001/api';

let authToken = localStorage.getItem('token');
let refreshToken = localStorage.getItem('refreshToken');

export const setTokens = (token: string, refresh: string) => {
  authToken = token;
  refreshToken = refresh;
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refresh);
};

export const clearTokens = () => {
  authToken = null;
  refreshToken = null;
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const getToken = () => authToken;

const handleUnauthorized = () => {
  clearTokens();
  window.location.href = '/login';
};

const checkResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
};

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const headers: any = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  let response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401 && refreshToken) {
    try {
      const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        setTokens(data.token, data.refreshToken);
        headers['Authorization'] = `Bearer ${data.token}`;
        response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
      } else {
        handleUnauthorized();
      }
    } catch {
      handleUnauthorized();
    }
  }

  return checkResponse(response);
};

export const api = {
  auth: {
    register: async (data: any) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return checkResponse(response);
    },
    login: async (data: any) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return checkResponse(response);
    },
    me: async () => fetchWithAuth('/auth/me'),
    logout: async () => {
      await fetchWithAuth('/auth/logout', { method: 'POST' });
    }
  },
  products: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params as any).toString();
      return fetchWithAuth(`/products?${query}`);
    },
    getById: async (id: number) => fetchWithAuth(`/products/${id}`),
    create: async (data: any) => fetchWithAuth('/products', { method: 'POST', body: JSON.stringify(data) }),
    update: async (id: number, data: any) => fetchWithAuth(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id: number) => fetchWithAuth(`/products/${id}`, { method: 'DELETE' })
  },
  cart: {
    get: async () => fetchWithAuth('/cart'),
    addItem: async (productId: number, quantity = 1) => fetchWithAuth('/cart/add', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
    updateItem: async (itemId: number, quantity: number) => fetchWithAuth(`/cart/item/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
    removeItem: async (itemId: number) => fetchWithAuth(`/cart/item/${itemId}`, { method: 'DELETE' }),
    clear: async () => fetchWithAuth('/cart/clear', { method: 'DELETE' })
  },
  orders: {
    checkout: async (data: any) => fetchWithAuth('/orders/checkout', { method: 'POST', body: JSON.stringify(data) }),
    getAll: async () => fetchWithAuth('/orders'),
    getById: async (id: number) => fetchWithAuth(`/orders/${id}`)
  },
  admin: {
    getUsers: async () => fetchWithAuth('/admin/users'),
    getOrders: async () => fetchWithAuth('/admin/orders'),
    updateOrderStatus: async (id: number, status: string) => fetchWithAuth(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    getStats: async () => fetchWithAuth('/admin/stats')
  }
};