import React,{useState, useEffect} from 'react';
import {useParams} from "react-router-dom"
import { Link } from "react-router-dom";
import read from './clientapi'
import { isAuthenticated } from "../../authentication/index";

function Profile({clientId}) {

    const [client, setClient] = useState("")
    

    useEffect(() => {
        const token = isAuthenticated().token
        read(clientId, token).then((data) =>{
            console.log(data)
            if(data.error){
                console.log(data.error);
            } else {
                console.log(data)
                setClient(data)
            }
        })


    },[])
    

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <h1 className="mt-5 mb-5">Profile</h1>
                    <p>Hello {client.name}</p>
                    <p>Email: {client.email}</p>
                    <p>Gender: {client.gender}</p>
                    <p>{`Joined : ${new Date(client.created).toDateString()}`}</p>
                </div>
                <div className="col-md-6">
                {
                    isAuthenticated().client && isAuthenticated().client._id == client._id &&(
                        <div className="d-inline-block mt-5">
                            <Link 
                                className="btn btn-raised btn-success mr-5"
                                to={`/client/dashboard/edit/${isAuthenticated().client._id}`}
                            >
                                Edit Profile
                            </Link>
                        </div>
                    )
                }
                </div>
            </div>
            
        </>

        
    );
}

export default Profile;