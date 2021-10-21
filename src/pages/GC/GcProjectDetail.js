import React from 'react'
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import GcMainLayout from './gc-component/gcLayout';
import GC_Model from './GC_Model';
import GC_Assests from './GC_Assests';
import GC_Document from './GC_Document';
import GC_Mir from './GC_Mir';
import SingleProject from './GC_singleProject';
import GC_Chat from './GC_Chat';
import { isAuthenticated } from "../../authentication/index";




const { TabPane } = Tabs;

function GcProjectDetail(props) {
    const callback = (key) => {
        console.log(key);
    }

    const { projectId } = useParams();
    // console.log("Props ==>", props) //remove it later
    // console.log("Project_ID ==>", projectId)
    const role = isAuthenticated().subContractor.role;
    // console.log(role)
    return (
        <GcMainLayout
            component={
                <div className="flex-container">
                    <Tabs defaultActiveKey="3" onChange={callback} className="flex-child">
                        <TabPane tab="Project Overview" key="2">

                            <SingleProject {...props} />
                        </TabPane>

                        <TabPane tab="Models" key="3">
                            <div>
                                <GC_Model {...props} />
                            </div>


                        </TabPane>

                        <TabPane tab="360 Tour" key="1">
                            <div>
                                <GC_Assests {...props} />
                            </div>
                        </TabPane>


                        {role == "designer" ? (
                            <TabPane tab="Documents" key="4">
                                <div>

                                    <GC_Document {...props} />
                                </div>
                            </TabPane>
                        ) : ("")}

                        {role == "designer" ? (
                            <TabPane tab="M.I.R" key="5">
                                <div>
                                    <GC_Mir {...props} />
                                </div>
                            </TabPane>
                        ) : ("")}

                        {/* <TabPane tab="Chat" key="10">
                            < GC_Chat />

                        </TabPane> */}



                    </Tabs>
                    {/* <div className="flex-childs">
           <  Comments project={projectId} />
           </div> */}
                </div>
            }

        ></GcMainLayout>
    )
}

export default GcProjectDetail
