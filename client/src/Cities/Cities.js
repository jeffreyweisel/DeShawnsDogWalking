import { useEffect, useState } from "react";
import { addNewCity, getCities } from "../Services/DogService";
import "../Dogs/Dogs.css";

export const Cities = () => {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("");

  const getData = () => {
    getCities().then((cArray) => {
      setCities(cArray);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSave = () => {
    const newCity = { name: input };
    addNewCity(newCity).then((newCity) => {
      console.log(newCity);
      getData();
    });
  };

  return (
    <div className="list-container">
      <div className="city-add">
        <input
          onChange={handleInputChange}
          type="text"
          placeholder="Add City"
          className="player-input"
        />
        <button onClick={handleSave}>Add</button>
      </div>
      <div className="card-list">
        {cities.map((c) => (
          <div key={c.id} className="card">
            <h3>{c.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
