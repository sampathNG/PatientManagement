import React, { useState, useEffect } from "react";
import { Doctor } from "../../types";
import axios from "axios";
interface DoctorFormProps {
  onSubmit: () => void;
  initialData?: Doctor;
  onCancel: () => void;
}
const addDoctor = async (doctorData: any) => {
  try {
    const apiEndpoint = "http://localhost:5000/api/doctors";
    const response = await axios.post(apiEndpoint, doctorData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const updateDoctor = async (doctorId: string, doctorData: any) => {
  try {
    const apiEndpoint = "http://localhost:5000/api/doctors";
    const response = await axios.put(`${apiEndpoint}/${doctorId}`, doctorData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export function DoctorForm({
  onSubmit,
  initialData,
  onCancel,
}: DoctorFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: initialData?.password || "",
    phone: initialData?.phone || "",
    specialization: initialData?.specialization || "",
    experience: initialData?.experience || "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const doctorData = {
      ...formData,
    };
    if (initialData) {
      try {
        const updatedDoctor = await updateDoctor(initialData._id, doctorData);
        onSubmit(updatedDoctor);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const newDoctor = await addDoctor(doctorData);
        onSubmit(newDoctor);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Specialization
        </label>
        <input
          type="text"
          value={formData.specialization}
          onChange={(e) =>
            setFormData({ ...formData, specialization: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Experience
        </label>
        <input
          type="number"
          value={formData.experience}
          onChange={(e) =>
            setFormData({ ...formData, experience: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {initialData ? "Update" : "Add"} Doctor
        </button>
      </div>
    </form>
  );
}
