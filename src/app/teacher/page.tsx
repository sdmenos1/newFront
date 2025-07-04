"use client";

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
import { Eye, EyeOff, Mail, Lock, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function TeacherLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("maria.lopez@colegio.edu");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, user, isBackendAvailable } = useAuth();
  const router = useRouter();
  const role = "teacher"; // 👈 fijo para este login

  useEffect(() => {
    if (user && user.role === "teacher") {
      router.push("/teacher/dashboard");
    }
  }, [user, router]);

  const handleLogin = async () => {
    if (!isBackendAvailable) {
      setError("No se puede conectar al servidor.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const success = await login(email, password, role);
      if (!success) {
        setError("Credenciales incorrectas.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background */}
      <div className="flex-1 bg-gradient-to-br from-green-100 to-green-200 relative">
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
          <h1 className="text-4xl font-bold text-white mb-2">PORTAL DOCENTE</h1>
          <p className="text-white/90 text-lg">
            Colegio Toribio Rodríguez de Mendoza
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Portal Docente
              <br />
              Toribio Rodriguez de Mendoza
            </h2>
            <p className="text-gray-600 text-sm">N° 135</p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Acceso Docente</CardTitle>
              <CardDescription>
                Ingresa a tu portal para gestionar asistencia, estudiantes y
                calificaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Institucional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="profesor@colegio.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
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
                onClick={handleLogin}
                className="w-full bg-green-500 hover:bg-green-600"
                disabled={isLoading || !isBackendAvailable}
              >
                {isLoading ? "Ingresando..." : "Acceder al Portal"}
              </Button>

              <div className="bg-green-50 p-3 rounded-lg text-sm">
                <p className="text-green-700 font-medium mb-1">
                  Credenciales de prueba:
                </p>
                <p className="text-green-600">
                  <span className="font-medium">Prof. Matemáticas:</span>
                  <br />
                  Email: maria.lopez@colegio.edu
                  <br />
                  Contraseña: 123456
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              ¿Eres estudiante?{" "}
              <Link href="/" className="text-amber-600 hover:underline">
                Ir al Portal Estudiantil
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
