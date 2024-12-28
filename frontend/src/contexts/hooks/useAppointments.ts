import { useState } from 'react';
import type { Appointment } from '../../types';

const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    doctorId: '2',
    date: '2024-03-15',
    time: '10:00',
    status: 'scheduled',
    notes: 'Regular checkup'
  }
];

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(DEMO_APPOINTMENTS);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9)
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (id: string, appointmentUpdate: Partial<Appointment>) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, ...appointmentUpdate } : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  return { appointments, addAppointment, updateAppointment, deleteAppointment };
}