import React from "react";
import { useData } from "../../contexts/DataContext";
import { format } from "date-fns";
export function AppointmentChart() {
  const { appointments } = useData();
  const todayAppointments = appointments.filter(
    (app) => app.date === format(new Date(), "yyyy-MM-dd")
  ).length;
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Today's Appointments</h3>
      <div className="flex items-center justify-center h-40">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">
            {todayAppointments}
          </p>
          <p className="text-sm text-gray-600 mt-2">Scheduled Today</p>
        </div>
      </div>
    </div>
  );
}
