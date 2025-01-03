import React from "react";
import { useData } from "../../contexts/DataContext";
import { format } from "date-fns";
export function RecentPatients() {
  const { patients } = useData();
  const recentPatients = patients
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Patients</h3>
      <div className="space-y-4">
        {recentPatients.map((patient) => (
          <div key={patient._id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{patient.name}</p>
              <p className="text-sm text-gray-600">{patient.email}</p>
            </div>
            <p className="text-sm text-gray-500">
              {format(new Date(patient.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
