import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { StudentProvider } from "@/context/student-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Educativo - Colegio Toribio Rodríguez de Mendoza",
  description: "Sistema de gestión educativa para estudiantes y profesores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <StudentProvider>{children}</StudentProvider></AuthProvider>
      </body>
    </html>
  );
}
