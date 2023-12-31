import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Home } from "./Dogs/Home";
import { DogDetails } from "./Dogs/DogDetails";
import { NewDogForm } from "./Dogs/NewDogForm";
import { Walkers } from "./Walkers/Walkers";
import { Cities } from "./Cities/Cities";
import { WalkerDetails } from "./Walkers/WalkerDetails";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/details">
          <Route path=":dogId" element={<DogDetails />} />
        </Route>
        <Route path="/newdog" element={<NewDogForm />} />
      </Route>
      <Route path="/walkers" element ={<App />}>
      <Route index element ={< Walkers />} />
      
        <Route path=":walkerId" element={<WalkerDetails />} />

      </Route>
      <Route path="/cities" element={<App />}>
        <Route index element={<Cities />}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
