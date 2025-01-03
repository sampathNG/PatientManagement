import React from "react";
import { Patient } from "../../types";
import axios from "axios";
interface PatientFormProps {
  onSubmit: () => void;
  initialData?: Patient;
  onCancel: () => void;
}
const addPatient = async (patientData: any) => {
  try {
    const apiEndpoint = "http://localhost:5000/api/patients";
    const response = await axios.post(apiEndpoint, patientData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const updatePatient = async (patientId: string, patientData: any) => {
  try {
    const apiEndpoint = "http://localhost:5000/api/patients";
    const response = await axios.put(
      `${apiEndpoint}/${patientId}`,
      patientData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export function PatientForm({
  onSubmit,
  initialData,
  onCancel,
}: PatientFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    gender: initialData?.gender || "male",
    address: initialData?.address || "",
    medicalHistory: initialData?.medicalHistory.join(", ") || "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = {
      ...formData,
      medicalHistory: formData.medicalHistory
        .split(",")
        .map((item) => item.trim()), // Split medical history into an array
    };
    if (initialData) {
      try {
        const updatedPatient = await updatePatient(
          initialData._id,
          patientData
        );
        onSubmit(updatedPatient);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const newPatient = await addPatient(patientData);
        onSubmit(newPatient);
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
          Date of Birth
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) =>
            setFormData({ ...formData, dateOfBirth: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          value={formData.gender}
          onChange={(e) =>
            setFormData({
              ...formData,
              gender: e.target.value as "male" | "female" | "other",
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Medical History
        </label>
        <textarea
          value={formData.medicalHistory}
          onChange={(e) =>
            setFormData({ ...formData, medicalHistory: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          placeholder="Enter conditions separated by commas"
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
          {initialData ? "Update" : "Add"} Patient
        </button>
      </div>
    </form>
  );
}
