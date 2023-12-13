// Get all walkers
export const getWalkers = async () => {
    const res = await fetch("/api/walkers");
    return res.json();
  };
// Get all walkerCities
export const getWalkerCities = async () => {
    const res = await fetch("/api/walkercities");
    return res.json();
  };

  //Delete walker
export const deleteWalker = (walkerId) => {
  return fetch(`/api/walkers/${walkerId}`, {
    method: "DELETE",
  });
};

// Get walkers by Id
export const getWalkersById = async (id) => {
  const res = await fetch(`/api/walkers/${id}`);
  return res.json();
};

// Edit walker cities
export const editWalkerCities = (updatedWalker) => {
  return fetch(`/api/walkers/${updatedWalker.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedWalker),
  }).then((response) => response.json());
};
