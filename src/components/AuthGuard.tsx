"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole: "student" | "teacher";
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading, isBackendAvailable } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isBackendAvailable) {
      // Si no hay usuario, redirige al login (suponiendo que la página de login se encuentra en "/login")
      if (!user) {
        router.push("/login");
      } else if (user.role !== requiredRole) {
        // Si el usuario autenticado no tiene el rol esperado, redirige a su dashboard correspondiente.
        if (user.role === "teacher") {
          router.push("/teacher/dashboard");
        } else if (user.role === "student") {
          router.push("/student/dashboard");
        } else {
          router.push("/");
        }
      }
    }
  }, [user, isLoading, isBackendAvailable, router, requiredRole]);

  // Mientras se valida la sesión o en caso de que el rol no coincida, mostramos un "loading" o nada.
  if (isLoading || !user || (user && user.role !== requiredRole)) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}
