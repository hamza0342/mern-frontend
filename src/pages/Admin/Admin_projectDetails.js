import React, { useEffect , useState } from 'react';
import { Tabs } from 'antd';
import { Layout } from 'antd';
import GeneralContractorDisplay from './GeneralContractor';
import SingleProject from './singleProject';
import '../../scss/client.scss';
import MainLayout from './admin-components/AdmiLayout';
import { useParams } from 'react-router-dom';
import Document from './Admin_Document';
import Model from './Model';
import Assests from './Admin_Assests';
import Mir from './M_i_r'
import Team from './team_gc_display'
import ClientSignup from "./clientsignup";
import ClientDisplay from "./clientdisplay";
import Sidebar from "../../components/Side";
import {
    BrowserRouter as Router,
    Route,
    Switch as RouterSwitch,
} from "react-router-dom";
import AdminMenu from "./admin-components/menu";
import image from '../../images/anwar-hakim-K-bKhfi8ZWU-unsplash.jpg'

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;


const ProjectDetails = (props) => {
    const [keys, setkey] = useState("")
    const [after, setafter] = useState("")
    const callback = (key) => {
        setkey(key)
        console.log(keys)
   
    }

useEffect(() => {
    localStorage.setItem('key' , keys);
}, [keys])
   

useEffect(() => {
   const keyyyss =  localStorage.getItem('key')
   if(keyyyss)
   setafter(keyyyss)
    
}, [])




    const { projectId, clientID } = useParams();

    // console.log("Props ==>", props) //remove it later
    // console.log("Project_ID ==>", projectId)
    // console.log("client_ID ==>", clientID)
    // console.log("client iD", props.match.params.clientid)

    return (
        <>
            <div style={{ display: "flex"  }}>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sidebar menu={<AdminMenu />} />
                    <Layout className="site-layout">
                        <Content style={{ margin: '0 16px' }}>

                            <RouterSwitch>
                                <Route
                                    exact
                                    path="/admin/dashboard"
                                    component={ClientSignup}
                                />
                                <Route
                                    exact
                                    path="/admin/dashboard/clientdisplay"
                                    component={ClientDisplay}
                                />

                            </RouterSwitch>
                        </Content>
                    </Layout>
                </Layout>
                <MainLayout
                    component={
                        <div className="flex-container"  style={{width:1500}}>
                            <Tabs defaultActiveKey={keys} onChange={callback} className="flex-child">
                                <TabPane tab="Project Overview" key="1">
                                    <div > 
                                 
                                        <SingleProject {...props} />
                                    </div>
                                </TabPane>
                                <TabPane tab="Models" key="2" active="true">
                                    <div >
                                 
                                        <Model {...props} />
                                    </div>
                                </TabPane>
                                <TabPane tab="360 Tour" key="3" active="true">
                                    <div >
                                 
                                        <Assests {...props} />
                                    </div>
                                </TabPane>
                                <TabPane tab="Documents" active="true">
                                    <div >
                                 

                                        <Document {...props} />
                                    </div>
                                </TabPane>
                                <TabPane tab="M.I.R" key="5">
                                    <div id="5">
                                        <Mir {...props} />
                                    </div>
                                </TabPane>
                                {/* <TabPane tab="Vendors" key="6">
                                    <div>
                                        Vendors
                                    </div>
                                </TabPane> */}
                                <TabPane tab="Sub Contractors" key="7">
                                    <GeneralContractorDisplay />

                                </TabPane>
                                {/* <TabPane tab="Team Members" key="8">
                                    < Team />

                                </TabPane> */}
                                <TabPane tab="Demo 360" key="9">
                                    <div>
                                        {/* <Link to={`https://kuula.co/share/collection/7k0Ch?logo=1&info=0&logosize=104&fs=1&vr=1&zoom=1&sd=1&autorotate=0.12&thumbs=1&inst=0`}>360</Link> */}
                                        {/* <iframe width="100%" height="640" style="width: 100%; height: 640px; border: none; max-width: 100%;" 
                                    frameborder="0" allowfullscreen allow="xr-spatial-tracking; gyroscope; accelerometer" scrolling="no" 
                                    src={`https://kuula.co/share/collection/7k0Ch?logo=1&info=0${&}logosize=104${&}fs=1${&}vr=1${&}zoom=1${&}sd=1${&}autorotate=0.12${&}thumbs=1${&}inst=0`}></iframe> */}
                                        <a href="https://kuula.co/share/collection/7k0Ch?logo=1&info=0&logosize=104&fs=1&vr=1&zoom=1&sd=1&autorotate=0.12&thumbs=1&inst=0" target="_blank"><img src={image} height="500px" /> </a>

                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    }

                />
            </div>

        </>

    )
}

export default ProjectDetails;