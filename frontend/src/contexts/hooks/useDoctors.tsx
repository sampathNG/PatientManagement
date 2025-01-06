import { useState, useEffect } from "react";
import type { Doctor } from "../../types";
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
export function useDoctors() {
  // const [patients, setPatients] = useState<Patient[]>(DEMO_PATIENTS);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/doctors`);
        // console.log("response", response);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      }
    };
    fetchData();
  }, []);
  const addDoctor = (doctor: Omit<Doctor, "id" | "createdAt">) => {
    // const addPatient = (patient: Omit<Patient>) => {
    const newDoctor = {
      ...doctor,
      // id: Math.random().toString(36).substr(2, 9),
      // createdAt: new Date().toISOString(),
    };
    setDoctors([...doctors, newDoctor]);
  };
  const updateDoctor = (_id: string, doctorUpdate: Partial<Doctor>) => {
    setDoctors(
      doctors.map((p) => (p._id === _id ? { ...p, ...doctorUpdate } : p))
    );
  };
  const deleteDoctor = async (_id: string) => {
    // try {
    //   const apiEndpoint = "http://localhost:5000/api/doctors";
    //   console.log("Deleting doctor with ID:", _id);
    //   await axios.delete(`${apiEndpoint}/${_id}`);
    //   // Update state after successful deletion
    //   setDoctors(doctors.filter((p) => p._id !== _id));
    //   // setPatients((prevPatients) => prevPatients.filter((p) => p._id !== _id));
    // } catch (error) {
    //   console.error("Error deleting doctor:", error);
    // }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/doctors/${_id}`
      );
      console.log("Doctor deleted successfully", response.data);
      setDoctors(doctors.filter((d) => d._id !== _id));
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Conflict error:", error.response.data.message);
        alert("Cannot delete doctor due to related data or conflicts.");
      } else {
        console.error("Error deleting doctor:", error.message);
        alert("An error occurred while deleting the doctor.");
      }
    }
  };

  return { doctors, addDoctor, updateDoctor, deleteDoctor };
}
