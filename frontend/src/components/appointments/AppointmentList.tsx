import React from "react";
import { useData } from "../../contexts/DataContext";
import { Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
export function AppointmentList({ onEdit }: { onEdit: (id: string) => void }) {
  const { appointments, patients, deleteAppointment } = useData();
  console.log(patients[0]);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {appointments.map((appointment) => {
            const patient = patients.find(
              (p) => p._id === appointment.patientId
            );
            // appointments.forEach((appointment) => {
            //   const patient = patients.find(
            //     (p) => p._id === appointment.patientId
            //   );
            return (
              <tr key={appointment._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {patient?.name || "Unknown"}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(appointment.date), "MMM d, yyyy")}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(appointment._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteAppointment(appointment._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
