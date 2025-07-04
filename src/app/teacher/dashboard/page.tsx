"use client";
import { withAuth } from "@/components/withAuth";

function TeacherDashboard() {
  return <h1>👩‍🏫 Bienvenido docente</h1>;
}

export default withAuth(TeacherDashboard, ["teacher"]);
