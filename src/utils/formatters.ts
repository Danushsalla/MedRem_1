export const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const getStatusClass = (status: string): string => {
  switch (status) {
    case 'onTime':
      return 'status-on-time';
    case 'missed':
      return 'status-missed';
    case 'empty':
      return 'status-empty';
    default:
      return '';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'onTime':
      return 'On Time';
    case 'missed':
      return 'Missed';
    case 'empty':
      return 'Empty';
    default:
      return status;
  }
};