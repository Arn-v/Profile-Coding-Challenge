
import React from 'react';
import ProfileForm from './ProfileForm';

function ProfileSection( {setProfileImage }) {
    return (
        <div className='profile-section'>

            <div className="profile-container">

                    <h2 className='profile-title'>My Profile</h2>

                  <ProfileForm setProfileImage={setProfileImage}> </ProfileForm>
                        
            </div>

            
            
        </div>
    );
}

export default ProfileSection;