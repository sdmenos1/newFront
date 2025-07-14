"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "@/lib/api";
import { useAuth } from "./auth-context";

type Student = {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  grade?: string;
  section?: string;
  level?: string;
};

type StudentContextType = {
  student: Student | null;
  loading: boolean;
  error: string | null;
  fetchStudent: (id: number | string) => Promise<void>;
  logout: () => void;
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const { user, logout: globalLogout } = useAuth(); // 👈 usamos el auth-context
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudent = async (id: number | string) => {
    setLoading(true);
    try {
      const data = await apiClient.getStudent(id);
      console.log("📘 Student data actualizada:", data);
      setStudent(data);
      setError(null);
    } catch (err: any) {
      console.error("❌ Error fetching student:", err);
      setError(err.message);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    globalLogout(); // usa logout del auth-context
    setStudent(null);
  };

  useEffect(() => {
  console.log("🔍 Usuario desde AuthContext:", user);

  if (user?.role === "student") {
    const studentUser = {
      ...user,
      id: user.sub, // 👈 mapeamos sub a id
    };
    setStudent(studentUser as Student);
  } else {
    setStudent(null);
  }
  setLoading(false);
}, [user]);

  return (
    <StudentContext.Provider
      value={{ student, loading, error, fetchStudent, logout }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
