// Existing types...

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Consultation {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  date: string;
  symptoms: string[];
  diagnosis: string;
  notes: string;
  medicines: Medicine[];
  followUpDate?: string;
}

// Update Appointment type
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  consultationId?: string; // Reference to consultation if completed
}