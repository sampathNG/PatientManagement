// import { useState, useEffect } from "react";
// import type { Patient } from "../../types";
// const DEMO_PATIENTS: Patient[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     phone: "123-456-7890",
//     dateOfBirth: "1990-01-01",
//     gender: "male",
//     address: "123 Main St",
//     medicalHistory: ["Hypertension", "Diabetes"],
//     createdAt: "2024-01-01",
//   },
// ];
// export function usePatients() {
//   const [patients, setPatients] = useState<Patient[]>(DEMO_PATIENTS);
//   const addPatient = (patient: Omit<Patient, "id" | "createdAt">) => {
//     const newPatient = {
//       ...patient,
//       id: Math.random().toString(36).substr(2, 9),
//       createdAt: new Date().toISOString(),
//     };
//     setPatients([...patients, newPatient]);
//   };
//   const updatePatient = (id: string, patientUpdate: Partial<Patient>) => {
//     setPatients(
//       patients.map((p) => (p.id === id ? { ...p, ...patientUpdate } : p))
//     );
//   };
//   const deletePatient = (id: string) => {
//     setPatients(patients.filter((p) => p.id !== id));
//   };
//   return { patients, addPatient, updatePatient, deletePatient };
// }
//
import { useState, useEffect } from "react";
import axios from "axios";
import type { Patient } from "../../types";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]); // Initialize state as an empty array
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  // Fetch patient data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await axios.get("http://localhost:5000/api/patients");
        setPatients(response.data); // Populate state with fetched data
      } catch (error) {
        setError("Failed to fetch patient data");
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add a new patient
  const addPatient = async (newPatient: Omit<Patient, "id" | "createdAt">) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/patients",
        newPatient
      );
      setPatients([...patients, response.data]); // Add the new patient to the state
    } catch (error) {
      setError("Failed to add patient");
      console.error("Error adding patient:", error);
    }
  };

  // Update an existing patient by ID
  const updatePatient = async (id: string, patientUpdate: Partial<Patient>) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/patients/${id}`,
        patientUpdate
      );
      setPatients(
        patients.map((p) => (p.id === id ? { ...p, ...response.data } : p))
      );
    } catch (error) {
      setError("Failed to update patient");
      console.error("Error updating patient:", error);
    }
  };

  // Delete a patient by ID
  const deletePatient = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setPatients(patients.filter((p) => p.id !== id));
    } catch (error) {
      setError("Failed to delete patient");
      console.error("Error deleting patient:", error);
    }
  };

  return { patients, loading, error, addPatient, updatePatient, deletePatient };
}
