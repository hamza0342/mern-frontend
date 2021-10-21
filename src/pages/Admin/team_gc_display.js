import React, {useState , useEffect} from 'react'
import { isAuthenticated } from "../../authentication/index";
import { getSCByClient, assignTeamMember } from "./adminapi";
import { Button, Card, Skeleton, BackTop, Empty } from 'antd';
import { useParams } from "react-router-dom";
import AddGC from '../Client/addGC';
import swal from 'sweetalert';


function Team_gc_display() {

    const [gc, setGC] = useState([]);
    const [loading, setLoading] = useState(true);
    const { projectId } = useParams();
    const {clientid} = useParams();
    const [disable, setdisable] = useState(false)

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
        const token = isAuthenticated().token;
        const subContractor = subId;
        assignTeamMember(token, projectId, subContractor)
            .then((data) => {
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
            })

    }



    const renderAssigned = (gcs) => {
        return (
            <div>
                <div className="table-responsive">
                    <table style={{"tableLayout":"fixed"}} className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Sr. No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>

                            </tr>
                        </thead>
                        <tbody>
                            {gcs.length ? gcs.map((gc, i) => {
                                if (gc.projects.includes(projectId))
                                    return (
                                        <tr>
                                            <th scope="row">{i + 1}</th>
                                            <td>{gc.name}</td>
                                            <td>{gc.email}</td>
                                            <td>{gc.phone}</td>
                                      
                                        </tr>
                                    );
                            }) : <Empty />}
                        </tbody>
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
             
            <div style={{
                marginBottom: 10
            }}>
                <h5
                    style={{
                        textAlign: 'center',
                        backgroundColor: "#FEFFF2",
                        fontFamily: 'Montserrat',
                        textTransform: 'uppercase',
                        fontWeight: 800
                    }}
                >
                    Team members associated with this project
                </h5>
                {renderAssigned(gc)}
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
                Sub-contractors Added To This Project by <span style={{color:"#ff9933"}}>{isAuthenticated().client.name}</span> 
            </h5> */}
            <div>
                {/* <AddGC /> */}

            </div>
            <BackTop />
        </div>
    )
}

export default Team_gc_display
