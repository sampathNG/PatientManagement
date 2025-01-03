import { useState, useEffect } from "react";
import type { Service } from "../../types";
import axios from "axios";
const DEMO_SERVICES: Service[] = [
  {
    id: "1",
    name: "General Consultation",
    description: "Regular medical consultation",
    cost: 100,
    duration: 30,
  },
];
export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/services`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching patients:", error.message);
      }
    };
    fetchData();
  }, []);
  const addService = async (serviceData: Omit<Service, "id">) => {
    try {
      const apiEndpoint = "http://localhost:5000/api/services";
      const response = await axios.post(apiEndpoint, serviceData);
      const newService = response.data;
      setServices((prevServices) => [...prevServices, newService]);
    } catch (error) {
      console.error("Error adding service:", error);
      throw error;
    }
  };
  const updateService = async (
    _id: string,
    serviceUpdate: Partial<Service>
  ) => {
    try {
      const apiEndpoint = "http://localhost:5000/api/services";
      const response = await axios.put(`${apiEndpoint}/${_id}`, serviceUpdate);
      const updatedService = response.data;
      setServices((prevServices) =>
        prevServices.map((s) =>
          s._id === _id ? { ...s, ...updatedService } : s
        )
      );
      return updatedService; // Optionally return the updated service
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  };
  const deleteService = async (_id: string) => {
    try {
      const apiEndpoint = "http://localhost:5000/api/services";
      await axios.delete(`${apiEndpoint}/${_id}`);
      // Update state after successful deletion
      setServices(services.filter((s) => s._id !== _id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };
  return { services, addService, updateService, deleteService };
}
