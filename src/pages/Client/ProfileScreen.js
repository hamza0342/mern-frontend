import React from 'react';
import '../../scss/client.scss';
import MainLayout from './client-components/Layout';
import Profile from './profile';
import {isAuthenticated} from "../../authentication/index";


const ProfileScreen = () => {
    const url= isAuthenticated().client._id;
    console.log("URL", url);
    return <MainLayout component={ <Profile clientId={url} />} />
}

export default ProfileScreen;