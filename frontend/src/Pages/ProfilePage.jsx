import { useState } from "react";
import Navbar from "../Components/Navbar";
import ProfileSection from "../Components/ProfileSection";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage()
{

    const [profileImage, setProfileImage] = useState('');


   return(

    <div>

        <Navbar profileImage={profileImage} ></Navbar>

        <ProfileSection setProfileImage={setProfileImage} ></ProfileSection>

        <ToastContainer />
        
    </div>
   )
}

export default ProfilePage ;