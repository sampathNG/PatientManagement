import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Medicine, Consultation } from "../../types";
import { useData } from "../../contexts/DataContext";
interface ConsultationFormProps {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  onSubmit: (data: Omit<Consultation, "id">) => void;
  onCancel: () => void;
}
export function ConsultationForm({
  appointmentId,
  patientId,
  doctorId,
  onSubmit,
  onCancel,
}: ConsultationFormProps) {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [medicines, setMedicines] = useState<Omit<Medicine, "id">[]>([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const handleAddSymptom = () => {
    if (currentSymptom.trim()) {
      setSymptoms([...symptoms, currentSymptom.trim()]);
      setCurrentSymptom("");
    }
  };
  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      appointmentId,
      patientId,
      doctorId,
      date: new Date().toISOString(),
      symptoms,
      diagnosis,
      notes,
      medicines: medicines.map((m) => ({
        ...m,
        id: Math.random().toString(36).substr(2, 9),
      })),
      followUpDate: followUpDate || undefined,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Symptoms
        </label>
        <div className="mt-1 flex space-x-2">
          <input
            type="text"
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Add symptom"
          />
          <button
            type="button"
            onClick={handleAddSymptom}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {symptoms.map((symptom, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-700"
            >
              {symptom}
              <button
                type="button"
                onClick={() =>
                  setSymptoms(symptoms.filter((_, i) => i !== index))
                }
                className="ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Diagnosis
        </label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Medicines
          </label>
          <button
            type="button"
            onClick={handleAddMedicine}
            className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Medicine
          </button>
        </div>
        <div className="space-y-4">
          {medicines.map((medicine, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={medicine.name}
                onChange={(e) => {
                  const newMedicines = [...medicines];
                  newMedicines[index].name = e.target.value;
                  setMedicines(newMedicines);
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Medicine name"
                required
              />
              <input
                type="text"
                value={medicine.dosage}
                onChange={(e) => {
                  const newMedicines = [...medicines];
                  newMedicines[index].dosage = e.target.value;
                  setMedicines(newMedicines);
                }}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Dosage"
                required
              />
              <input
                type="text"
                value={medicine.frequency}
                onChange={(e) => {
                  const newMedicines = [...medicines];
                  newMedicines[index].frequency = e.target.value;
                  setMedicines(newMedicines);
                }}
                className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Frequency"
                required
              />
              <input
                type="text"
                value={medicine.duration}
                onChange={(e) => {
                  const newMedicines = [...medicines];
                  newMedicines[index].duration = e.target.value;
                  setMedicines(newMedicines);
                }}
                className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Duration"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setMedicines(medicines.filter((_, i) => i !== index))
                }
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Follow-up Date
        </label>
        <input
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          Save Consultation
        </button>
      </div>
    </form>
  );
}
