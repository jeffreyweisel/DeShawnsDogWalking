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

// Add dog
export const addNewDog = (newDog) => {
  return fetch("/api/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  }).then((res) => res.json());
};

// Get all cities
export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
};
