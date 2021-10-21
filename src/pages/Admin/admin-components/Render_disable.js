import React,{useState , useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { isAuthenticated } from "../../../authentication/index";
import { Button, Card } from 'antd';
import swal from "sweetalert";
import { enableclient, disableclient, getdisableClients } from '../adminapi';

function Render_disable({dis}) {
    
    const [getdisableCLient, setgetdisableCLient] = useState([])

    useEffect(() => {
        getdisableClients().then((res)=>{
            // console.log(res.message);
            if(res.err){
                console.log(res.error)
            }else{
                setgetdisableCLient(res.message)
            }
        })
        }, [])
       
        const history = useHistory();
        const enableAccount = (clientId) => {
            const token = isAuthenticated().token;
            enableclient(clientId, token).then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    swal("Enable!", "success").then(
                        setTimeout(function () {
                            window.location.reload();
                        }, 1500));
                }
            });
        };

    

        
    const showProjects = (id) => {
        history.push(`/adminproject/${id}`);
        window.location.reload()

    }
    return (
        <>
        <div style={{ fontSize: 18 }}><span style={{ backgroundColor: "#FF6F61 ", color: "white", padding: 5, borderRadius: 5, borderTopRightRadius: 0, borderBottomRightRadius: 0  }}> Disabled Client  :</span><span style={{ backgroundColor: "#34568B", color: "white", padding: 5,paddingLeft:10, borderRadius: 5, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} > {getdisableCLient}</span></div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {dis.map((user, i) => {
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
                            type="danger"
                            size="small"
                            style={{ marginTop: 2 }}
                            onClick={() => enableAccount(user._id)

                            }
                        >
                            Enable Account
                        </Button>

                        <Button
                            type="primary"
                            size="small"
                            style={{ marginTop: 2, marginLeft: 20 }}
                            onClick={() => showProjects(user._id)}
                        >
                            Projects Detail
                        </Button>
                      
                    </Card>
                );
            })}
        </div>
    </>
    )
}

export default Render_disable
