"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import StudentLayout from "@/components/student-layout";
import { useStudent } from "@/context/student-context";
import { apiClient } from "@/lib/api";

export default function StudentAttendance() {
  const { student } = useStudent();
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchAttendance = async () => {
    if (!student?.id) return;

    try {
      const [attendanceRes, coursesRes, teachersRes] = await Promise.all([
        apiClient.getStudentAttendance(student.id),
        apiClient.getAllCourses(),         // 👈 Usa esto
        apiClient.getAllTeachers(),        // 👈 Y esto
      ]);

      const attendance = attendanceRes.data || [];
      const courses = coursesRes.data || [];
      const teachers = teachersRes.data || [];

      // Crear mapas para acceso rápido
      const courseMap = new Map(courses.map((c: any) => [c.id, c]));
      const teacherMap = new Map(teachers.map((t: any) => [t.id, t]));

      const totalClasses = attendance.length;
      const attended = attendance.filter((a: any) => a.status === "present").length;
      const absences = attendance.filter((a: any) => a.status === "absent").length;
      const tardies = attendance.filter((a: any) => a.status === "late").length;

      const recent = attendance
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
        .map((entry: any) => {
          const course = courseMap.get(entry.courseId);
          const teacher = teacherMap.get(entry.teacherId);
          return {
            ...entry,
            course: course?.name || `Curso ${entry.courseId}`,
            teacher: `${teacher?.firstName || "Profesor"} ${teacher?.lastName || ""}`,
            date: new Date(entry.date).toLocaleDateString(),
            time: course?.time || "Sin hora",
            status:
              entry.status === "present"
                ? "Presente"
                : entry.status === "absent"
                ? "Ausente"
                : "Tarde",
          };
        });

      const byCourse: Record<string, any> = {};
      attendance.forEach((entry: any) => {
        const course = courseMap.get(entry.courseId);
        const teacher = teacherMap.get(entry.teacherId);
        const key = `course-${entry.courseId}`;
        if (!byCourse[key]) {
          byCourse[key] = {
            courseId: entry.courseId,
            name: course?.name || `Curso ${entry.courseId}`,
            teacher: `${teacher?.firstName || "Profesor"} ${teacher?.lastName || ""}`,
            total: 0,
            attended: 0,
          };
        }
        byCourse[key].total += 1;
        if (entry.status === "present") byCourse[key].attended += 1;
      });

      Object.values(byCourse).forEach((course: any) => {
        course.percentage = course.total > 0 ? Math.round((course.attended / course.total) * 100) : 0;
      });

      const monthlySummary = {
        percentage: totalClasses ? Math.round((attended / totalClasses) * 100) : 0,
        message: totalClasses ? "Resumen del mes" : "Sin resumen disponible",
      };

      setAttendanceData({
        totalClasses,
        attended,
        absences,
        tardies,
        recent,
        byCourse: Object.values(byCourse),
        monthlySummary,
      });
    } catch (err) {
      console.error("❌ Error al obtener asistencia completa:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchAttendance();
}, [student]);


  if (!student) {
    return (
      <StudentLayout>
        <p>Obteniendo datos del estudiante...</p>
      </StudentLayout>
    );
  }

  if (loading) {
    return (
      <StudentLayout>
        <p>Cargando asistencia...</p>
      </StudentLayout>
    );
  }

  if (!attendanceData) {
    return (
      <StudentLayout>
        <p>No se encontraron datos de asistencia.</p>
      </StudentLayout>
    );
  }

  const { totalClasses, attended, absences, tardies, byCourse, recent, monthlySummary } = attendanceData;

  return (
    <StudentLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">MI ASISTENCIA</h1>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent><div className="text-2xl font-bold">{totalClasses}</div><p className="text-xs text-muted-foreground">Total Clases</p></CardContent></Card>
          <Card><CardContent><div className="text-2xl font-bold">{attended}</div><p className="text-xs text-muted-foreground">Clases Asistidas</p></CardContent></Card>
          <Card><CardContent><div className="text-2xl font-bold">{absences}</div><p className="text-xs text-muted-foreground">Faltas</p></CardContent></Card>
          <Card><CardContent><div className="text-2xl font-bold">{totalClasses > 0 ? `${Math.round((attended / totalClasses) * 100)}%` : "0%"}</div><p className="text-xs text-muted-foreground">Asistencia</p></CardContent></Card>
        </div>

        {/* Por curso */}
        <Card>
          <CardHeader><CardTitle>Asistencia por Curso</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {byCourse?.map((course: any, index: number) => (
                <div key={`course-${course.courseId}-${index}`}>
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

        {/* Asistencia reciente */}
        <Card>
          <CardHeader><CardTitle>Asistencia Reciente</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recent?.map((entry: any, index: number) => (
                <div key={`recent-${index}`} className="flex items-center justify-between p-3 border rounded-lg">
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
                    <div className="text-3xl font-bold text-green-600">{monthlySummary?.percentage ?? 0}%</div>
                    <div className="text-sm text-green-600">ASISTENCIA</div>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600">{monthlySummary?.message ?? "Sin resumen disponible"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
