import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthContextType, AdminUser, LoginCredentials } from './types';
import { apiClient } from '@/api/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CREDENTIALS = {
  email: 'admin@beit-refuah.org',
  password: 'admin123',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const rememberMe = localStorage.getItem('admin_remember') === 'true';
      
      if (token) {
        const response = await apiClient.get<{ user: AdminUser }>('/admin/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      }
      
      if (!rememberMe) {
        localStorage.removeItem('admin_token');
      }
    } catch {
      localStorage.removeItem('admin_token');
    }
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      if (credentials.email === DEMO_CREDENTIALS.email && credentials.password === DEMO_CREDENTIALS.password) {
        const adminUser: AdminUser = {
          id: '1',
          email: DEMO_CREDENTIALS.email,
          name: 'Admin User',
          role: 'super_admin',
          permissions: ['*'],
          lastLogin: new Date().toISOString(),
        };
        
        const token = 'demo-jwt-token-' + Date.now();
        
        if (credentials.rememberMe) {
          localStorage.setItem('admin_token', token);
          localStorage.setItem('admin_remember', 'true');
        } else {
          sessionStorage.setItem('admin_token', token);
          localStorage.setItem('admin_remember', 'false');
        }
        
        setUser(adminUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await apiClient.post<{ user: AdminUser; token: string }>('/admin/login', credentials);
        if (response.data?.token && response.data?.user) {
          if (credentials.rememberMe) {
            localStorage.setItem('admin_token', response.data.token);
            localStorage.setItem('admin_remember', 'true');
          } else {
            sessionStorage.setItem('admin_token', response.data.token);
            localStorage.setItem('admin_remember', 'false');
          }
          setUser(response.data.user);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        }
      } catch {
        // Fall through to error
      }
      
      throw new Error('Invalid email or password');
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_remember');
    sessionStorage.removeItem('admin_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}