import React, { useState } from "react";
import './Authenticate.css';

export default function Authenticate({ token }) {

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [userData, setUserData] = useState(null);

        const handleClick = async () => {
            console.log('Button Clicked');
            
            try {
                const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }  
                });
                const result = await response.json();
                
                if (response.ok) {
                    setSuccessMessage(result.message);
                    setUserData(result.data);
                } else {
                    throw new Error(result.message || 'Authentication Failed');
                }

            } catch (error) {
                setError(error.message);
            }
        };

    return ( 
        <div className='authenticate-container'>
            <h2>Authenticate</h2>
            {error && <p className='error'>{error}</p>}
            {successMessage && <p className='success'>{successMessage}</p>}
            {userData && <p>Welcome, {userData.username}!</p>}
            <button onClick={handleClick} className='authenticate-button'>Authenticate Token</button>
        </div>
    );
}