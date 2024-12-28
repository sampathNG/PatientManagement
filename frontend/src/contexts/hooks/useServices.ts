import { useState } from 'react';
import type { Service } from '../../types';

const DEMO_SERVICES: Service[] = [
  {
    id: '1',
    name: 'General Consultation',
    description: 'Regular medical consultation',
    cost: 100,
    duration: 30
  }
];

export function useServices() {
  const [services, setServices] = useState<Service[]>(DEMO_SERVICES);

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: Math.random().toString(36).substr(2, 9)
    };
    setServices([...services, newService]);
  };

  const updateService = (id: string, serviceUpdate: Partial<Service>) => {
    setServices(services.map(s => s.id === id ? { ...s, ...serviceUpdate } : s));
  };

  const deleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  return { services, addService, updateService, deleteService };
}