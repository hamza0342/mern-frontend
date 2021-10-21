import React, {useState,useEffect} from 'react';
import {singleProject, deleteProject, updateProject, updatedProject} from './clientapi'
import {Link, Redirect} from 'react-router-dom';
import {Skeleton, Button,  Modal, Form, Input, BackTop} from 'antd';
import {isAuthenticated} from "../../authentication/index";
import { Descriptions, Badge } from 'antd';
import swal from 'sweetalert';
import Comments from "./client-components/comments";


const { TextArea } = Input;

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
};
const tailLayout = {
    wrapperCol: { offset: 18, span: 16 },
};

function SingleProject(props) {

    const [project, setProject] =useState("");
    const [comments, setComments] = useState([])
    const [redirect, setRedirect] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const[error, setError] = useState("");
    const name = isAuthenticated().client.name

    useEffect(() => {
        const token = isAuthenticated().token;
        const projectId = props.match.params.projectId
       
        singleProject(token ,projectId).then((data) =>{
            if (data.error){
                console.log(data.error);
            } else {
               
                setProject(data)
                setComments(data.comments)
            }
        })

    },[])

    const project_ID= project._id;
    const deleteproject = (projectId) => {
        const token = isAuthenticated().token;
        deleteProject(projectId, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                swal("Deleted!", "Project is deleted!", "success");
                setRedirect("/client/dashboard");
            }
        });
    };
    const deleteConfirmed = (id) => {
        let answer = window.confirm(
            "Are you sure you want to delete this Project"
        );

        if (answer) {
            deleteproject(id);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = (values) => {
       
        const project = { 
            'title': values.title,
            'description': values.description
        };
    
        const token = isAuthenticated().token;
        updateProject(project_ID, token, project).then((data)=>{
            if(data.error){
                setError(data.error);
            }
            else {
              
                updatedProject(data, ()=> {
                    swal("Project Edited!","The details have been updated","success");
                    setIsModalVisible(false);
                    setProject(data)
                })
                    
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    const updateComments = comments => {
        setComments(comments)
       
      }

    const renderProjects = (project) =>{
        const posterId = project.postedBy ? `/admin/${project.postedBy._id}`: ""
        const posterName = project.postedBy ? project.postedBy.name: " Unknown"
        return (
            <div className="card-body">
                 <Descriptions
                    title="Project Details" 
                    bordered
                    // extra={ 
                    // <Button type="primary" size='medium' className="m-2" onClick={showModal}>
                    //         Edit Project
                    // </Button>
                    // }
                    >
                    <Descriptions.Item label="Project Name" ><b>{project.title}</b></Descriptions.Item>
                    <Descriptions.Item  >
                    {/* {new Date(project.created).toDateString()} */}
                    </Descriptions.Item>
                    <Descriptions.Item  span={3}></Descriptions.Item>
                    <Descriptions.Item label="Status" span={4}>
                    <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={4}>{project.description}</Descriptions.Item>
                    <Descriptions.Item label="Posted by" span={2}><Link to={`${posterId}`}>{posterName}{" "}</Link></Descriptions.Item>
                    <Descriptions.Item label="Posted on">{new Date(project.created).toDateString()}</Descriptions.Item>
                </Descriptions>
                <Button  type="danger" size="medium" style={styles.deleteButton} onClick={()=> deleteConfirmed(project._id)}>Delete Project</Button>
                <Link to={`/client/dashboard`} className="btn btn-raised btn-info btn-sm" style={styles.backButton}>Back to Home</Link>
                <Modal title="Create Project" okText="Create" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        ["title"]: project.title,
                        ["description"]: project.description
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                        {
                            required: true,
                            message: 'Enter title!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                        {
                            required: true,
                            message: 'Please enter description!',
                        },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Update
                        </Button>
                    </Form.Item>
                    </Form>
                </Modal>
                <BackTop />
                <strong className="site-back-top-basic" />
            </div>
        )
    }
    if(redirect) {
        return <Redirect to = {redirect} />
    }

    
    return (
        
        <div>
            <div className="flex-container">
                <div className="flex-child mt-5">
                {
                    !project ?(
                        <Skeleton />
                    ):(
                        renderProjects(project)
                    )
                }
                </div>
                <div className="flex-childs project-wall" style={{width: 400}}>
                <p className="heading mt-2 ml-2 mb-0">Project Wall</p>
                <hr className="mb-0" />
                 <Comments project={project._id} commentss={comments} updateComments={updateComments} name = {name} />
                </div>
            </div>
            
        </div>
    );

}

export default SingleProject;

const styles= {
    deleteButton: {
        float: 'right', 
        marginTop: 26
    },
    backButton: {
        marginTop: 26
    }
}
