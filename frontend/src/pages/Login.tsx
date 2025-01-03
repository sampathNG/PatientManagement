import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Building2 } from "lucide-react"; // Changed from Hospital to Building2
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { LoginForm } from "../components/auth/LoginForm";
function Login() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Hospital Management System
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
export default Login;
