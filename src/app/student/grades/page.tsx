"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Eye, TrendingUp, Calendar, BookOpen } from "lucide-react";
import StudentLayout from "@/components/student-layout";

export default function StudentGrades() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courseDetails = {
    ALGEBRA: {
      code: "ALG001",
      teacher: "Prof. María López Hernández",
      period: "I Bimestre",
      evaluations: [
        {
          type: "Examen Parcial",
          title: "Ecuaciones Lineales",
          score: 18,
          maxScore: 20,
          weight: 30,
          date: "2024-01-15",
        },
        {
          type: "Tarea",
          title: "Ejercicios Cap. 3",
          score: 19,
          maxScore: 20,
          weight: 20,
          date: "2024-01-10",
        },
        {
          type: "Proyecto",
          title: "Aplicaciones Reales",
          score: 16,
          maxScore: 20,
          weight: 25,
          date: "2024-01-08",
        },
        {
          type: "Participación",
          title: "Clase Interactiva",
          score: 17,
          maxScore: 20,
          weight: 25,
          date: "2024-01-05",
        },
      ],
      finalGrade: 17.2,
      status: "Bueno",
    },
    FISICA: {
      code: "FIS001",
      teacher: "Prof. Roberto Silva Vargas",
      period: "I Bimestre",
      evaluations: [
        {
          type: "Examen",
          title: "Cinemática",
          score: 15,
          maxScore: 20,
          weight: 40,
          date: "2024-01-12",
        },
        {
          type: "Laboratorio",
          title: "Movimiento Rectilíneo",
          score: 17,
          maxScore: 20,
          weight: 30,
          date: "2024-01-09",
        },
        {
          type: "Tarea",
          title: "Problemas Cap. 2",
          score: 16,
          maxScore: 20,
          weight: 30,
          date: "2024-01-06",
        },
      ],
      finalGrade: 15.8,
      status: "Bueno",
    },
    QUIMICA: {
      code: "QUI001",
      teacher: "Prof. Diego Morales Castro",
      period: "I Bimestre",
      evaluations: [
        {
          type: "Examen",
          title: "Tabla Periódica",
          score: 19,
          maxScore: 20,
          weight: 35,
          date: "2024-01-14",
        },
        {
          type: "Laboratorio",
          title: "Reacciones Químicas",
          score: 18,
          maxScore: 20,
          weight: 35,
          date: "2024-01-11",
        },
        {
          type: "Informe",
          title: "Elementos Químicos",
          score: 17,
          maxScore: 20,
          weight: 30,
          date: "2024-01-07",
        },
      ],
      finalGrade: 18.1,
      status: "Excelente",
    },
    "HISTORIA UNIVERSAL": {
      code: "HIS001",
      teacher: "Prof. Carmen Flores Ruiz",
      period: "I Bimestre",
      evaluations: [
        {
          type: "Examen",
          title: "Guerra Mundial I",
          score: 16,
          maxScore: 20,
          weight: 30,
          date: "2024-01-13",
        },
        {
          type: "Tarea",
          title: "Civilizaciones Antiguas",
          score: 17,
          maxScore: 20,
          weight: 25,
          date: "2024-01-10",
        },
        {
          type: "Proyecto",
          title: "Historia de América",
          score: 15,
          maxScore: 20,
          weight: 25,
          date: "2024-01-07",
        },
      ],
      finalGrade: 16.5,
      status: "Bueno",
    },
    COMUNICACION: {
      code: "COM001",
      teacher: "Prof. Ana Beatriz Torres",
      period: "I Bimestre",
      evaluations: [
        {
          type: "Examen",
          title: "Oratoria",
          score: 17,
          maxScore: 20,
          weight: 30,
          date: "2024-01-12",
        },
        {
          type: "Tarea",
          title: "Redacción",
          score: 18,
          maxScore: 20,
          weight: 25,
          date: "2024-01-09",
        },
        {
          type: "Proyecto",
          title: "Diario Semanal",
          score: 17,
          maxScore: 20,
          weight: 25,
          date: "2024-01-06",
        },
      ],
      finalGrade: 17.3,
      status: "Bueno",
    },
    INGLES: {
      code: "ING001",
      teacher: "Prof. Jennifer Smith",
      period: "I Bimestre",
      evaluations: [
        {
          type: "Examen",
          title: "Gramática",
          score: 15,
          maxScore: 20,
          weight: 30,
          date: "2024-01-11",
        },
        {
          type: "Tarea",
          title: "Vocabulario",
          score: 16,
          maxScore: 20,
          weight: 25,
          date: "2024-01-08",
        },
        {
          type: "Proyecto",
          title: "Escrito Creativo",
          score: 15,
          maxScore: 20,
          weight: 25,
          date: "2024-01-05",
        },
      ],
      finalGrade: 15.9,
      status: "Bueno",
    },
  };

  const CourseDetailModal = ({ course, isOpen, onClose }) => {
    if (!course) return null;

    const details = courseDetails[course];
    if (!details) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Detalle de Calificaciones - {course}
            </DialogTitle>
            <DialogDescription>
              {details.code} - {details.teacher} - {details.period}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {details.finalGrade}
                  </div>
                  <p className="text-sm text-gray-600">Nota Final</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {details.evaluations.length}
                  </div>
                  <p className="text-sm text-gray-600">Evaluaciones</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Badge
                    className={
                      details.status === "Excelente"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {details.status}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">Estado</p>
                </CardContent>
              </Card>
            </div>

            {/* Evaluations Detail */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Desglose de Evaluaciones
              </h3>
              <div className="space-y-3">
                {details.evaluations.map((evaluation, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{evaluation.title}</h4>
                          <p className="text-sm text-gray-600">
                            {evaluation.type}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">
                            {evaluation.score}/{evaluation.maxScore}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {evaluation.weight}% peso
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {evaluation.date}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={
                              (evaluation.score / evaluation.maxScore) * 100
                            }
                            className="w-20 h-2"
                          />
                          <span className="text-sm font-medium">
                            {(
                              (evaluation.score / evaluation.maxScore) *
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Grade Calculation */}
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Cálculo de Nota Final</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {details.evaluations.map((evaluation, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {evaluation.type}: {evaluation.score}/20 ×{" "}
                        {evaluation.weight}%
                      </span>
                      <span className="font-medium">
                        {((evaluation.score * evaluation.weight) / 100).toFixed(
                          1
                        )}
                      </span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Nota Final:</span>
                    <span className="text-blue-600">{details.finalGrade}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recomendaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {details.finalGrade >= 18 ? (
                    <>
                      <li>
                        • ¡Excelente trabajo! Mantén este nivel de rendimiento.
                      </li>
                      <li>
                        • Considera ayudar a tus compañeros que necesiten apoyo.
                      </li>
                    </>
                  ) : details.finalGrade >= 16 ? (
                    <>
                      <li>• Buen rendimiento general, sigue así.</li>
                      <li>
                        • Enfócate en mejorar en las áreas con menor puntuación.
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        • Necesitas mejorar tu rendimiento en esta materia.
                      </li>
                      <li>
                        • Considera solicitar ayuda adicional al profesor.
                      </li>
                      <li>• Dedica más tiempo al estudio y práctica.</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">MIS CALIFICACIONES</h1>
          <p className="text-gray-600">4° B - Año Académico 2024</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">📊</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16.8</div>
              <p className="text-xs text-muted-foreground">Promedio General</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">📚</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Cursos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm font-bold">📅</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">I Bimestre 2024</div>
              <p className="text-xs text-muted-foreground">Período Actual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm font-bold">⭐</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">Créditos Totales</p>
            </CardContent>
          </Card>
        </div>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="mr-2">📋</span>
              Mis Cursos y Calificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Curso</th>
                    <th className="text-left p-3">Docente</th>
                    <th className="text-left p-3">Período</th>
                    <th className="text-left p-3">Evaluaciones</th>
                    <th className="text-left p-3">Nota Final</th>
                    <th className="text-left p-3">Estado</th>
                    <th className="text-left p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(courseDetails).map((course) => {
                    const details = courseDetails[course];
                    return (
                      <tr key={course} className="border-b">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{course}</p>
                            <p className="text-sm text-gray-500">
                              {details.code}
                            </p>
                          </div>
                        </td>
                        <td className="p-3">{details.teacher}</td>
                        <td className="p-3">{details.period}</td>
                        <td className="p-3">
                          {details.evaluations.length} evaluaciones
                        </td>
                        <td className="p-3">
                          <span className="text-lg font-bold">
                            {details.finalGrade}
                          </span>
                        </td>
                        <td className="p-3">
                          <Badge
                            className={
                              details.status === "Excelente"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {details.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Button
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-600"
                            onClick={() => setSelectedCourse(course)}
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
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(courseDetails).map((course) => {
                const details = courseDetails[course];
                return (
                  <div key={course} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{course}</span>
                      <span className="text-sm font-bold">
                        {details.finalGrade}
                      </span>
                    </div>
                    <Progress
                      value={(details.finalGrade / 20) * 100}
                      className="h-2"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Course Detail Modal */}
        <CourseDetailModal
          course={selectedCourse}
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      </div>
    </StudentLayout>
  );
}
