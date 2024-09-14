
import React, { useEffect, useState } from 'react';
import { CiCamera } from "react-icons/ci";
import axios from "axios";
import { toast } from 'react-toastify'; 
import { BACKEND_URL } from '../url';

axios.defaults.withCredentials = true;
axios.defaults.baseURL =  'https://profile-app-backend.onrender.com' || BACKEND_URL  ; 

// 'https://profile-app-backend.onrender.com' || BACKEND_URL || 



function ProfileForm( {setProfileImage} )
{

    
    const [formData, setFormData] = useState({  
        firstName: "", 
        lastName: "", 
        email: "", 
        address: "" ,
        profilePicture: null , 
    }); 


    

    function changeHandler(event)
    {
        if (event.target.name === "profilePicture") {
            setFormData((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.files[0],
            }));


        

        
        //     const formDataToSend = new FormData();

        //     const profileData = {
        //         firstName: formData.firstName,
        //         lastName: formData.lastName,
        //         email: formData.email,
        //         address: formData.address
        //       };
    
    
        //     formDataToSend.append('profileData', JSON.stringify(profileData));
    
        //     if (formData.profilePicture) {
        //         formDataToSend.append('profilePicture', formData.profilePicture);
        //     }
    

        //   axios.post( `https://profile-app-backend.onrender.com/api/profile/save`, formDataToSend , {
        //         withCredentials: true,
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     })
        //     .then(  (res) => 
        //            {
        //             console.log("image uploaded") ; 
        //             console.log(res);
        //             // toast.success("Saved Successfully !");
    
        //             if ( res.data.data.profilePicture ) {
        //                 console.log("setting new profile image") ; 
        //                 setProfileImage( `${res.data.data.profilePicture}` ) ; 
        //               }

        //               getUserData() ; 


        //            })
        //           .catch(  (error) =>  {
        //             console.error(error) ; 
        //             console.log(error.message);
        //             // toast.error("Error !")
        //           });

        } 
        
        else {
            setFormData((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value ,
            }));
        }


        console.log(formData) ;
    }






    async function getUserData()
    {

       console.log("Fetching user profile ") ; 

       try{

        const response = await axios.get( "https://profile-app-backend.onrender.com/api/profile", { withCredentials: true });
        const responseUserData = response.data.data; 
        
        console.log(responseUserData);

        // Set form data with fetched user data
        setFormData({
            firstName: responseUserData.firstName,
            lastName: responseUserData.lastName,
            email: responseUserData.email,
            address: responseUserData.address,
            profilePicture: responseUserData.profilePicture 
        });

        // Update profile image in the parent component if necessary
        if (responseUserData.profilePicture) {
            setProfileImage(`${responseUserData.profilePicture}`);
        }

        console.log("FORM DATA after setting state");
        console.log(formData);

        setFormData(responseUserData) ; 
    }
        catch(error) {
            console.log("Error while fetching user profile data") ; 
            console.log(error) ;
            console.log(error.message)  ;
        }
    }





    async function submitHandler(event)
    {
        event.preventDefault(); 

        //setting image manually at frotend
        // setProfileImage(event.target.files[0]) ; 

        if (!formData.firstName || !formData.lastName || !formData.email) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const formDataToSend = new FormData();

        const profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address: formData.address
          };


        formDataToSend.append('profileData', JSON.stringify(profileData));

        if (formData.profilePicture) {
            formDataToSend.append('profilePicture', formData.profilePicture);
        }


        try {

            console.log(formDataToSend) ; 

        // Send as FormData, not JSON
        axios.post( `https://profile-app-backend.onrender.com/api/profile/save`, formDataToSend, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
              .then(  (res) => 
               {
                console.log(res);
                toast.success("Saved Successfully !");

                if (res.data.data.profilePicture) {
                    console.log("setting new profile image") ; 
                    setProfileImage( `${res.data.data.profilePicture}` ) ; 
                    // setProfileImage(URL.createObjectURL(event.target.files[0]));
                    // `${BACKEND_URL}${res.data.data.profilePicture}`
                  }
               })
              .catch(  (error) =>  {
                console.log(error);
                toast.error("Error !")
              });


            
             
        }

        catch (error) {
            console.log(error);
            console.error(error) 
        }
    }



    useEffect(() => {
        console.log(formData) ; 
        getUserData();
        // setFormData(formData) ;
        return () => {
        }
    } , [] ); 



    function imgBtnHandler(event) {
        event.preventDefault();
        document.getElementById('profilePicture').click();
    }



    function resetHandler ( event ) { 

        event.preventDefault() ; 

        axios.post( `https://profile-app-backend.onrender.com/api/profile/reset`,  {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
              .then(  (res) => 
               {
                console.log(res);
                toast.success("Reset Successful !");
                getUserData() ; 

                // if (res.data.data.profilePicture) {
                //     console.log("setting new profile image") ; 
                //     setProfileImage( `${res.data.data.profilePicture}` ) ; 
                //     // setProfileImage(URL.createObjectURL(event.target.files[0]));
                //     // `${BACKEND_URL}${res.data.data.profilePicture}`
                //   }
               })
              .catch(  (error) =>  {
                console.log(error);
                toast.error("Error !")
              });



    }



    const [selectedFile, setSelectedFile] = useState(null);



    const handleFileChange = async (event) => {

        const file = event.target.files[0];
        if (!file) {
            return;
        }

        setSelectedFile(file);
        
        const formDataToSend = new FormData();

        const profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            address: formData.address
          };


        formDataToSend.append('profileData', JSON.stringify(profileData));

        // if (formData.profilePicture) {
        //     formDataToSend.append('profilePicture', formData.profilePicture);
        // }
        
        formDataToSend.append('profilePicture', file);



        try {
            const response = await axios.post('/api/profile/save', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.data.profilePicture) {
                setProfileImage(response.data.data.profilePicture);
                console.log('Image uploaded successfully!');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            console.log('Error uploading image!');
            toast.error('Please fill all  details before uploading') ; 
        }
    };













    return (
        <div>
            <form className='profile-form'>
                <button onClick={imgBtnHandler} className='profile-photo-btn'>
                    <CiCamera/>
                    <span>Add a profile photo</span>
                </button>
                <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                
                <div className='profile-form-container'>
                    <div className='field-container' id="name-container">
                        <div>
                            <label htmlFor="first-name" className='field-label'>First Name</label>
                            <input type="text" value={formData.firstName} onChange={changeHandler} name="firstName" id="first-name" className="input-field"></input>
                        </div>
                        <div>
                            <label htmlFor="last-name" className='field-label'>Last Name</label>
                            <input type="text" value={formData.lastName} onChange={changeHandler} name="lastName" id="last-name" className="input-field"></input>
                        </div>
                    </div>
                    <div className='field-container'>
                        <label htmlFor="email" className='field-label'>Email</label>
                        <input type="email" value={formData.email} onChange={changeHandler} name="email" id="email" className="input-field"></input>
                    </div>
                    <div className='field-container'>
                        <label htmlFor="address" className='field-label'>Address</label>
                        <textarea type='text' onChange={changeHandler} value={formData.address} name="address" id="address"  className="input-field"></textarea>
                    </div>
                </div>
                <div className='btn-container'>
                    <button onClick={resetHandler} className='reset-btn'>Reset</button>
                    <button onClick={submitHandler} className='save-btn'>Save</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileForm;
