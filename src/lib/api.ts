const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.colegio.edu"
    : "http://localhost";

const SERVICES = {
  AUTH: `${API_BASE_URL}:3001`,
  USERS: `${API_BASE_URL}:3002`,
  COURSES: `${API_BASE_URL}:3005`,
  ATTENDANCE: `${API_BASE_URL}:3003`,
  GRADES: `${API_BASE_URL}:3004`,
};

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  }

  private async request(url: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

      try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`,
      }));
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Backend service not available. Please ensure the microservices are running.");
    }
    throw error;
  }
}

  async login(email: string, password: string) {
    const response = await this.request(`${SERVICES.AUTH}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async validateAuthToken(): Promise<{ success: boolean; data: any }> {
    return this.request(`${SERVICES.AUTH}/auth/validate`, {
      method: "POST",
      body: JSON.stringify({ token: this.token }),
    });
  }

  // Users Service (Students & Teachers)
  async getStudent(id: number) {
    return this.request(`${SERVICES.USERS}/students/${id}`);
  }

  async getTeacher(id: number) {
    return this.request(`${SERVICES.USERS}/students/teachers/${id}`);
  }

  async getAllTeachers() {
    return this.request(`${SERVICES.USERS}/students/teachers`);
  }

  async searchStudents(params: {
    grade?: string;
    section?: string;
    level?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    return this.request(
      `${SERVICES.USERS}/students?${queryParams.toString()}`
    );
  }

  async createStudent(studentData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    grade?: string;
    section?: string;
    level?: string;
    [key: string]: any;
  }) {
    return this.request(`${SERVICES.USERS}/students`, {
      method: "POST",
      body: JSON.stringify(studentData),
    });
  }

  async createTeacher(teacherData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    [key: string]: any;
  }) {
    return this.request(`${SERVICES.USERS}/students/teachers`, {
      method: "POST",
      body: JSON.stringify(teacherData),
    });
  }

  async validateStudentLogin(email: string, password: string) {
    return this.request(`${SERVICES.USERS}/students/validate-login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async validateTeacherLogin(email: string, password: string) {
    return this.request(`${SERVICES.USERS}/students/teachers/validate-login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Courses Service (New microservice)
  async getAllCourses() {
    return this.request(`${SERVICES.COURSES}/courses`);
  }

  async createCourse(courseData: {
    code: string;
    name: string;
    description?: string;
    teacherId: number;
    teacherName: string;
    credits: number;
    classroom?: string;
  }) {
    return this.request(`${SERVICES.COURSES}/courses`, {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  }

  async assignCourseToStudent(assignmentData: {
    studentId: number;
    courseId: number;
    academicYear: string;
    semester: string;
  }) {
    return this.request(`${SERVICES.COURSES}/courses/student-courses`, {
      method: "POST",
      body: JSON.stringify(assignmentData),
    });
  }

  // api.ts

async getStudentCourses(studentId: string) {
  return this.request(`${SERVICES.USERS}/students/${studentId}/courses`);
}



  async getStudentsByCourse(courseId: number) {
    return this.request(`${SERVICES.COURSES}/courses/by-course/${courseId}`);
  }

  async getStudentsByTeacher(teacherId: number) {
    return this.request(`${SERVICES.COURSES}/courses/by-teacher/${teacherId}`);
  }

  // Attendance Service
  async createAttendance(attendance: {
    studentId: number;
    courseId: number;
    teacherId: number;
    date: string;
    status: string;
    notes?: string;
    academicYear: string;
    semester: string;
  }) {
    return this.request(`${SERVICES.ATTENDANCE}/attendance`, {
      method: "POST",
      body: JSON.stringify(attendance),
    });
  }

  async createBulkAttendance(attendances: any[]) {
    return this.request(`${SERVICES.ATTENDANCE}/attendance/bulk`, {
      method: "POST",
      body: JSON.stringify({ attendances }),
    });
  }

  async getStudentAttendance(
    studentId: number,
    params?: {
      courseId?: number;
      startDate?: string;
      endDate?: string;
    }
  ) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }

    return this.request(
      `${
        SERVICES.ATTENDANCE
      }/attendance/student/${studentId}?${queryParams.toString()}`
    );
  }

  async getStudentAttendanceStats(studentId: number) {
    return this.request(
      `${SERVICES.ATTENDANCE}/attendance/stats/student/${studentId}`
    );
  }

  async getCourseAttendance(
    courseId: number,
    params?: {
      date?: string;
      startDate?: string;
      endDate?: string;
    }
  ) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    return this.request(
      `${
        SERVICES.ATTENDANCE
      }/attendance/course/${courseId}?${queryParams.toString()}`
    );
  }

  async getTeacherAttendance(
    teacherId: number,
    params?: {
      date?: string;
      courseId?: number;
    }
  ) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }

    return this.request(
      `${
        SERVICES.ATTENDANCE
      }/attendance/teacher/${teacherId}?${queryParams.toString()}`
    );
  }

  // Grades Service
  async createGrade(grade: {
    studentId: number;
    courseId: number;
    teacherId: number;
    evaluationType: string;
    title: string;
    score: number;
    maxScore: number;
    weight?: number;
    evaluationDate: string;
    description?: string;
    academicYear: string;
    semester: string;
  }) {
    return this.request(`${SERVICES.GRADES}/grades`, {
      method: "POST",
      body: JSON.stringify(grade),
    });
  }

  async updateGrade(id: number, grade: any) {
    return this.request(`${SERVICES.GRADES}/grades/${id}`, {
      method: "PUT",
      body: JSON.stringify(grade),
    });
  }

  async deleteGrade(id: number) {
    return this.request(`${SERVICES.GRADES}/grades/${id}`, {
      method: "DELETE",
    });
  }

  async getStudentGrades(
    studentId: number,
    params?: {
      courseId?: number;
      semester?: string;
    }
  ) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }

    return this.request(
      `${SERVICES.GRADES}/grades/student/${studentId}?${queryParams.toString()}`
    );
  }

  async getStudentGradeSummary(studentId: number) {
    return this.request(
      `${SERVICES.GRADES}/grades/student/${studentId}/summary`
    );
  }

  async getCourseGrades(
    courseId: number,
    params?: {
      evaluationType?: string;
    }
  ) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    return this.request(
      `${SERVICES.GRADES}/grades/course/${courseId}?${queryParams.toString()}`
    );
  }

  async getTeacherGrades(
    teacherId: number,
    params?: {
      courseId?: number;
    }
  ) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }

    return this.request(
      `${SERVICES.GRADES}/grades/teacher/${teacherId}?${queryParams.toString()}`
    );
  }

  async getCourseGradeSummary(courseId: number) {
    return this.request(`${SERVICES.GRADES}/grades/course/${courseId}/summary`);
  }
}

export const apiClient = new ApiClient();