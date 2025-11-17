import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../utils/api';

interface User {
  id: string;
  username: string;
  fullName: string;
  optionalInfo?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string, fullName: string, optionalInfo?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (username: string, password: string, fullName: string, optionalInfo?: string) => {
    try {
      const response = await authAPI.signup(username, password, fullName, optionalInfo);
      
      // After signup, log in automatically
      const loginResponse = await authAPI.login(username, password);
      
      setUser(loginResponse.user);
      setAccessToken(loginResponse.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(loginResponse.user));
      localStorage.setItem('accessToken', loginResponse.accessToken);
      
      return true;
    } catch (error: any) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await authAPI.login(username, password);
      
      setUser(response.user);
      setAccessToken(response.accessToken);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', response.accessToken);
      
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, login, signup, logout, isAuthenticated: !!user }}>
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