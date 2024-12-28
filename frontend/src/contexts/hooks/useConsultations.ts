import { useState } from 'react';
import type { Consultation } from '../../types';

export function useConsultations() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  const addConsultation = (consultation: Omit<Consultation, 'id'>) => {
    const newConsultation = {
      ...consultation,
      id: Math.random().toString(36).substr(2, 9)
    };
    setConsultations([...consultations, newConsultation]);
  };

  const updateConsultation = (id: string, consultationUpdate: Partial<Consultation>) => {
    setConsultations(consultations.map(c => 
      c.id === id ? { ...c, ...consultationUpdate } : c
    ));
  };

  const getPatientHistory = (patientId: string) => {
    return consultations.filter(c => c.patientId === patientId);
  };

  return { consultations, addConsultation, updateConsultation, getPatientHistory };
}