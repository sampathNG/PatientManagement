import React, { useState } from "react";
import { Plus } from "lucide-react";
import { PatientList } from "../components/patients/PatientList";
import { PatientForm } from "../components/patients/PatientForm";
import { useData } from "../contexts/DataContext";
import { Patient } from "../types";
import toast from "react-hot-toast";
export default function Patients() {
  const { addPatient, updatePatient, patients } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const handleSubmit = (data: Omit<Patient, "_id" | "createdAt">) => {
    try {
      if (editingPatient) {
        updatePatient(editingPatient._id, data);
        toast.success("Patient updated successfully");
      } else {
        addPatient(data);
        toast.success("Patient added successfully");
      }
      setShowForm(false);
      setEditingPatient(null);
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  const handleEdit = (_id: string) => {
    const patient = patients.find((p) => p._id === _id);
    if (patient) {
      setEditingPatient(patient);
      setShowForm(true);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Patient
        </button>
      </div>
      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingPatient ? "Edit Patient" : "Add New Patient"}
          </h2>
          <PatientForm
            onSubmit={handleSubmit}
            initialData={editingPatient || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditingPatient(null);
            }}
          />
        </div>
      ) : (
        <PatientList onEdit={handleEdit} />
      )}
    </div>
  );
}
