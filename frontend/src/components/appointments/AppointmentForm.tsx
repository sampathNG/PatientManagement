import React from "react";
import { Appointment } from "../../types";
import axios from "axios";
import { useData } from "../../contexts/DataContext";
interface AppointmentFormProps {
  onSubmit: (data?: Appointment) => void;
  initialData?: Appointment;
  onCancel: () => void;
}
const addAppointment = async (appointmentData: any) => {
  try {
    const apiEndpoint = "http://localhost:5000/api/appointments";
    const response = await axios.post(apiEndpoint, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error adding appointment:", error);
    throw error;
  }
};
const updateAppointment = async (
  appointmentId: string,
  appointmentData: any
) => {
  try {
    const apiEndpoint = "http://localhost:5000/api/appointments";
    const response = await axios.put(
      `${apiEndpoint}/${appointmentId}`,
      appointmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};
export function AppointmentForm({
  onSubmit,
  initialData,
  onCancel,
}: AppointmentFormProps) {
  const { patients } = useData();
  const [formData, setFormData] = React.useState({
    patientId: initialData?.patientId || "",
    // doctorId: initialData?.doctorId || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    status: initialData?.status || "scheduled",
    notes: initialData?.notes || "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentData = { ...formData };
    if (initialData) {
      console.log(initialData);
      try {
        const updatedAppointment = await updateAppointment(
          initialData._id,
          appointmentData
        );
        onSubmit(updatedAppointment);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const newAppointment = await addAppointment(appointmentData);
        onSubmit(newAppointment);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Patient
        </label>
        <select
          value={formData.patientId}
          onChange={(e) =>
            setFormData({ ...formData, patientId: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as Appointment["status"],
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
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
          {initialData ? "Update" : "Add"} Appointment
        </button>
      </div>
    </form>
  );
}
