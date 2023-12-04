import { useEffect, useState } from "react";
import { getDogsById } from "../Services/DogService";
import { useParams } from "react-router-dom";

export const DogDetails = () => {
  const [dog, setDog] = useState({});
  const { dogId } = useParams();

  useEffect(() => {
    getDogsById(dogId).then((data) => {
      setDog(data);
    });
  }, [dogId]);

  return (
    <div>
      <header className="head">{dog?.name}</header>
      <div>
        {dog?.walker
          ? `Currently being walked by ${dog?.walker?.name} in ${dog?.city?.name}`
          : "Currently does not have a walker assigned"}
      </div>
    </div>
  );
};
