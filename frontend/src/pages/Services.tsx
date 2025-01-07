import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useData } from "../contexts/DataContext";
import { Service } from "../types";
import axios from "axios";
import toast from "react-hot-toast";
export default function Services() {
  const { services, addService, updateService, deleteService } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: 0,
    duration: 0,
    doctorId: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/doctors`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (editingService) {
      setFormData({
        name: editingService.name,
        description: editingService.description,
        cost: editingService.cost,
        duration: editingService.duration,
        doctorId: editingService.doctorId || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        cost: 0,
        duration: 0,
        doctorId: "",
      });
    }
  }, [editingService]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editingService) {
        updateService(editingService._id, formData);
        toast.success("Service updated successfully");
      } else {
        addService(formData);
        toast.success("Service added successfully");
      }
      setShowForm(false);
      setEditingService(null);
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Service
        </button>
      </div>
      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingService ? "Edit Service" : "Add New Service"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Doctors
              </label>
              <div className="space-y-2">
                {doctors.map((doctor) => (
                  <div key={doctor._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`doctor-${doctor._id}`}
                      name="doctorId"
                      value={doctor._id}
                      checked={formData.doctorId.includes(doctor._id)}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          doctorId: e.target.checked
                            ? [...formData.doctorId, doctor._id]
                            : formData.doctorId.filter(
                                (id) => id !== doctor._id
                              ),
                        })
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor={`doctor-${doctor._id}`}
                      className="text-sm font-medium text-gray-700"
                    >
                      {`${doctor.name} - ${doctor.specialization}`}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cost ($)
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                {editingService ? "Update" : "Add"} Service
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const relatedDoctors = doctors.filter((doc) =>
              service.doctorId.includes(doc._id)
            );
            return (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <h3 className="text-base">
                  {relatedDoctors.length > 0 ? (
                    relatedDoctors.map((doctor, index) => (
                      <div key={doctor._id}>
                        {index + 1}
                        {"\u00A0".repeat(5)}
                        {doctor.name}
                      </div>
                    ))
                  ) : (
                    <span>No associated doctors</span>
                  )}
                </h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Cost</p>
                    <p className="font-semibold">${service.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{service.duration} min</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteService(service._id);
                      toast.success("Service deleted successfully");
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
