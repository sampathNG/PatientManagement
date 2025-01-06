import React from "react";
import { Users, Calendar, Activity, DollarSign } from "lucide-react";
import { StatCard } from "../components/stats/StatCard";
import { AppointmentChart } from "../components/charts/AppointmentChart";
import { RecentPatients } from "../components/dashboard/RecentPatients";
import { useData } from "../contexts/DataContext";
export default function Dashboard() {
  const { patients, appointments, services } = useData();
  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Appointments",
      value: appointments.length,
      icon: Calendar,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Services",
      value: services.length,
      icon: Activity,
    },
    {
      title: "Revenue",
      value: `$${services.reduce((acc, service) => acc + service.cost, 0)}`,
      icon: DollarSign,
      trend: { value: 5, isPositive: true },
    },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppointmentChart />
        <RecentPatients />
      </div>
    </div>
  );
}
