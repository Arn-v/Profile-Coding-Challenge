import React from "react";
import ProfilePage from "./Pages/ProfilePage";
import { Route , Routes } from "react-router-dom"; 
import "./index.css"
import "react-toastify/dist/ReactToastify.css" ; 

const App = () => {
  return(
    <div>

      <Routes>
         <Route path="/" element={ <ProfilePage/> } />
      </Routes>
      


    </div>
  ) 
};

export default App;
