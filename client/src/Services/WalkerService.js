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