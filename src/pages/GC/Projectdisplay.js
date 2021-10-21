import React, { useState, useEffect } from "react";
import { getProjectBysubContractor } from "./gcapi";
import { Card, Button, Modal, Form, Input, Empty, Skeleton } from "antd";
import { Link, useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { getconversation } from '../Client/clientapi';
import { isAuthenticated } from "../../authentication/index";
import chat from '../../../src/images/chat2.png'
import dot from '../../../src/images/dot.gif'
import '../../scss/chat.scss';


const GcProjectdisplay = () => {
    // console.log("hey i am in gccccc")
    const [project, setProject] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [noti, setnoti] = useState([])
    const subContractorId = isAuthenticated().subContractor._id;

    let history = useHistory();

    useEffect(() => {
        const token = isAuthenticated().token;
        const subContractorId = isAuthenticated().subContractor._id;
        const subContractorRole = isAuthenticated().subContractor.role;
        // console.log("subContractor ID ==>", subContractorId);
        // console.log("role==>",subContractorRole)
        getProjectBysubContractor(subContractorId).then((data) => {
            // console.log("data ==>",data)
            if (data.error) {
                console.log(data.error);
            } else {

                setProject(data);
                setLoading(false);
            }
        });
    }, []);


    useEffect(() => {
        const token = isAuthenticated().token
        getconversation(subContractorId, token).then((data) => {
          if (data.error) {
            console.log(data.error)
          } else {
            setnoti(data)
            console.log(data)
    
    
    
    
    
    
          }
        })
      }, [])


    const renderProjects = (projects) => {
        return (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {projects.map((project, i) => {
                    const posterId = project.postedBy
                        ? `/admin/${project.postedBy._id}`
                        : "";
                    const posterName = project.postedBy
                        ? project.postedBy.name
                        : "Unknown";
                    // console.log(posterId);
                    // console.log(posterName);
                    return (
                        <Card
                            className="project-card m-3"
                            hoverable
                            loading={loading}
                            key={i}
                            onClick={() => history.push(`/gcproject/${project._id}`)}
                        >
                            <p className="card-title capitalize">{project.title} </p>
                            <p className="card-text">
                                {project.description.substring(0, 100)}
                            </p>
                            <br />
                            <p className="font-italic mark mt-2">
                                Posted by :{" "}
                                <Link to={`${posterId}`}>
                                    {posterName}
                                    {""}
                                </Link>
                            </p>
                            <p className="font-italic mark">
                                {" "}
                                Posted on : {new Date(project.created).toDateString()}
                            </p>
                            {/* <Link to={`/project/${project._id}`} class="btn btn-raised btn-primary" >Read more</Link> */}
                        </Card>
                    );
                })}
            </div>
        );
    };
    if (loading) {
        return <Skeleton />;
    }
    const projects = project.filter((project) => {
        return project.title.toLowerCase().includes(keyword.toLowerCase());
    });
    return (
        <div>
              <div className="chatss" style={{marginRight:80}}>
                <Link to="/gc/openchat">
                    {noti[0].userB[1].notifications == 0?("  "):(<> <img src={dot} alt="chat" width="15" style={{float:"right"}}/> </>)}
                    <div className="cheto" style={{float:"right"}}>
                <img src={chat} alt="chat" width="60"/>
                </div>
                </Link>
               
            </div>
            <div>
                <h2 style={{ marginLeft: 11, marginTop: 20 }}>
                    {!project.length ? (
                        <Empty
                            description={
                                <span>
                                    <b>No recent projects</b>
                                </span>
                            }
                        />
                    ) : (
                        "Assigned Projects"
                    )}
                </h2>
                {renderProjects(projects)}
            </div>
          
        </div>
    );
};

export default GcProjectdisplay;
