import { useEffect, useState } from "react";
import "../Dogs/Dogs.css";
import { getGreeting } from "../apiManager";
import { getWalkerCities, getWalkers } from "../Services/WalkerService";
import { getCities } from "../Services/DogService";

export const Walkers = () => {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [walkersInCity, setWalkerInCity] = useState([]);
  const [walkers, setWalkers] = useState([]);

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getWalkers().then((wArray) => {
      setWalkers(wArray);
    });
  }, []);

  useEffect(() => {
    getCities().then((cArray) => {
      setCities(cArray);
    });
  }, []);

  useEffect(() => {
    getWalkerCities().then((wCArray) => {
      setWalkerInCity(wCArray);
      console.log(wCArray);
    });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const foundWalkers = walkersInCity
        .filter((wC) => wC.cityId == selectedCity)
        .map((wC) => wC.walker);
      setFilteredWalkers(foundWalkers);
      console.log(foundWalkers);
    } else {
      setFilteredWalkers(walkers);
    }
  }, [selectedCity, walkers]);

  return (
    <div>
      <p>{greeting.message}</p>
      <div className="list-container">
        <div className="city-search">
          <select
            onChange={(event) => {
              setSelectedCity(event.target.value);
              console.log(event.target.value);
            }}
            value={selectedCity}
            className="city-select"
          >
            <option value="">Cities</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="card-list">
        {filteredWalkers.map((walker, index) => (
          <div key={index} className="card">
            <h3>{walker.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
