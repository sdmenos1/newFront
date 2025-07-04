// AuthContext.tsx

"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  grade?: string;
  section?: string;
  specialization?: string;
}

interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    user: User;
  };
  message?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isBackendAvailable: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth", {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });

      setIsBackendAvailable(response.ok);
      console.log("✅ Backend detectado");
    } catch (error) {
      console.error("❌ Backend no disponible:", error);
      setIsBackendAvailable(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    role: string
  ): Promise<boolean> => {
    try {
      console.log("🔐 Login:", { email, role });

      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Login error:", errorText);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data: AuthResponse = await response.json();
      console.log("📦 Login response:", data);

      if (data.success && data.data?.token && data.data?.user) {
        setUser(data.data.user);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        return true;
      } else {
        console.error("❌ Login fallido:", data.message);
        return false;
      }
    } catch (error) {
      console.error("❌ Error en login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("👋 Sesión cerrada");
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:3001/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error validando token:", error);
      return false;
    }
  };

  // En AuthProvider dentro de useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData && isBackendAvailable) {
      try {
        const parsedUser = JSON.parse(userData);
        validateToken(token).then((isValid) => {
          if (isValid) {
            setUser(parsedUser);
            console.log("✅ Token válido, usuario restaurado");
          } else {
            logout(); // elimina token y user de localStorage
            console.log("❌ Token inválido, cerrando sesión");
          }
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout(); // eliminar todo si el JSON no es válido
      }
    } else {
      logout(); // caso sin token o sin usuario
    }
  }, [isBackendAvailable]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isBackendAvailable,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
