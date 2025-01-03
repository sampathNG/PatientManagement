import { useState, useEffect } from "react";
import type { Patient } from "../../types";
import axios from "axios";
const DEMO_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-01",
    gender: "male",
    address: "123 Main St",
    medicalHistory: ["Hypertension", "Diabetes"],
    createdAt: "2024-01-01",
  },
];
export function usePatients() {
  // const [patients, setPatients] = useState<Patient[]>(DEMO_PATIENTS);
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/patients`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error.message);
      }
    };
    fetchData();
  }, []);
  const addPatient = (patient: Omit<Patient, "id" | "createdAt">) => {
    // const addPatient = (patient: Omit<Patient>) => {
    const newPatient = {
      ...patient,
      // id: Math.random().toString(36).substr(2, 9),
      // createdAt: new Date().toISOString(),
    };
    setPatients([...patients, newPatient]);
  };
  const updatePatient = (_id: string, patientUpdate: Partial<Patient>) => {
    setPatients(
      patients.map((p) => (p._id === _id ? { ...p, ...patientUpdate } : p))
    );
  };
  const deletePatient = async (_id: string) => {
    try {
      const apiEndpoint = "http://localhost:5000/api/patients";
      await axios.delete(`${apiEndpoint}/${_id}`);
      // Update state after successful deletion
      setPatients(patients.filter((p) => p._id !== _id));
      // setPatients((prevPatients) => prevPatients.filter((p) => p._id !== _id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return { patients, addPatient, updatePatient, deletePatient };
}
