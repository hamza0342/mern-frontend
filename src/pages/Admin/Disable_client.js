import React, { useState, useEffect } from 'react'
import {  getdisableclientssss } from './adminapi'
import Render_disable from './admin-components/Render_disable';
import { isAuthenticated } from '../../authentication';

function Disable_client() {
    const [clients, setClients] = useState([]);
    const token = isAuthenticated().token
    // console.log(clients)

    useEffect(() => {
        // console.log("data")
        getdisableclientssss(token).then((res) => {
            // console.log("resssssssssssssssssssssssss")
            // console.log(res)
            if (res.error) {
                console.log(res.error);
            } else {
                setClients(res.client)
            }
        });
    }, []);

    return (
        <div>
            <div>
                <p className="page-title">Clients</p>
                <Render_disable dis={clients} />
            </div>
        </div>
    )
}

export default Disable_client
