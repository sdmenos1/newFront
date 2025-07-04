"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import StudentLayout from "@/components/student-layout";

export default function StudentAttendance() {
  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">MI ASISTENCIA</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">📊</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">Total Clases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">✓</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">114</div>
              <p className="text-xs text-muted-foreground">Clases Asistidas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-sm font-bold">✗</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Faltas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm font-bold">%</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">Asistencia</p>
            </CardContent>
          </Card>
        </div>

        {/* Attendance by Course */}
        <Card>
          <CardHeader>
            <CardTitle>Asistencia por Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">ALGEBRA</p>
                    <p className="text-sm text-gray-500">
                      Prof. María López Hernández
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">83%</p>
                  <p className="text-sm text-gray-500">30/36 clases</p>
                </div>
              </div>
              <Progress value={83} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">FISICA</p>
                    <p className="text-sm text-gray-500">
                      Prof. Roberto Silva Vargas
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">87%</p>
                  <p className="text-sm text-gray-500">26/30 clases</p>
                </div>
              </div>
              <Progress value={87} className="h-2" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">QUIMICA</p>
                    <p className="text-sm text-gray-500">
                      Prof. Diego Morales Castro
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">88%</p>
                  <p className="text-sm text-gray-500">29/33 clases</p>
                </div>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Asistencia Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">ALGEBRA</p>
                    <p className="text-sm text-gray-500">2024-01-15 - 08:00</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Presente</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">FISICA</p>
                    <p className="text-sm text-gray-500">2024-01-15 - 10:00</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Presente</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">QUIMICA</p>
                    <p className="text-sm text-gray-500">2024-01-14 - 08:00</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800">Ausente</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">HISTORIA UNIVERSAL</p>
                    <p className="text-sm text-gray-500">2024-01-13 - 14:00</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Presente</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">COMUNICACION</p>
                    <p className="text-sm text-gray-500">2024-01-13 - 15:30</p>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Tardanza</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">INGLES</p>
                    <p className="text-sm text-gray-500">2024-01-12 - 11:30</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Presente</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-green-600">ASISTENCIA</div>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600">
                Excelente asistencia este mes, Carlos!
                <br />
                Has asistido a 114 de 120 clases
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
