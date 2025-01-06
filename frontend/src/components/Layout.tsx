import React from "react";
import { Outlet, Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Users,
  Calendar,
  Activity,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
} from "lucide-react";
function Layout() {
  const { user, loading, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  const navigation = [
    { name: "Dashboard", href: "/", icon: Activity },
    { name: "Doctors", href: "/doctors", icon: Stethoscope },
    { name: "Patients", href: "/patients", icon: Users },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "Services", href: "/services", icon: Settings },
    { name: "Reports", href: "/reports", icon: FileText },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">HMS</h1>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </nav>
      </div>
      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b lg:hidden">
          <button
            className="text-gray-500 hover:text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Layout;
