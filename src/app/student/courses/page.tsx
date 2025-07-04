"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StudentLayout from "@/components/student-layout";

export default function StudentCourses() {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">MIS CURSOS</h1>
            <p className="text-gray-600">PERIODO: 2024</p>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Algebra */}
          <Card>
            <div className="h-2 bg-blue-500 rounded-t-lg"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-blue-600">
                    ALGEBRA
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium">DOCENTE:</span> Prof.
                        María López Hernández
                      </p>
                      <p>
                        <span className="font-medium">AULA:</span> Aula 205
                      </p>
                    </div>
                  </CardDescription>
                </div>
                <Badge variant="secondary">4 sesiones</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">HORARIOS:</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Lunes: 08:00:00 - 09:30:00</p>
                    <p>Miércoles: 10:00:00 - 11:30:00</p>
                    <p>Viernes: 08:00:00 - 09:30:00</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">GRADO</p>
                    <p className="font-medium">4°</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">SECCIÓN</p>
                    <p className="font-medium">B</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">SECCIÓN</p>
                    <p className="font-medium">-</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    MI ASISTENCIA
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    VER CONTENIDO
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fisica */}
          <Card>
            <div className="h-2 bg-purple-500 rounded-t-lg"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-purple-600">
                    FISICA
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium">DOCENTE:</span> Prof.
                        Roberto Silva Vargas
                      </p>
                      <p>
                        <span className="font-medium">AULA:</span> Lab 301
                      </p>
                    </div>
                  </CardDescription>
                </div>
                <Badge variant="secondary">3 sesiones</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">HORARIOS:</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Martes: 08:00:00 - 09:30:00</p>
                    <p>Jueves: 10:00:00 - 11:30:00</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">NIVEL</p>
                    <p className="font-medium">SECUNDARIA</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">GRADO</p>
                    <p className="font-medium">4°</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">SECCIÓN</p>
                    <p className="font-medium">B</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    MI ASISTENCIA
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    VER CONTENIDO
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quimica */}
          <Card className="md:col-span-2">
            <div className="h-2 bg-orange-500 rounded-t-lg"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-orange-600">
                    QUIMICA
                  </CardTitle>
                  <CardDescription className="mt-2">
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium">DOCENTE:</span> Prof.
                        Diego Morales Castro
                      </p>
                      <p>
                        <span className="font-medium">AULA:</span> Lab 302
                      </p>
                    </div>
                  </CardDescription>
                </div>
                <Badge variant="secondary">3 sesiones</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">HORARIOS:</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Lunes: 08:00:00 - 09:30:00</p>
                    <p>Miércoles: 08:00:00 - 09:30:00</p>
                    <p>Viernes: 08:00:00 - 09:30:00</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-500">NIVEL</p>
                    <p className="font-medium">SECUNDARIA</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">GRADO</p>
                    <p className="font-medium">4°</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">SECCIÓN</p>
                    <p className="font-medium">B</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    MI ASISTENCIA
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    VER CONTENIDO
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="bg-amber-500 text-white px-2 py-1 rounded mr-2 text-sm">
                📅
              </span>
              Mi Horario Semanal - 4° B
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-amber-500 text-white">
                    <th className="border p-2 text-left">HORA</th>
                    <th className="border p-2 text-center">LUNES</th>
                    <th className="border p-2 text-center">MARTES</th>
                    <th className="border p-2 text-center">MIÉRCOLES</th>
                    <th className="border p-2 text-center">JUEVES</th>
                    <th className="border p-2 text-center">VIERNES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-medium">08:00 - 09:30</td>
                    <td className="border p-2 text-center">
                      <div className="bg-blue-100 p-1 rounded text-xs">
                        <div className="font-medium">ALGEBRA</div>
                        <div>Aula 205</div>
                      </div>
                    </td>
                    <td className="border p-2 text-center">
                      <div className="bg-purple-100 p-1 rounded text-xs">
                        <div className="font-medium">FISICA</div>
                        <div>Lab 301</div>
                      </div>
                    </td>
                    <td className="border p-2 text-center">
                      <div className="bg-orange-100 p-1 rounded text-xs">
                        <div className="font-medium">QUIMICA</div>
                        <div>Lab 302</div>
                      </div>
                    </td>
                    <td className="border p-2"></td>
                    <td className="border p-2 text-center">
                      <div className="bg-blue-100 p-1 rounded text-xs">
                        <div className="font-medium">ALGEBRA</div>
                        <div>Aula 205</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">09:45 - 11:15</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">10:00 - 11:30</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2 text-center">
                      <div className="bg-blue-500 text-white p-1 rounded text-xs">
                        <div className="font-medium">ALGEBRA</div>
                      </div>
                    </td>
                    <td className="border p-2 text-center">
                      <div className="bg-purple-100 p-1 rounded text-xs">
                        <div className="font-medium">FISICA</div>
                        <div>Lab 301</div>
                      </div>
                    </td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">11:30 - 13:00</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">14:00 - 15:30</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">15:45 - 17:15</td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                    <td className="border p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
