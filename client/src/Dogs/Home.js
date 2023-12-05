import { useEffect, useState } from "react";
import { getDogs } from "../Services/DogService";
import "./Dogs.css";
import { Link, useNavigate } from "react-router-dom";
import { getGreeting } from "../apiManager";

export const Home = () => {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  const [dogs, setDogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDogs().then((dArray) => {
      setDogs(dArray);
    });
  }, []);

  return (
    <div className="list-container">
      <p>{greeting.message}</p>
      <div className="newDog-btn">
        <button onClick={() => navigate("/newdog")}>Add Dog</button>
      </div>
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
