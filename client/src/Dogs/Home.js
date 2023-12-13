import { useEffect, useState } from "react";
import { deleteDog, getDogs } from "../Services/DogService";
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

  const handleDelete = (dog) => {
    deleteDog(dog.id)
      .then(() => {
        // Update by removing the deleted dog from the state
        setDogs((notDeletedDogs) => notDeletedDogs.filter((d) => d.id !== dog.id));
      })
  };

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
            <button
            onClick={() => {handleDelete(d)}}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
