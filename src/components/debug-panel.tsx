"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DebugPanel() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const testEndpoints = async () => {
    setIsLoading(true);
    const results = [];

    // Test 1: Endpoint raíz
    try {
      const response = await fetch("http://localhost:3001");
      const text = await response.text();
      results.push({
        endpoint: "GET /",
        status: response.status,
        success: response.ok,
        data: text,
      });
    } catch (error: any) {
      results.push({
        endpoint: "GET /",
        status: "ERROR",
        success: false,
        data: error.message,
      });
    }

    // Test 2: Auth login
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "carlos.mendoza@colegio.edu",
          password: "123456",
        }),
      });
      const data = await response.json();
      results.push({
        endpoint: "POST /auth/login",
        status: response.status,
        success: response.ok,
        data: data,
      });
    } catch (error: any) {
      results.push({
        endpoint: "POST /auth/login",
        status: "ERROR",
        success: false,
        data: error.message,
      });
    }

    // Test 3: Verificar CORS
    try {
      const response = await fetch("http://localhost:3001", {
        method: "OPTIONS",
      });
      results.push({
        endpoint: "OPTIONS / (CORS)",
        status: response.status,
        success: response.ok,
        data: "CORS OK",
      });
    } catch (error: any) {
      results.push({
        endpoint: "OPTIONS / (CORS)",
        status: "ERROR",
        success: false,
        data: error.message,
      });
    }

    setTestResults(results);
    setIsLoading(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">🔧 Panel de Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={testEndpoints}
          disabled={isLoading}
          className="mb-4 bg-transparent"
          variant="outline"
        >
          {isLoading ? "Probando..." : "Probar Conexiones"}
        </Button>

        {testResults.length > 0 && (
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded"
              >
                <span className="font-mono text-sm">{result.endpoint}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={result.success ? "default" : "destructive"}>
                    {result.status}
                  </Badge>
                  <details className="text-xs">
                    <summary className="cursor-pointer">Ver datos</summary>
                    <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
