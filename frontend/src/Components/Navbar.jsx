import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import navImg from  "../assets/navImg.png" ; 
import axios from 'axios';
import { BACKEND_URL } from '../url';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://profile-app-backend.onrender.com' || BACKEND_URL ; 


function Navbar( {profileImage} ) {


    // const [profileImage, setProfileImage] = useState('') ; 


    // async function getProfileImage()
    // {
    //     try //     {
    //         const response = await axios.get(`${BACKEND_URL}/api/profile`, { withCredentials: true });
    //         const { profilePicture } = response.data.data;
    //         setProfileImage(`${BACKEND_URL}${profilePicture}`) } 
    //     catch (error) {
    //         console.error('Error fetching profile image:', error);
    //       }
    //



    return ( 

        <nav>
            <div className='navbar'>

               <NavLink className='nav-title' to="">Acme Co</NavLink>


                <div className='nav-links'>
                  <NavLink className="nav-link" to="/">Home</NavLink>
                  <NavLink className="nav-link" to="/book">Book</NavLink>
                  <NavLink className="nav-link" to="">Guests</NavLink>
                  <NavLink className="nav-link" to="/events">Events</NavLink>
                  <NavLink className="nav-link" to="">Services</NavLink>
                  <NavLink className="nav-link" to="/support">Support</NavLink>
                  <NavLink ><div className='nav-img-container'><img className='nav-img' src={profileImage} alt="nav-img"/></div></NavLink>

                  

                </div>


            </div>
        </nav>
    );
}

export default Navbar;