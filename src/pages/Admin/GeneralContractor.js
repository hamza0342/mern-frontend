import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../../authentication/index";
import { getSCByClient, assignTeamMember } from "./adminapi";
import { Button, Card, Skeleton, BackTop, Empty } from 'antd';
import '../../scss/gcdisplay.scss'
import { useParams } from "react-router-dom";

import swal from 'sweetalert';

const GeneralContractorDisplay = () => {
    

    const [gc, setGC] = useState([]);
    const [loading, setLoading] = useState(true);
    const { clientid } = useParams();
    const { projectId } = useParams();

    // console.log(projectId);
    // console.log(clientid);
    const [assign, setassign] = useState("Assign to project");


    useEffect(() => {
        const token = isAuthenticated().token;
       
        // console.log("Client ID", clientid);
        setLoading(true);
        getSCByClient(token, clientid).then((data) => {
            // console.log("data")
            // console.log(data)
            if (data.error) {
                console.log(data.error);
            } else {
                setGC(data)
                setLoading(false)
                // console.log("test", data)
            }
        });
    }, []);



    const clickEvent = (subId) => {
        alert(subId)
        const token = isAuthenticated().token;
        const subContractor = subId;
        
        assignTeamMember(token, projectId, subContractor)
            .then((data) => {

                try {
                    if(subContractor){
                        
                    }
                } catch (error) {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        // console.log("Assigned", data)
                        
                        //dispatch fresh list of team members
                        swal("Assigned!", "Subcontractor is assigned to this project!", "success");
                       
                        setTimeout(() => {
                            window.location.reload();
    
                        }, 3000)
                    }
    
                }
            
            })

    }
 
    const updateGc = gc => {
        setGC(gc)
    }


    const renderGC = (gcs) => {
        return (
            <div>

                <div className="table-responsive main">
                    <h5
                        style={{
                            textAlign: 'center',
                            backgroundColor: "#FEFFF2",
                            fontFamily: 'Montserrat',
                            textTransform: 'uppercase',
                            fontWeight: 800
                        }}
                    >
                        Assign Project to Sub-Contractor
                    </h5>
                    <table style={{tableLayout: "fixed"}} className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sr. No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th style={{width:"auto"}} scope="col">Action</th>
                            </tr>
                        </thead>

                        {gcs.length ? gcs.map((gc, i) => {
                            if (!gc.projects.includes(projectId))
                                return (

                                    <tbody>
                                        <tr>
                                            <th scope="row">{i + 1}</th>
                                            <td>{gc.name}</td>
                                            <td>{gc.email}</td>
                                            <td>{gc.phone}</td>

                                            <td><Button
                                                type="primary"
                                                size="middle"
                                                id="change_btn"
                                                onClick={() => clickEvent(gc._id)}
                                               
                                            >
                                                {assign}
                                            </Button></td>
                                        </tr>
                                    </tbody>
                                );
                        }) : <Empty />}

                    </table>
                </div>
            </div>
        );
    };



    if (loading) {
        return (
            <Skeleton active />
        )
    }
    return (
        <div>
            <div>
                {renderGC(gc)}
            </div>
    
            {/* <h5
                style={{
                    textAlign: 'center',
                    backgroundColor: "#FEFFF2",
                    fontFamily: 'Montserrat',
                    textTransform: 'uppercase',
                    fontWeight: 800
                }}
            >
                Sub-contractors Created by <span style={{color:"#ff9933"}}>{isAuthenticated().client.name}</span> 
            </h5> */}
            <div>
                {/* <AddGC /> */}

            </div>
            <BackTop />
        </div>
    );
}

export default GeneralContractorDisplay;