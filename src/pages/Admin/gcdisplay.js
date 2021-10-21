import React, {useState, useEffect} from 'react';
import {getGC, deleteGC} from "./adminapi";
import RenderUser from "./admin-components/renderData";

const GCDisplay= () => {
    const [gc, setGC]= useState([]);
    useEffect(() => {
        getGC().then((data) => {
            // console.log("data")
            // console.log(data)
            if (data.error) {
                console.log(data.error);
            } else {
                setGC(data.generalContractor)
            }
        });
    },[]);
  
    return(
        <div>
            <div>
                <p className="page-title">General Contributors</p>
                <RenderUser gc={gc} deleteuser={deleteGC} /> 
            </div>
            </div>
    );
}

export default GCDisplay;