"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import StudentLayout from "@/components/student-layout";
import { useAuth } from "@/context/auth-context";
import {apiClient} from "@/lib/api";

export default function StudentAttendance() {
  const { user } = useAuth();
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        if (!user) return;

        const data = await apiClient.getStudentAttendance(user.id);
        setAttendanceData(data);
      } catch (error) {
        console.error("Error al obtener la asistencia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [user]);

  if (loading) {
    return <StudentLayout><p>Cargando asistencia...</p></StudentLayout>;
  }

  if (!attendanceData) {
    return <StudentLayout><p>No se encontraron datos de asistencia.</p></StudentLayout>;
  }

  const { totalClasses, attended, absences, tardies, monthlySummary, byCourse, recent } = attendanceData;

  return (
    <StudentLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">MI ASISTENCIA</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent><div className="text-2xl font-bold">{totalClasses}</div><p className="text-xs text-muted-foreground">Total Clases</p></CardContent></Card>
          <Card><CardContent><div className="text-2xl font-bold">{attended}</div><p className="text-xs text-muted-foreground">Clases Asistidas</p></CardContent></Card>
          <Card><CardContent><div className="text-2xl font-bold">{absences}</div><p className="text-xs text-muted-foreground">Faltas</p></CardContent></Card>
          <Card><CardContent><div className="text-2xl font-bold">{((attended / totalClasses) * 100).toFixed(0)}%</div><p className="text-xs text-muted-foreground">Asistencia</p></CardContent></Card>
        </div>

        {/* Por Curso */}
        <Card>
          <CardHeader><CardTitle>Asistencia por Curso</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {byCourse?.map((course: any, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: course.color || "#ccc" }}></div>
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-gray-500">Prof. {course.teacher}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{course.percentage}%</p>
                      <p className="text-sm text-gray-500">{course.attended}/{course.total} clases</p>
                    </div>
                  </div>
                  <Progress value={course.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recientes */}
        <Card>
          <CardHeader><CardTitle>Asistencia Reciente</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recent?.map((entry: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${entry.status === "Presente" ? "bg-green-500" : entry.status === "Ausente" ? "bg-red-500" : "bg-amber-500"}`}></div>
                    <div>
                      <p className="font-medium">{entry.course}</p>
                      <p className="text-sm text-gray-500">{entry.date} - {entry.time}</p>
                    </div>
                  </div>
                  <Badge className={
                    entry.status === "Presente"
                      ? "bg-green-100 text-green-800"
                      : entry.status === "Ausente"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }>
                    {entry.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumen mensual */}
        <Card>
          <CardHeader><CardTitle>Resumen Mensual</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{monthlySummary.percentage}%</div>
                    <div className="text-sm text-green-600">ASISTENCIA</div>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600">
                {monthlySummary.message}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
