import { useEffect, useState } from "react";
import { getDogs } from "../Services/DogService";
import "./Dogs.css";
import { Link } from "react-router-dom";

export const Home = () => {
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
           <Link to={`/details/${d.id}`}>
           <h3>{d.name}</h3>
            </Link> 
          </div>
        ))}
      </div>
    </div>
  );
};
