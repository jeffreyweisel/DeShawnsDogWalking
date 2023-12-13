import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editWalkerCities, getWalkerCities, getWalkersById } from "../Services/WalkerService";
import "../Dogs/Dogs.css"
import { getCities } from "../Services/DogService";

export const WalkerDetails = () => {
  const [walker, setWalker] = useState({});
  const [walkerCities, setWalkerCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [newName, setNewName] = useState("");
  const { walkerId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    getWalkersById(walkerId).then((data) => {
      console.log('walker', data);
      setWalker(data);
      setNewName(data.name);
    });
  }, [walkerId]);

  useEffect(() => {
    getWalkerCities().then((data) => {
      console.log('walker cities', data);
      setWalkerCities(data);
    });
  }, []);

  useEffect(() => {
    getCities().then((data) => {
      console.log('cities', data);
      setCities(data);
    });
  }, []);

  // Find all cities associated with the walker
  const walkerCityIds = walkerCities
    .filter((wc) => wc.walkerId === walker.id)
    .map((wc) => wc.cityId);
  console.log('walkercity ids', walkerCityIds);

  const handleCityChange = (cityId) => {
    setWalkerCities((prevWalkerCities) => {
      const cityExists = prevWalkerCities.some(
        (wc) => wc.cityId === cityId && wc.walkerId === walker.id
      );
   
      if (cityExists) {
        // If the city already exists in the list, remove it
        return prevWalkerCities.filter(
          (wc) => !(wc.cityId === cityId && wc.walkerId === walker.id)
        );
      } else {
        // If the city doesn't exist in the list, add it
        return [...prevWalkerCities, { walkerId: walker.id, cityId }];
      }
    });
   };
   

   const handleSave = () => {
    // Construct the updatedWalker object with the changes
    const updatedWalker = {
      id: walker.id,
      name: newName,
      cities: walkerCities
        .filter((wc) => wc.walkerId === walker.id)
        .map((wc) => ({ id: wc.cityId })),
    };
  
    console.log('updated walker', updatedWalker);
  
    editWalkerCities(updatedWalker)
      .then(() => {
        navigate('/walkers');
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };
  
  return (
    <div>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <div>
        <h3>Cities:</h3>
        {cities.map((city) => (
          <div key={city.id}>
            <input
              type="checkbox"
              id={city.id}
              value={city.id}
              checked={walkerCityIds.includes(city.id)}
              onChange={() => handleCityChange(city.id)}
            />
            <label>{city.name}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};


  
  