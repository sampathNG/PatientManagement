import type { Patient, Appointment, Service, Consultation } from "../types";

export interface DataContextType {
  // Patients
  patients: Patient[];
  addPatient: (patient: Omit<Patient, "id" | "createdAt">) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  // Doctors
  doctors: Doctor[];
  addDoctor: (doctor: Omit<Doctor, "id" | "createdAt">) => void;
  updateDoctor: (id: string, patient: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;

  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;

  // Services
  services: Service[];
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Consultations
  consultations: Consultation[];
  addConsultation: (consultation: Omit<Consultation, "id">) => void;
  updateConsultation: (id: string, consultation: Partial<Consultation>) => void;
  getPatientHistory: (patientId: string) => Consultation[];
}
