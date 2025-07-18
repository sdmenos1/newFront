"use client";

import { useEffect, useState } from "react";
import { useStudent } from "@/context/student-context";
import { apiClient } from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Calendar, BookOpen } from "lucide-react";
import StudentLayout from "@/components/student-layout";

export default function StudentGrades() {
  const { student } = useStudent();
  const [grades, setGrades] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student?.id) return;

    const fetchGrades = async () => {
  try {
    const response = await apiClient.getStudentGrades(Number(student.id));
    const flatGrades = response?.data || [];

    const courseIds = [...new Set(flatGrades.map((g) => g.courseId))];

    const courseDetails = await Promise.all(
      courseIds.map(async (courseId) => {
        try {
          const courseRes = await apiClient.getCourseById(courseId);
          const courseData = courseRes?.data;

          let teacherName = "Desconocido";

          if (courseData?.teacherId) {
            const teacherRes = await apiClient.getTeacher(courseData.teacherId);
            teacherName = `${teacherRes?.data?.firstName || ""} ${teacherRes?.data?.lastName || ""}`;
          }

          return {
            courseId: courseData?.id,
            courseName: courseData?.name,
            teacherName,
          };
        } catch (error) {
          console.error(`Error al obtener datos del curso ${courseId}:`, error);
          return {
            courseId,
            courseName: `Curso ${courseId}`,
            teacherName: "Desconocido",
          };
        }
      })
    );

    const courseMap = Object.fromEntries(courseDetails.map((c) => [c.courseId, c]));

    const grouped = flatGrades.reduce((acc, item) => {
      const courseId = item.courseId;
      if (!acc[courseId]) {
        acc[courseId] = {
          courseId,
          courseName: courseMap[courseId]?.courseName || `Curso ${courseId}`,
          teacherName: courseMap[courseId]?.teacherName || "Profesor desconocido",
          evaluations: [],
        };
      }

      acc[courseId].evaluations.push({
        title: item.title,
        type: item.evaluationType,
        score: parseFloat(item.score),
        maxScore: parseFloat(item.maxScore),
        weight: parseFloat(item.weight),
        date: item.evaluationDate,
      });

      return acc;
    }, {});

    setGrades(Object.values(grouped));
  } catch (error) {
    console.error("Error al obtener calificaciones:", error);
  } finally {
    setLoading(false);
  }
};


    fetchGrades();
  }, [student]);

  const getFinalGrade = (evaluations) => {
    return evaluations.reduce((acc, evalItem) => {
      return acc + (evalItem.score * evalItem.weight) / 100;
    }, 0);
  };

  const CourseDetailModal = ({ course, isOpen, onClose }) => {
    if (!course) return null;

    const finalGrade = getFinalGrade(course.evaluations);

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Detalle de Calificaciones - {course.courseName}
            </DialogTitle>
            <DialogDescription>
              {course.courseCode || `Curso ID: ${course.courseId}`} - {course.teacherName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {course.evaluations.map((evalItem, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{evalItem.title}</h4>
                      <p className="text-sm text-gray-600">{evalItem.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {evalItem.score}/{evalItem.maxScore}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {evalItem.weight}% peso
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {evalItem.date}
                    </span>
                    <Progress
                      value={(evalItem.score / evalItem.maxScore) * 100}
                      className="w-20 h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Nota Final</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-blue-600">{finalGrade.toFixed(1)}</p>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  };

  if (loading) {
    return <p className="p-4">Cargando calificaciones...</p>;
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">MIS CALIFICACIONES</h1>

        <Card>
          <CardHeader>
            <CardTitle>Mis Cursos y Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Curso</th>
                  <th className="p-2 text-left">Docente</th>
                  <th className="p-2 text-left">Evaluaciones</th>
                  <th className="p-2 text-left">Nota Final</th>
                  <th className="p-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((course) => {
                  const finalGrade = getFinalGrade(course.evaluations);
                  return (
                    <tr key={course.courseId} className="border-b">
                      <td className="p-2">{course.courseName}</td>
                      <td className="p-2">{course.teacherName}</td>
                      <td className="p-2">{course.evaluations.length}</td>
                      <td className="p-2 font-bold">{finalGrade.toFixed(1)}</td>
                      <td className="p-2">
                        <Button
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600"
                          onClick={() => setSelectedCourseId(course.courseId)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver Detalle
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Modal */}
        <CourseDetailModal
          course={grades.find((c) => c.courseId === selectedCourseId)}
          isOpen={!!selectedCourseId}
          onClose={() => setSelectedCourseId(null)}
        />
      </div>
    </StudentLayout>
  );
}
