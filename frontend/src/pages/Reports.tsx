import React from 'react';
import { useData } from '../contexts/DataContext';
import { format } from 'date-fns';

export default function Reports() {
  const { appointments, patients, services } = useData();

  const totalRevenue = appointments
    .filter(app => app.status === 'completed')
    .reduce((acc, app) => {
      const service = services.find(s => s.id === app.doctorId);
      return acc + (service?.cost || 0);
    }, 0);

  const appointmentsByStatus = {
    scheduled: appointments.filter(app => app.status === 'scheduled').length,
    completed: appointments.filter(app => app.status === 'completed').length,
    cancelled: appointments.filter(app => app.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue</h3>
          <p className="text-3xl font-bold text-blue-600">${totalRevenue}</p>
          <p className="text-sm text-gray-600 mt-2">Total Revenue from Completed Appointments</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Patients</h3>
          <p className="text-3xl font-bold text-blue-600">{patients.length}</p>
          <p className="text-sm text-gray-600 mt-2">Total Registered Patients</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Appointments</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled</span>
              <span className="font-semibold">{appointmentsByStatus.scheduled}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="font-semibold">{appointmentsByStatus.completed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cancelled</span>
              <span className="font-semibold">{appointmentsByStatus.cancelled}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {appointments.slice(0, 5).map(appointment => {
            const patient = patients.find(p => p.id === appointment.patientId);
            return (
              <div key={appointment.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{patient?.name}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(appointment.date), 'MMM d, yyyy')} at {appointment.time}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}