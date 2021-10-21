import React from 'react';
import Projectdisplay  from "./projectdisplay"
import '../../scss/client.scss';
import File from './file';
import MainLayout from './client-components/Layout';

const ClientDashboard = () => {
    return <MainLayout component={<Projectdisplay />} file={<File></File>}  />
}

export default ClientDashboard;