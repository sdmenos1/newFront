"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, UserCheck, Users, GraduationCap, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Inicio", href: "/teacher/dashboard", icon: Home },
    {
      name: "Registro de Asistencia",
      href: "/teacher/attendance",
      icon: UserCheck,
      badge: "2",
    },
    {
      name: "Mis Estudiantes",
      href: "/teacher/students",
      icon: Users,
      badge: "5",
    },
    { name: "Gestión de Notas", href: "/teacher/grades", icon: GraduationCap },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-green-500 text-white flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback className="bg-white text-green-500">
                ML
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold">Portal Docente</h2>
            </div>
          </div>
          <div className="text-sm">
            <p className="font-medium">Prof. María López Hernández</p>
            <p className="text-green-100">Matemáticas</p>
            <p className="text-green-100 text-xs">Código: PROF-2024-001</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-green-600 text-white"
                        : "text-green-100 hover:bg-green-600 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-green-400">
          <Button
            variant="ghost"
            className="w-full justify-start text-green-100 hover:bg-green-600 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
          <p className="text-xs text-green-200 mt-2">Año Escolar 2024</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
