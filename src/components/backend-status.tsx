"use client";

import { useAuth } from "@/context/auth-context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export function BackendStatus() {
  const { isBackendAvailable, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Alert className="mb-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertDescription>Conectando con el servidor...</AlertDescription>
      </Alert>
    );
  }

  if (isBackendAvailable) {
    return (
      <Alert className="mb-4 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          ✅ Conectado al servidor
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-4 border-red-200 bg-red-50">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        ❌ No se puede conectar al servidor
        <br />
        <span className="text-xs">
          Verifica que el backend esté ejecutándose en el puerto 3001
        </span>
      </AlertDescription>
    </Alert>
  );
}
