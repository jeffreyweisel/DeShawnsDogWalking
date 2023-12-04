import { useEffect, useState } from "react";
import { getDogs } from "../Services/DogService";
import "./Dogs.css";

export const DogList = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    getDogs().then((dArray) => {
      setDogs(dArray);
    });
  }, []);

  return (
    <div className="list-container">
      <div className="card-list">
        {dogs.map((d) => (
          <div key={d.id} className="card">
            <h3>{d.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
