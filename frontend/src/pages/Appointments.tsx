import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AppointmentList } from "../components/appointments/AppointmentList";
import { AppointmentForm } from "../components/appointments/AppointmentForm";
import { useData } from "../contexts/DataContext";
import { Appointment } from "../types";
import toast from "react-hot-toast";
export default function Appointments() {
  const { addAppointment, updateAppointment, appointments } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const handleSubmit = (data: Omit<Appointment, "id">) => {
    try {
      if (editingAppointment) {
        updateAppointment(editingAppointment._id, data);
        toast.success("Appointment updated successfully");
      } else {
        addAppointment(data);
        toast.success("Appointment added successfully");
      }
      setShowForm(false);
      setEditingAppointment(null);
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  const handleEdit = (_id: string) => {
    const appointment = appointments.find((a) => a._id === _id);
    if (appointment) {
      setEditingAppointment(appointment);
      setShowForm(true);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Appointment
        </button>
      </div>
      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingAppointment ? "Edit Appointment" : "Add New Appointment"}
          </h2>
          <AppointmentForm
            onSubmit={handleSubmit}
            initialData={editingAppointment || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditingAppointment(null);
            }}
          />
        </div>
      ) : (
        <AppointmentList onEdit={handleEdit} />
      )}
    </div>
  );
}
