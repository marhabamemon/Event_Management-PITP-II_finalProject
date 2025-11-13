// Simple validation functions
export const validateUser = (data) => {
  const errors = [];
  if (!data.name || data.name.length < 2) errors.push('Name must be at least 2 characters');
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) errors.push('Valid email required');
  if (!data.password || data.password.length < 6) errors.push('Password must be at least 6 characters');
  return errors;
};

export const validateEvent = (data) => {
  const errors = [];
  if (!data.title) errors.push('Title required');
  if (!data.description) errors.push('Description required');
  if (!data.category) errors.push('Category required');
  if (!data.location) errors.push('Location required');
  if (!data.startDate || new Date(data.startDate) < new Date()) errors.push('Valid future start date required');
  if (!data.endDate || new Date(data.endDate) <= new Date(data.startDate)) errors.push('Valid end date required');
  if (!data.capacity || data.capacity < 1) errors.push('Capacity must be at least 1');
  return errors;
};