"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Filter, Mail, Phone, Users } from "lucide-react";
import TeacherLayout from "@/components/teacher-layout";
import { useAuth } from "@/hooks/useAuth";
import { apiClient } from "@/lib/api";

export default function TeacherStudents() {
  const { user, isBackendAvailable } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && isBackendAvailable) {
      loadStudents();
    } else {
      // Mock data for demo
      setStudents([
        {
          id: 1,
          name: "Carlos Mendoza López",
          code: "2024-4B-015",
          grade: "4° B - SECUNDARIA",
          email: "carlos.mendoza@colegio.edu",
          phone: "+51 987 654 321",
          course: { name: "ALGEBRA" },
          attendance: 95,
          average: 17.2,
        },
        {
          id: 2,
          name: "Ana Sofía Ramírez",
          code: "2024-4B-003",
          grade: "4° B - SECUNDARIA",
          email: "ana.ramirez@colegio.edu",
          phone: "+51 987 654 322",
          course: { name: "ALGEBRA" },
          attendance: 98,
          average: 18.5,
        },
        {
          id: 3,
          name: "Diego Fernández Castro",
          code: "2024-4B-012",
          grade: "4° B - SECUNDARIA",
          email: "diego.fernandez@colegio.edu",
          phone: "+51 987 654 323",
          course: { name: "ALGEBRA" },
          attendance: 92,
          average: 16.8,
        },
        {
          id: 4,
          name: "Valentina Herrera Silva",
          code: "2024-4A-007",
          grade: "4° A - SECUNDARIA",
          email: "valentina.herrera@colegio.edu",
          phone: "+51 987 654 324",
          course: { name: "ALGEBRA" },
          attendance: 96,
          average: 17.9,
        },
        {
          id: 5,
          name: "Mateo Jiménez López",
          code: "2024-4A-014",
          grade: "4° A - SECUNDARIA",
          email: "mateo.jimenez@colegio.edu",
          phone: "+51 987 654 325",
          course: { name: "ALGEBRA" },
          attendance: 89,
          average: 15.6,
        },
        {
          id: 6,
          name: "Isabella Torres Vega",
          code: "2024-3C-008",
          grade: "3° C - SECUNDARIA",
          email: "isabella.torres@colegio.edu",
          phone: "+51 987 654 326",
          course: { name: "MATEMATICAS" },
          attendance: 94,
          average: 16.3,
        },
      ]);
      setLoading(false);
    }
  }, [user, isBackendAvailable]);

  const loadStudents = async () => {
    try {
      if (!user?.id) return;

      const response = await apiClient.getStudentsByTeacher(user.id);
      if (response.success) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado en tiempo real
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        searchTerm === "" ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCourse =
        selectedCourse === "all" ||
        (student.course &&
          student.course.name
            .toLowerCase()
            .includes(selectedCourse.toLowerCase()));

      return matchesSearch && matchesCourse;
    });
  }, [searchTerm, selectedCourse, students]);

  if (loading) {
    return (
      <TeacherLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">MIS ESTUDIANTES</h1>
              <p className="text-gray-600">
                Gestiona la información de tus estudiantes
              </p>
            </div>
          </div>
          {!isBackendAvailable && (
            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              Modo Demo
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">Total Estudiantes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm font-bold">📚</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Cursos Asignados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Filter className="w-4 h-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredStudents.length}
              </div>
              <p className="text-xs text-muted-foreground">Filtrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm font-bold">📊</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                Asistencia Promedio
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar estudiante</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Nombre, código o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {searchTerm && (
                  <p className="text-xs text-gray-500">
                    Mostrando {filteredStudents.length} resultado(s) para "
                    {searchTerm}"
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Filtrar por curso</label>
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los cursos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los cursos</SelectItem>
                    <SelectItem value="algebra">Álgebra</SelectItem>
                    <SelectItem value="matematicas">Matemáticas</SelectItem>
                    <SelectItem value="fisica">Física</SelectItem>
                    <SelectItem value="quimica">Química</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Lista de Estudiantes
            </CardTitle>
            <CardDescription>
              {filteredStudents.length} estudiantes encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron estudiantes
                </h3>
                <p className="text-gray-500">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStudents.map((student) => (
                  <Card
                    key={student.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">
                            {student.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {student.code}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {student.grade}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Mail className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500 truncate">
                              {student.email}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Phone className="w-3 h-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">
                              {student.phone}
                            </span>
                          </div>

                          {/* Stats */}
                          <div className="flex justify-between mt-2 text-xs">
                            <span className="text-green-600">
                              Asistencia: {student.attendance || 95}%
                            </span>
                            <span className="text-blue-600">
                              Promedio: {student.average || 16.5}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1">
                            {student.course && (
                              <Badge variant="secondary" className="text-xs">
                                {student.course.name}
                              </Badge>
                            )}
                          </div>

                          <div className="flex space-x-1 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs bg-transparent"
                            >
                              <Mail className="w-3 h-3 mr-1" />
                              Email
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs bg-transparent"
                            >
                              <Phone className="w-3 h-3 mr-1" />
                              Llamar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  );
}
