import { useEffect, useState } from "react";
import "../Dogs/Dogs.css";
import { getWalkerCities, getWalkers } from "../Services/WalkerService";
import { assignWalkerToDog, getCities, getDogs } from "../Services/DogService";
import { useNavigate } from "react-router-dom";

export const Walkers = () => {
  const navigate = useNavigate()
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [walkersInCity, setWalkerInCity] = useState([]);
  const [walkers, setWalkers] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [availableDogsInCity, setAvailableDogsInCity] = useState([]);
  const [selectedWalker, setSelectedWalker] = useState(null);
  

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
    getDogs().then((dArray) => {
      setDogs(dArray);
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


  useEffect(() => {
    
    
  }, [dogs, selectedCity]);
  
  const showAvailableDogs = (index) => {
    const dogsInCityAndNotAssigned = dogs.filter(
      (d) => d.walkerId == null && d.cityId == selectedCity && d.walker != index
    );
    console.log("available dogs in city", dogsInCityAndNotAssigned);
    setAvailableDogsInCity(dogsInCityAndNotAssigned);
    setSelectedWalker(index);
  };
  
  const handleDogAssignment = (updatedDog) => {
    const gettingAssigned = {
      id: updatedDog.id,
      name: updatedDog.name,
      cityId: updatedDog.cityId,
      walkerId: selectedWalker
    }
    assignWalkerToDog(gettingAssigned).then((res) => {
     console.log('assigned dog', gettingAssigned)
      navigate(`/details/${updatedDog.id}`)
    })
  }


  return (
    <div>
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

      <div>
        <div className="card-list">
          {filteredWalkers.map((w) => (
            <div key={w.id} className="card">
              <h3>{w.name}</h3>
              <div>
                <button onClick={() => showAvailableDogs(w.id)}>Add Dog</button>
              </div>
              {/* Display the available dog names */}
              {selectedWalker == w.id && (
                <ul>
                  {availableDogsInCity.map((dC) => (
                    <li key={dC.id} onClick={() => handleDogAssignment(dC)}>{dC.name}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
