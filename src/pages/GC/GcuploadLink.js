import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { get360link } from "./gcapi"
import { isAuthenticated } from '../../authentication';



function GcUploadLink() {
    const { id } = useParams()
  
    const [name, setname] = useState("");
    const [link, setlink] = useState([])

    const Role = isAuthenticated().subContractor.role;

    // alert(token)
    useEffect(() => {
        const token = isAuthenticated().token;
        get360link(token, id).then((res) => {
          
            setlink(res.link)
           
        });
    }, [])
  
    const modelData = async () => {
        const token = isAuthenticated().token;

        // alert(name)
        // const formdata = new FormData();
        // formdata.append("link", name);
        // // formdata.append("image", image);
        const folderId = id
        await fetch(`http://localhost:8080/tourLink/upload/${folderId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        })
            .then((response) => {
                window.location.reload()
                return response.json();
            })
            .catch((err) => console.log(err.message));
    };



    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {
                    Role == "designer" ? (
                        <div>
                            <div>
                                <input
                                    style={{
                                        border: "none",
                                        borderBottom: "3px solid rgb(67, 164, 230)",
                                        fontSize: 14,
                                        width: 1800,
                                        marginLeft: 20,
                                        padding: 3,
                                        marginTop: 20

                                    }}
                                    placeholder=" Paste Link here"
                                    type="text"
                                    name="link"
                                    onChange={(e) => {
                                        setname(e.target.value);
                                    }}

                                ></input>
                            </div>

                            <div>

                                <button
                                    onClick={modelData}
                                    style={{
                                        color: "white",
                                        backgroundColor: "rgb(67, 164, 230)",
                                        border: "2px solid rgb(238, 233, 233)",
                                        borderRadius: "5px",
                                        padding: "4px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        marginLeft: 20,
                                        marginTop: 10
                                    }}

                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : ("")
                }

                <div style={{ marginTop: 100, textAlign: "center", fontSize: 17 }}>

                    <ul>
                        {
                            Role == "designer" ? (<li><h3>360 Tour Links</h3></li>) : (<li><h3>360 Tour Links<br></br> Uploaded By Designer</h3></li>)
                        }

                        {
                            link.map((links) => (
                                <li style={{ padding: 5, borderBottom: "1px solid lightgray", borderTop: "1px solid lightgray", width: "auto", height: "auto" }}><a href={links.link}>{links.link}</a></li>
                            ))
                        }
                    </ul>

                </div>

            </div>


        </div>
    )
}

export default GcUploadLink
