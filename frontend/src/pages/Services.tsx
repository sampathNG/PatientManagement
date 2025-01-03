import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useData } from "../contexts/DataContext";
import { Service } from "../types";
import axios from "axios";
import toast from "react-hot-toast";
export default function Services() {
  const { services, addService, updateService, deleteService } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const formData = new FormData(form);
  //   const serviceData = {
  //     name: formData.get("name") as string,
  //     description: formData.get("description") as string,
  //     cost: Number(formData.get("cost")),
  //     duration: Number(formData.get("duration")),
  //   };
  //   try {
  //     if (editingService) {
  //       updateService(editingService._id, serviceData);
  //       toast.success("Service updated successfully");
  //     } else {
  //       addService(serviceData);
  //       toast.success("Service added successfully");
  //     }
  //     setShowForm(false);
  //     setEditingService(null);
  //   } catch (error) {
  //     toast.error("An error occurred");
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const serviceData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      cost: Number(formData.get("cost")),
      duration: Number(formData.get("duration")),
    };
    try {
      if (editingService) {
        updateService(editingService._id, serviceData);
        toast.success("Service updated successfully");
      } else {
        addService(serviceData);
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
                defaultValue={editingService?.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={editingService?.description}
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
                defaultValue={editingService?.cost}
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
                defaultValue={editingService?.duration}
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
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-lg font-semibold">{service.name}</h3>
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
          ))}
        </div>
      )}
    </div>
  );
}
