// Get all dogs
export const getDogs = async () => {
    const res = await fetch("/api/dogs");
    return res.json();
  };
  
// Get dogs by Id
export const getDogsById = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  return res.json();
};