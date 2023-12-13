import { useEffect, useState } from "react";
import "../Dogs/Dogs.css";
import {
  deleteWalker,
  getWalkerCities,
  getWalkers,
} from "../Services/WalkerService";
import { assignWalkerToDog, getCities, getDogs } from "../Services/DogService";
import { Link, useNavigate } from "react-router-dom";

export const Walkers = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [walkersInCity, setWalkerInCity] = useState([]);
  const [walkers, setWalkers] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [availableDogsInCity, setAvailableDogsInCity] = useState([]);
  const [selectedWalker, setSelectedWalker] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getWalkers().then((wArray) => {
      setWalkers(wArray);
    });
  };

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
  }, [walkers]);

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
  }, [selectedCity, walkers, walkersInCity]);

  useEffect(() => {}, [walkers, selectedCity]);

  const showAvailableDogs = (index) => {
    const dogsInCityAndNotAssigned = dogs.filter(
      (d) =>
        d.walkerId == null && d.cityId == selectedCity 
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
      walkerId: selectedWalker,
    };
    assignWalkerToDog(gettingAssigned).then((res) => {
      console.log("assigned dog", gettingAssigned);
      navigate(`/details/${updatedDog.id}`);
    });
  };

  const handleDelete = async (walker) => {
    try {
      await deleteWalker(walker.id);
      // Instead of calling getData immediately, update the state directly
      setWalkers((prevWalkers) => prevWalkers.filter((w) => w.id !== walker.id));
    } catch (error) {
      console.error("Error deleting walker:", error);
    }
  };

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
          {filteredWalkers
            .filter((w) => w && w.id)
            .map((w) => (
              <div key={w.id} className="card">
             <Link to={`/walkers/${w.id}`}>
              <h3>{w.name}</h3>
            </Link>
                
                  <div>
                    <button
                      onClick={() => {
                        handleDelete(w);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                
                {selectedCity !== "" && (
                  <div>
                    <button onClick={() => showAvailableDogs(w.id)}>
                      Add Dog
                    </button>
                  </div>
                )}
                {selectedWalker == w.id && (
                  <ul>
                    {availableDogsInCity.map((dC) => (
                      <li key={dC.id} onClick={() => handleDogAssignment(dC)}>
                        {dC?.name}
                      </li>
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
