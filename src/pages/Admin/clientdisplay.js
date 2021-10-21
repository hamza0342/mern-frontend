import React, { useState, useEffect } from 'react';
import { getclients } from "./adminapi";
import RenderUser from './admin-components/renderData';
import { isAuthenticated } from '../../authentication';

const ClientDisplay = () => {

    // console.log("dssasldaskjhkfh")
    const [clients, setClients] = useState([]);
    const token = isAuthenticated().token
    // console.log(clients)
    
    useEffect(() => {
        // console.log("data")
        getclients(token).then((data) => {
            // console.log("data")
            // console.log(data.client)
            if (data.error) {
                console.log(data.error);
            } else {
                setClients(data.client)
            }
        });
    }, []);

    return (
        <div>
            <div>
                <p className="page-title">Clients</p>
                <RenderUser props={clients}  />
            </div>
        </div>
    );
}

export default ClientDisplay;