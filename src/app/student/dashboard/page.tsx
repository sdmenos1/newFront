"use client";

import { useEffect, useState } from "react";
import { Calendar, GraduationCap, User, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useStudent } from "@/context/student-context";
import StudentLayout from "@/components/student-layout";
import { apiClient } from "@/lib/api";

interface CourseScheduleSlot {
  day: string;
  time: string;
}

interface Course {
  id: string;
  name: string;
  teacher: string;
  room: string;
  credits: number;
  color?: string;
  schedule: CourseScheduleSlot[];
}

export default function StudentDashboard() {
  const { student } = useStudent();
  const [courses, setCourses] = useState<Course[]>([]);
  const [hasNotification] = useState(true);

  useEffect(() => {
  const loadCourses = async () => {
    if (student) {
      console.log("👤 Student cargado:", student);

      try {
        const fetchedCourses = await apiClient.getStudentCourses(student.id);
        console.log("📚 Cursos obtenidos:", fetchedCourses);
        setCourses(fetchedCourses);
      } catch (err) {
        console.error("Error al cargar cursos:", err);
      }
    } else {
      console.log("❌ Student no disponible aún");
    }
  };

  loadCourses();
}, [student]);


  if (!student) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No se pudo cargar la información del estudiante
          </h3>
          <p className="text-gray-600">Por favor, inicia sesión nuevamente</p>
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("es-ES", { weekday: "long" });
  const todayClasses = courses
    .filter((course) =>
      course.schedule?.some(
        (slot: any) => slot.day.toLowerCase() === today.toLowerCase()
      )
    )
    .slice(0, 3);

  const totalCredits = courses.reduce(
    (sum, course) => sum + (course.credits || 0),
    0
  );

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="bg-amber-500 text-white text-lg">
                  {student.name?.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {student.name}
                </h1>
                <p className="text-gray-600">
                  {student.grade} {student.section} - {student.level}
                </p>
                <p className="text-sm text-gray-500">
                  {student.email}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-6 w-6" />
              {hasNotification && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 hover:bg-red-500">
                  <span className="sr-only">Notificaciones</span>
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Bienvenido, {student.name?.split(" ")[0]}!
            </h2>
            <p className="text-gray-600">
              Aquí tienes un resumen de tu actividad académica para{" "}
              {student.grade} {student.section}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Today's Classes Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  Clases de Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todayClasses.length > 0 ? (
                  <div className="space-y-3">
                    {todayClasses.map((course) => {
                      const todaySchedule = course.schedule.find(
                        (slot: any) => slot.day.toLowerCase() === today.toLowerCase()
                      );
                      return (
                        <div key={course.id} className="text-sm">
                          <p className="font-medium text-gray-900">{course.name}</p>
                          <p className="text-gray-600">
                            {todaySchedule?.time} - {course.room}
                          </p>
                          <p className="text-xs text-gray-500">{course.teacher}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No tienes clases programadas para hoy
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Academic Info Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                  </div>
                  Mi Información Académica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Grado:</span> {student.grade} {student.section}</p>
                  <p><span className="font-medium">Nivel:</span> {student.level}</p>
                  <p><span className="font-medium">Cursos:</span> {courses.length}</p>
                  <p><span className="font-medium">Créditos Totales:</span> {totalCredits}</p>
                  {student.studentCode && (
                    <p><span className="font-medium">Código:</span> {student.studentCode}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Student Profile Card */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  Mi Perfil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Nombre:</span> {student.name}</p>
                  {student.email && <p><span className="font-medium">Email:</span> {student.email}</p>}
                  <p><span className="font-medium">Año Académico:</span> {student.academicYear}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Courses List */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Mis Cursos - {student.grade} {student.section}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div
                      className={`w-full h-2 ${course.color || "bg-gray-300"} rounded-full mb-3`}
                    ></div>
                    <h4 className="font-semibold text-gray-900 mb-2">{course.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">{course.teacher}</p>
                    <p className="text-xs text-gray-500">
                      {course.room} • {course.credits} créditos
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {course.schedule?.length} sesiones por semana
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
