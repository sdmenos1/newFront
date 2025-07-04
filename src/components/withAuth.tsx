
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export function withAuth<P>(
  Component: React.ComponentType<P>,
  allowedRoles: string[]
) {
  return function ProtectedComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!user || !allowedRoles.includes(user.role)) {
          router.push("/"); // redirigir si no está autorizado
        }
      }
    }, [user, isLoading, router]);

    if (isLoading || !user) return <div>Cargando...</div>;
    if (user && allowedRoles.includes(user.role)) {
      return <Component {...props} />;
    }

    return null;
  };
}
