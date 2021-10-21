import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../../authentication/index";
import { getSCByClient, assignTeamMember , deleteSubContractor } from "./clientapi";
import { Button, Card, Skeleton, BackTop, Empty } from 'antd';
import '../../scss/gcdisplay.scss'
import { useParams } from "react-router-dom";
import AddGC from './addGC';
import Team_gc_display from './team_gc_display'
import swal from 'sweetalert';

const GCDisplay = () => {
    const [val, setval] = useState(0)
    const [gc, setGC] = useState([]);
    const [team, setTeam] = useState([])
    // const [loading, setLoading] = useState(true);
    const { projectId } = useParams();
    const [assign, setassign] = useState("Assign to project");
    let [count ,setCount] = useState(0);
    let [del ,setdel] = useState(0);
const token = isAuthenticated().token;

let handleChildUpdate = () =>{
    setCount(++count)
  }

    useEffect(() => {
        const token = isAuthenticated().token;
        const clientId = isAuthenticated().client._id;
      
        // setLoading(true);
        getSCByClient(token, clientId).then((data) => {
           
            
            if (data.error) {
                console.log(data.error);
            } else {
                setGC(data)
                // setCount(++count)
                // setLoading(false)
                // alert("test", data)
            }
        });
    }, [count, del]);



    const clickEvent = (subId) => {
        const token = isAuthenticated().token;
        const subContractor = subId;

        assignTeamMember(token, projectId, subContractor).then((data) => {
            
            setCount(++count)
            //dispatch fresh list of team members
            swal("Assigned!", "Subcontractor is assigned to this project!", "success");
     
        }).catch((error) => {
            console.log(error.message)
        })



    }


    const deleteEvent = (subId) =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Sub-Contractor!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                fetch(`http://localhost:8080/subContractor/${subId}`, {
                  method: "DELETE",
                  //   body: JSON.stringify({
                  //     id: folderId,
                  //   }),
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }).then((response) => {
                  setdel(++del)
                  return response.json();
                });
      
                if (willDelete) {
                  swal(`Poof! Sub-Contractor has been deleted!`, {
                    icon: "success",
                  });
                } else {
                  swal("Your Sub-Contractor is safe!");
                }
              }
            });
      
    }

    // const updateGc = gc => {
    //     setGC(gc)
    // }
// console.log(gc)

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
                    <table style={{ tableLayout: "fixed" }} className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sr. No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Role</th>
                                <th style={{ width: "auto" }} scope="col">Action</th>
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
                                        <td>{gc.role}</td>


                                        <td><Button
                                            type="primary"
                                            size="middle"
                                            id="change_btn"
                                            onClick={() => clickEvent(gc._id)}

                                        >
                                            {assign}
                                        </Button>
                                       &nbsp;&nbsp;&nbsp;
                                        <Button
                                              type="danger"
                                              size="middle"
                                              id="change_btn"
                                              onClick={() => deleteEvent(gc._id)}
                                              
                                              >Delete</Button></td>
                                    </tr>
                                </tbody>
                            );
                        }) : <Empty />}

                    </table>
                </div>
            </div>
        );
    };



    return (
        <div>

            <div>
                {renderGC(gc)}
            </div>

            <h5
                style={{
                    textAlign: 'center',
                    backgroundColor: "#FEFFF2",
                    fontFamily: 'Montserrat',
                    textTransform: 'uppercase',
                    fontWeight: 800
                }}
            >
                Sub-contractors Created by <span style={{ color: "#ff9933" }}>{isAuthenticated().client.name}</span>
            </h5>
            <div>
                {/* <AddGC /> */}

            </div>
            <BackTop />

           <Team_gc_display callback={handleChildUpdate} />
        </div>
    );
}

export default GCDisplay;