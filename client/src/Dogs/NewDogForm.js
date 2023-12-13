import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addNewDog, getCities } from "../Services/DogService";

export const NewDogForm = () => {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [newDog, setNewDog] = useState({
    name: "",
    walkerId: null,
    cityId: 0,
  });

  useEffect(() => {
    getCities().then((cArray) => {
      setCities(cArray);
    });
  }, []);

  const handleInputChange = (event) => {
    const stateCopy = { ...newDog };
    stateCopy[event.target.name] = event.target.value;
    setNewDog(stateCopy);
  };

  const handleSave = (event) => {
    if (selectedCity && newDog.name) {
      event.preventDefault();
      console.log("Clicked");

      addNewDog(newDog).then((newDog) => {
        navigate(`/details/${newDog.id}`);
        console.log('new dog', newDog)
      });
    }
  };

  useEffect(() => {
    setNewDog({
      ...newDog,
      cityId: parseInt(selectedCity),
    });
  }, [selectedCity]);

  return (
    <form className="new-dog">
      <h2>New Dog</h2>
      <fieldset>
        <div className="radio">
          <p className="city-radio">City:</p>
          <div className="buttons">
            {cities.map((c) => (
              <label key={c.id}>
                <input
                  type="radio"
                  name="selectedPosition"
                  value={c.id}
                  checked={selectedCity == c.id}
                  onChange={(event) => setSelectedCity(event.target.value)}
                />
                {c.name}
              </label>
            ))}
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={newDog.name}
            onChange={handleInputChange}
            required
            className="form-control"
            name="name"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" onClick={handleSave}>
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
};
