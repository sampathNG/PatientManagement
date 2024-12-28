import { format, parseISO } from 'date-fns';

export const formatDate = (date: string) => {
  return format(parseISO(date), 'MMM d, yyyy');
};

export const formatTime = (time: string) => {
  return format(parseISO(`2000-01-01T${time}`), 'h:mm a');
};