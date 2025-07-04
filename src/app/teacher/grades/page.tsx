"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, GraduationCap, Edit, Trash2, Eye } from "lucide-react";
import TeacherLayout from "@/components/teacher-layout";

export default function TeacherGrades() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedEvaluation, setSelectedEvaluation] = useState("all");
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false);
  const [newGrade, setNewGrade] = useState({
    student: "",
    evaluationType: "",
    title: "",
    score: "",
    maxScore: "20",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const courses = [
    { id: "algebra-4b", name: "Álgebra - 4° B", students: 28 },
    { id: "algebra-4a", name: "Álgebra - 4° A", students: 25 },
    { id: "matematicas-3c", name: "Matemáticas - 3° C", students: 30 },
  ];

  const students = [
    { id: 1, name: "Carlos Mendoza López", code: "2024-4B-015" },
    { id: 2, name: "Ana Sofía Ramírez", code: "2024-4B-003" },
    { id: 3, name: "Diego Fernández Castro", code: "2024-4B-012" },
    { id: 4, name: "Valentina Herrera Silva", code: "2024-4A-007" },
    { id: 5, name: "Mateo Jiménez López", code: "2024-4A-014" },
  ];

  const grades = [
    {
      id: 1,
      student: "Carlos Mendoza López",
      studentCode: "2024-4B-015",
      evaluationType: "Examen",
      title: "Examen Parcial - Ecuaciones",
      score: 17,
      maxScore: 20,
      date: "2024-01-15",
      course: "algebra-4b",
    },
    {
      id: 2,
      student: "Ana Sofía Ramírez",
      studentCode: "2024-4B-003",
      evaluationType: "Tarea",
      title: "Ejercicios Capítulo 3",
      score: 19,
      maxScore: 20,
      date: "2024-01-14",
      course: "algebra-4b",
    },
    {
      id: 3,
      student: "Diego Fernández Castro",
      studentCode: "2024-4B-012",
      evaluationType: "Proyecto",
      title: "Aplicaciones de Álgebra",
      score: 16,
      maxScore: 20,
      date: "2024-01-13",
      course: "algebra-4b",
    },
  ];

  const handleAddGrade = () => {
    console.log("Nueva calificación:", newGrade);
    setIsAddGradeOpen(false);
    setNewGrade({
      student: "",
      evaluationType: "",
      title: "",
      score: "",
      maxScore: "20",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const selectedCourseData = courses.find((c) => c.id === selectedCourse);
  const filteredGrades = selectedCourse
    ? grades.filter((g) => g.course === selectedCourse)
    : [];

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">GESTIÓN DE NOTAS</h1>
              <p className="text-gray-600">
                Administra las calificaciones de tus estudiantes
              </p>
            </div>
          </div>

          <Dialog open={isAddGradeOpen} onOpenChange={setIsAddGradeOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Nota
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Agregar Nueva Calificación</DialogTitle>
                <DialogDescription>
                  Registra una nueva calificación para tus estudiantes
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course">Curso</Label>
                    <Select
                      value={newGrade.student}
                      onValueChange={(value) =>
                        setNewGrade({ ...newGrade, student: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar curso" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student">Estudiante</Label>
                    <Select
                      value={newGrade.student}
                      onValueChange={(value) =>
                        setNewGrade({ ...newGrade, student: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estudiante" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.name}>
                            {student.name} - {student.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="evaluationType">Tipo de Evaluación</Label>
                    <Select
                      value={newGrade.evaluationType}
                      onValueChange={(value) =>
                        setNewGrade({ ...newGrade, evaluationType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="examen">Examen</SelectItem>
                        <SelectItem value="tarea">Tarea</SelectItem>
                        <SelectItem value="proyecto">Proyecto</SelectItem>
                        <SelectItem value="participacion">
                          Participación
                        </SelectItem>
                        <SelectItem value="practica">Práctica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newGrade.date}
                      onChange={(e) =>
                        setNewGrade({ ...newGrade, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título de la Evaluación</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Examen Parcial - Ecuaciones Lineales"
                    value={newGrade.title}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, title: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="score">Calificación Obtenida</Label>
                    <Input
                      id="score"
                      type="number"
                      min="0"
                      max={newGrade.maxScore}
                      step="0.1"
                      placeholder="0.0"
                      value={newGrade.score}
                      onChange={(e) =>
                        setNewGrade({ ...newGrade, score: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxScore">Calificación Máxima</Label>
                    <Input
                      id="maxScore"
                      type="number"
                      min="1"
                      step="0.1"
                      value={newGrade.maxScore}
                      onChange={(e) =>
                        setNewGrade({ ...newGrade, maxScore: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción (Opcional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Comentarios adicionales sobre la evaluación..."
                    value={newGrade.description}
                    onChange={(e) =>
                      setNewGrade({ ...newGrade, description: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddGradeOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddGrade}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Guardar Calificación
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle>Seleccionar Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Curso</label>
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} ({course.students} estudiantes)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Tipo de Evaluación
                </label>
                <Select
                  value={selectedEvaluation}
                  onValueChange={setSelectedEvaluation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="examen">Examen</SelectItem>
                    <SelectItem value="tarea">Tarea</SelectItem>
                    <SelectItem value="proyecto">Proyecto</SelectItem>
                    <SelectItem value="participacion">Participación</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Stats */}
        {selectedCourseData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">
                  {selectedCourseData.students}
                </div>
                <p className="text-xs text-muted-foreground">Estudiantes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">
                  {filteredGrades.length}
                </div>
                <p className="text-xs text-muted-foreground">Calificaciones</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">16.8</div>
                <p className="text-xs text-muted-foreground">Promedio</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">Aprobados</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Grades Table */}
        {selectedCourse ? (
          <Card>
            <CardHeader>
              <CardTitle>Calificaciones - {selectedCourseData?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredGrades.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hay calificaciones registradas
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Comienza agregando la primera calificación para este curso
                  </p>
                  <Button
                    onClick={() => setIsAddGradeOpen(true)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Primera Calificación
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Estudiante</th>
                        <th className="text-left p-3">Evaluación</th>
                        <th className="text-left p-3">Tipo</th>
                        <th className="text-left p-3">Calificación</th>
                        <th className="text-left p-3">Fecha</th>
                        <th className="text-left p-3">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGrades.map((grade) => (
                        <tr
                          key={grade.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{grade.student}</p>
                              <p className="text-sm text-gray-500">
                                {grade.studentCode}
                              </p>
                            </div>
                          </td>
                          <td className="p-3">
                            <p className="font-medium">{grade.title}</p>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {grade.evaluationType}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold">
                                {grade.score}
                              </span>
                              <span className="text-gray-500">
                                / {grade.maxScore}
                              </span>
                              <Badge
                                className={
                                  grade.score >= 14
                                    ? "bg-green-100 text-green-800"
                                    : grade.score >= 11
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {grade.score >= 14
                                  ? "Aprobado"
                                  : grade.score >= 11
                                  ? "Regular"
                                  : "Desaprobado"}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="text-sm text-gray-600">
                              {grade.date}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Selecciona un curso
              </h3>
              <p className="text-gray-600 text-center">
                Elige un curso para ver y gestionar las calificaciones de tus
                estudiantes
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </TeacherLayout>
  );
}
