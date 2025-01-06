import React, { useState, useEffect } from "react";
import { useData } from "../../contexts/DataContext";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
export function DoctorList({ onEdit }: { onEdit: (_id: string) => void }) {
  const { doctors, deleteDoctor } = useData();
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Specialization
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Experience
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctor.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {doctor.specialization}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {doctor.experience}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(doctor._id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
