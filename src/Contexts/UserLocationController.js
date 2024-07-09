// UserLocationController.js
import React, { useEffect, useState } from 'react';
import UserLocationModel from '../Actions/UserLocationModel';
import HeaderView from '../View/HeaderView';

const UserLocationController = ({ onUpdateUserLocation }) => {
    const [error, setError] = useState(null);
    const [LocationData, setUserLocationData] = useState(null);
    const userLocationModel = new UserLocationModel();

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        const isLogin = sessionStorage.getItem('isLogin');

        if (isLogin === 'True' && token) {
            fetchUserLocation(token);
        } else {
            setError('Update location');
        }
    }, []);

    const fetchUserLocation = async (token) => {
        try {
            const LocationData = await userLocationModel.fetchUserLocation(token);
            console.log("userLocationData",LocationData);
            setUserLocationData(LocationData);
            onUpdateUserLocation(LocationData);
        } catch (error) {
            console.error("Error fetching user location:", error);
            setError('Cannot find user location');
        }
    };

    return <HeaderView
    LocationData={LocationData}
    isLogin={sessionStorage.getItem('isLogin') === 'True'}
    selectedLanguage="Eng" 
    handleLanguageChange={() => {}} // placeholder function
    handleLogout={() => {}} // placeholder function
/>;
};

export default UserLocationController;
