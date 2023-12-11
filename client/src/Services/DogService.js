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
export const addNewDog = async (newDog) => {
  const res = await fetch("/api/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  });
  return await res.json();
};

// Get all cities
export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
};

// Add city
export const addNewCity = async (newCity) => {
  const res = await fetch("/api/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCity),
  });
  return await res.json();
};

// Assign walker to dog
export const assignWalkerToDog = (updatedDog) => {
  return fetch(`/api/dogs/${updatedDog.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDog),
  }).then((response) => response.json());
};

 