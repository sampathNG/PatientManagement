import React, { createContext, useContext } from "react";
import { usePatients } from "./hooks/usePatients";
import { useAppointments } from "./hooks/useAppointments";
import { useServices } from "./hooks/useServices";
import { useConsultations } from "./hooks/useConsultations";
import type { DataContextType } from "./types";
const DataContext = createContext<DataContextType | undefined>(undefined);
export function DataProvider({ children }: { children: React.ReactNode }) {
  const patients = usePatients();
  const appointments = useAppointments();
  const services = useServices();
  const consultations = useConsultations();
  return (
    <DataContext.Provider
      value={{
        ...patients,
        ...appointments,
        ...services,
        ...consultations,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
