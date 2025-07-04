"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, Clock, UserCheck, Award, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Inicio", href: "/student/dashboard", icon: Home },
    { name: "Mis Horarios", href: "/student/courses", icon: Clock, badge: "3" },
    { name: "Mi Asistencia", href: "/student/attendance", icon: UserCheck },
    { name: "Mis Calificaciones", href: "/student/grades", icon: Award },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-amber-500 text-white flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback className="bg-white text-amber-500">
                CM
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold">Portal Estudiantil</h2>
            </div>
          </div>
          <div className="text-sm">
            <p className="font-medium">Carlos Mendoza López</p>
            <p className="text-amber-100">4° B - SECUNDARIA</p>
            <p className="text-amber-100 text-xs">Código: 2024-4B-015</p>
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
                        ? "bg-amber-600 text-white"
                        : "text-amber-100 hover:bg-amber-600 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
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
        <div className="p-4 border-t border-amber-400">
          <Button
            variant="ghost"
            className="w-full justify-start text-amber-100 hover:bg-amber-600 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
          <p className="text-xs text-amber-200 mt-2">Año Escolar 2024</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
