"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { BackendStatus } from "@/components/backend-status";
import { DebugPanel } from "@/components/debug-panel";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("carlos.mendoza@colegio.edu");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDebug, setShowDebug] = useState(false);

  const { login, isBackendAvailable, user } = useAuth();
  const router = useRouter();

  // Redirigir si ya está logueado
  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        router.push("/student/dashboard");
      } else if (user.role === "teacher") {
        router.push("/teacher/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, router]);

  const role = "student"; // Fijar el rol para esta vista

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isBackendAvailable) {
      setError(
        "No se puede conectar al servidor. Verifica que esté ejecutándose."
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password, role); // 👈 Usar el rol

      if (success) {
        console.log("Login exitoso");
        // Redirección ya se maneja en useEffect
      } else {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      }
    } catch (error: unknown) {
      console.error("Error en login:", error);
      if (error instanceof Error) {
        setError(error.message || "Error de conexión con el servidor.");
      } else {
        setError("Error de conexión con el servidor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background */}
      <div className="flex-1 bg-gradient-to-br from-amber-100 to-amber-200 relative">
        <div className="absolute top-6 left-6">
          <Image
            src="/placeholder.svg?height=40&width=200"
            alt="Colegio Toribio Rodriguez de Mendoza"
            width={200}
            height={40}
            className="text-white"
          />
        </div>
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            COLEGIO TORIBIO RODRIGUEZ DE MENDOZA
          </h1>
          <p className="text-white/90 text-lg">Formando líderes del mañana</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-amber-500 rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Toribio Rodriguez
              <br />
              de Mendoza
            </h2>
            <p className="text-gray-600 text-sm">N° 135</p>
          </div>

          <BackendStatus />

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Bienvenidos</CardTitle>
              <CardDescription>
                Accede a tu portal estudiantil para consultar tus horarios,
                calificaciones y más información académica.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Ingrese su correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={!isBackendAvailable}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingrese su contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                      disabled={!isBackendAvailable}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      disabled={!isBackendAvailable}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600"
                  disabled={isLoading || !isBackendAvailable}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </form>

              {/* Usuarios de prueba - solo mostrar si backend está disponible */}
              {isBackendAvailable && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs">
                  <p className="font-medium text-blue-800 mb-1">
                    Usuarios de prueba:
                  </p>
                  <p className="text-blue-600">
                    📚 Estudiante: carlos.mendoza@colegio.edu
                  </p>
                  <p className="text-blue-600">
                    👩‍🏫 Profesora: maria.lopez@colegio.edu
                  </p>
                  <p className="text-blue-600">🔑 Contraseña: 123456</p>
                </div>
              )}

              {/* Botón de debug */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowDebug(!showDebug)}
                className="w-full text-xs bg-transparent"
              >
                {showDebug ? "Ocultar Debug" : "Mostrar Debug"}
              </Button>
            </CardContent>
          </Card>

          {/* Panel de debug */}
          {showDebug && <DebugPanel />}

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              ¿Eres docente?{" "}
              <Link href="/teacher" className="text-green-600 hover:underline">
                Ir al Portal Docente
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
