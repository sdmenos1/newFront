"use client";

import { useEffect, useState } from "react";
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
import { useStudent } from "@/context/student-context";
import { apiClient } from "@/lib/api";

interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  teacherId: number;
  teacherName: string;
  grade: string;
  section: string;
  level: string;
  credits: number;
  classroom: string;
  isActive: boolean;
  createdAt: string;
  schedule?: { day: string; startTime: string; endTime: string }[];
}

export default function StudentCourses() {
  const { student } = useStudent();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      if (!student) return;

      try {
        const assignedCourses = await apiClient.getStudentCourses(student.id);
        const allCourses = await apiClient.getCourses();

        const assignedCourseIds = Array.isArray(assignedCourses.data)
          ? assignedCourses.data.map((c: any) => c.id)
          : [];

        const fullCourses = allCourses.data?.filter((course: Course) =>
          assignedCourseIds.includes(course.id)
        );

        setCourses(fullCourses || []);
      } catch (err) {
        console.error("❌ Error al cargar cursos del estudiante:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [student]);

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">MIS CURSOS</h1>
            <p className="text-gray-600">PERIODO: 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-gray-500">Cargando cursos...</p>
          ) : courses.length === 0 ? (
            <p className="text-gray-500">No estás inscrito en ningún curso.</p>
          ) : (
            courses.map((course) => (
              <Card key={course.id}>
                <div
                  className={`h-2 rounded-t-lg ${
                    course.id % 3 === 0
                      ? "bg-blue-500"
                      : course.id % 3 === 1
                      ? "bg-purple-500"
                      : "bg-orange-500"
                  }`}
                ></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg capitalize">
                        {course.name || "Curso sin nombre"}
                      </CardTitle>
                      <CardDescription className="mt-2 space-y-1">
                        <p>
                          <span className="font-medium">DOCENTE:</span>{" "}
                          {course.teacherName || "No asignado"}
                        </p>
                        <p>
                          <span className="font-medium">AULA:</span>{" "}
                          {course.classroom || "-"}
                        </p>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {course.schedule?.length || 0} sesiones
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">HORARIOS:</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        {course.schedule && course.schedule.length > 0 ? (
                          course.schedule.map((s) => (
                            <p key={`${course.id}-${s.day}-${s.startTime}-${s.endTime}`}>
  {s.day}: {s.startTime} - {s.endTime}
</p>
                          ))
                        ) : (
                          <p>No definido</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500">GRADO</p>
                        <p className="font-medium">{course.grade || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">SECCIÓN</p>
                        <p className="font-medium">{course.section || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">NIVEL</p>
                        <p className="font-medium">{course.level || "-"}</p>
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
            ))
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
