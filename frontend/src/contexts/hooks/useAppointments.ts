import { useState, useEffect } from "react";
import type { Appointment } from "../../types";
import axios from "axios";
const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    doctorId: "2",
    date: "2024-03-15",
    time: "10:00",
    status: "scheduled",
    notes: "Regular checkup",
  },
];
export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`${process.env.BACKEND_URL}/appointments`);
        // const response = await fetch(`http://localhost:5000/api/appointments`);
        const response = await fetch(`${process.env.BACKEND_URL}/appointments`);
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching patients:", error.message);
      }
    };
    fetchData();
  }, []);
  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment = {
      ...appointment,
      // id: Math.random().toString(36).substr(2, 9),
    };
    setAppointments([...appointments, newAppointment]);
  };
  const updateAppointment = (
    id: string,
    appointmentUpdate: Partial<Appointment>
  ) => {
    setAppointments(
      appointments.map((a) =>
        a._id === id ? { ...a, ...appointmentUpdate } : a
      )
    );
  };
  const deleteAppointment = async (id: string) => {
    const previousAppointments = [...appointments];
    setAppointments(appointments.filter((a) => a._id !== id));
    try {
      const apiEndpoint = "http://localhost:5000/api/appointments";
      await axios.delete(`${apiEndpoint}/${id}`);
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
      setAppointments(previousAppointments);
    }
  };
  return { appointments, addAppointment, updateAppointment, deleteAppointment };
}
