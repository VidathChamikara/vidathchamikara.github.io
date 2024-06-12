// CustomerPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function DeliveryPersonPage() {
    const location = useLocation();
   
    // Provide a default value for location to avoid errors
    const { user } = location ? location.state || {} : {};

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome DELIVERY_PERSON {user.id}</h1>
                    <p>Email: {user.sub}</p>
                </div>
            ) : (
                <div>
                    <h1>Error: User information not found</h1>
                    <p>Please navigate from the login page.</p>
                </div>
            )}
        </div>
    );
}

export default DeliveryPersonPage;
