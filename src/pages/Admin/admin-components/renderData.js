import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { isAuthenticated } from "../../../authentication/index";
import { Button, Card } from 'antd';
import { Redirect } from 'react-router-dom';
import swal from "sweetalert";
import { enableclient, disableclient, getactiveClients } from '../adminapi';

//This component contains display and delete functionalities of admin and general contributor
const RenderUser = ({ props }) => {
    const [activeClients, setactiveClients] = useState([])

    useEffect(() => {
        getactiveClients().then((res) => {
            // console.log(res.message)
            if (res.error) {
                console.log(res.error)
            } else {
                setactiveClients(res.message)
            }
        })

    }, [])
    // console.log(props)
    const history = useHistory();
  
    const disableAccount = (clientId) => {
        const token = isAuthenticated().token;
        disableclient(clientId, token)
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    swal("Disable!", "success").then(
                        setTimeout(function () {
                            window.location.reload();
                        }, 1500));

                }
            })

    }

    const showProjects = (id) => {
        history.push(`/adminproject/${id}`);
        window.location.reload()

    }
    return (
        <>
            <div style={{ fontSize: 18 }}><span style={{ backgroundColor: "#FF6F61 ", color: "white", padding: 5, borderRadius: 5, borderTopRightRadius: 0, borderBottomRightRadius: 0  }}> Registered Client  :</span><span style={{ backgroundColor: "#34568B", color: "white", padding: 5,paddingLeft:10, borderRadius: 5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} > {activeClients}</span></div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {props.map((user, i) => {
                    return (
                        <Card
                            className="card-display"
                            key={i}
                            style={{ width: 500 }}
                        >
                            <p className="card-title">{user.name}</p>
                            <p className="card-text">Email: {user.email}.</p>
                            <p className="card-text">Phone: {user.phone}.</p>
                           

                            <Button
                                type="primary"
                                size="small"
                                style={{ marginTop: 2, marginLeft: 20 }}
                                onClick={() => showProjects(user._id)}
                            >
                                Projects Detail
                            </Button>
                            <Button
                                type="primary" danger ghost
                                size="small"
                                style={{ marginTop: 2, marginLeft: 20 }}
                                onClick={() => disableAccount(user._id)}

                            >
                                Disable Account
                            </Button>
                        </Card>
                    );
                })}
            </div>
        </>

    );
};

export default RenderUser;