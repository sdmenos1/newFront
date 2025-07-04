// useAuth.tsx

import { useState, useEffect } from "react";

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
  token?: string;
  user?: User;
  message?: string;
}

export function useAuthHook() {
  const [user, setUser] = useState<User | null>(null);
  const [isBackendAvailable, setIsBackendAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch("http://localhost:3001/health", {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });
      setIsBackendAvailable(response.ok);
    } catch (error) {
      console.error("Backend no disponible:", error);
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
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data: AuthResponse = await response.json();

      if (response.ok && data.success && data.token && data.user) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return true;
      } else {
        console.error("Login fallido:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Error en login:", error);
      throw new Error("Error de conexión con el servidor");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:3001/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error validando token:", error);
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData && isBackendAvailable) {
      try {
        const parsedUser = JSON.parse(userData);
        validateToken(token).then((isValid) => {
          if (isValid) {
            setUser(parsedUser);
          } else {
            logout();
          }
        });
      } catch (error) {
        console.error("Error restaurando sesión:", error);
        logout();
      }
    }
  }, [isBackendAvailable]);

  return {
    user,
    login,
    logout,
    isBackendAvailable,
    isLoading,
  };
}
