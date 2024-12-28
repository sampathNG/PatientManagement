import React from 'react';
import { useData } from '../../contexts/DataContext';
import { formatDate } from '../../utils/date';

interface ConsultationHistoryProps {
  patientId: string;
}

export function ConsultationHistory({ patientId }: ConsultationHistoryProps) {
  const { getPatientHistory } = useData();
  const history = getPatientHistory(patientId);

  return (
    <div className="space-y-4">
      {history.map((consultation) => (
        <div key={consultation.id} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-medium">Consultation on {formatDate(consultation.date)}</h4>
              {consultation.followUpDate && (
                <p className="text-sm text-gray-600">
                  Follow-up: {formatDate(consultation.followUpDate)}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700">Symptoms</h5>
              <div className="mt-1 flex flex-wrap gap-2">
                {consultation.symptoms.map((symptom, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-md"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-700">Diagnosis</h5>
              <p className="mt-1 text-sm text-gray-600">{consultation.diagnosis}</p>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-700">Prescribed Medicines</h5>
              <div className="mt-1 space-y-2">
                {consultation.medicines.map((medicine) => (
                  <div key={medicine.id} className="text-sm">
                    <span className="font-medium">{medicine.name}</span>
                    <span className="text-gray-600">
                      {' - '}{medicine.dosage}, {medicine.frequency}, for {medicine.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {consultation.notes && (
              <div>
                <h5 className="text-sm font-medium text-gray-700">Notes</h5>
                <p className="mt-1 text-sm text-gray-600">{consultation.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {history.length === 0 && (
        <p className="text-gray-600 text-center py-4">No consultation history available.</p>
      )}
    </div>
  );
}