import React, { useState } from "react";
import { Plus } from "lucide-react";
import { DoctorList } from "../components/doctors/DoctorList";
import { DoctorForm } from "../components/doctors/DoctorForm";
import { useData } from "../contexts/DataContext";
import { Doctor } from "../types";
import toast from "react-hot-toast";
export default function Doctors() {
  const { addDoctor, updateDoctor, doctors } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const handleSubmit = (data: Omit<Patient, "_id" | "createdAt">) => {
    try {
      if (editingDoctor) {
        updateDoctor(editingDoctor._id, data);
        toast.success("Doctor updated successfully");
      } else {
        addDoctor(data);
        toast.success("Doctor added successfully");
      }
      setShowForm(false);
      setEditingDoctor(null);
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  const handleEdit = (_id: string) => {
    const doctor = doctors.find((p) => p._id === _id);
    if (doctor) {
      setEditingDoctor(doctor);
      setShowForm(true);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Doctor
        </button>
      </div>
      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
          </h2>
          <DoctorForm
            onSubmit={handleSubmit}
            initialData={editingDoctor || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditingDoctor(null);
            }}
          />
        </div>
      ) : (
        <DoctorList onEdit={handleEdit} />
      )}
    </div>
  );
}
