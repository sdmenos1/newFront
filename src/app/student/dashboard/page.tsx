"use client";
import { withAuth } from "@/components/withAuth";

function StudentDashboard() {
  return <h1>📚 Bienvenido estudiante</h1>;
}

export default withAuth(StudentDashboard, ["student"]);
