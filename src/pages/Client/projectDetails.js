import React from 'react';
import { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import GCDisplay from './gcdisplay';
import SingleProject from './singleProject';
import '../../scss/client.scss';
import MainLayout from './client-components/Layout';
import Comments from "./client-components/comments";
import { useParams } from 'react-router-dom';
import File from "./file"
import Document from './Document';
import Model from './Model';
import Assests from './Assests';
import Mir from './M_i_r'
import Team from './team_gc_display'
import kuula from './kuula';
import { Link } from 'react-router-dom'
import image from '../../images/anwar-hakim-K-bKhfi8ZWU-unsplash.jpg'
import Chat from './Chat';

const { TabPane } = Tabs;


const ProjectDetails = (props) => {
    var id = props.match.params.projectId
    
    const callback = (k) => {
if(id){
    localStorage.setItem("keys", k)
}

    }


    const { projectId } = useParams();

    return (
        <MainLayout
            component={
                <div className="flex-container">
                    <Tabs defaultActiveKey={localStorage.getItem("keys")} onChange={callback} className="flex-child" transition={false}>
                        <TabPane tab="Project Overview" key={1}>
                         <SingleProject {...props} />
                            
                        </TabPane>


                        <TabPane tab="Models" key={2}>
                            <div>
                             
                                    <Model {...props} />
                            
                            </div>
                        </TabPane>
                        <TabPane tab="360 Tour" key={3}>
                            <div>
                                <Assests {...props} />
                            </div>
                        </TabPane>
                        <TabPane tab="Documents" key={4}>
                            <div>

                                <Document {...props} />
                            </div>
                        </TabPane>
                        <TabPane tab="M.I.R" key={5}>
                            <div>
                                <Mir {...props} />
                            </div>
                        </TabPane>
               
                        <TabPane tab="Sub Contractors" key={7}>
                            <GCDisplay />

                        </TabPane>
                        {/* <TabPane tab="Team Members" key="8">
                            < Team/>
                            
                        </TabPane> */}
                        <TabPane tab="Demo 360" key={9}>
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
    )
}

export default ProjectDetails;