import React, { useState, useEffect } from "react";
import { createProject, getProjectByClient } from "./clientapi";
import { Card, Button, Modal, Form, Input, Empty, Skeleton } from "antd";
import { Link, useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { isAuthenticated } from "../../authentication/index";
import AddGC from "./addGC";
import swal from "sweetalert";
import '../../scss/chat.scss';
import { getconversation } from './clientapi';
import chat from '../../../src/images/chat2.png'
import dot from '../../../src/images/dot.gif'
import { WechatFilled } from "@ant-design/icons"
import Chat from './Chat'

const { TextArea } = Input;
const { Search } = Input;

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

const Projectdisplay = () => {

  const [project, setProject] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let [count, setCount] = useState(0);
  // const [liu, setL] = useState([])
  const [noti, setnoti] = useState([])
  const clientID = isAuthenticated().client._id;

  const userId = isAuthenticated().client._id
  let history = useHistory();
  let handleChildUpdate = (req, res) => {
    setCount(++count)
    console.log(count)
  }
  useEffect(() => {

    const token = isAuthenticated().token;


    const clientId = isAuthenticated().client._id;
    getProjectByClient(token, clientID).then((data) => {
      // console.log("data ==>",data)
      if (data.error) {
        console.log(data.error);
      } else {

        setProject(data);
        // setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const token = isAuthenticated().token
    getconversation(clientID, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setnoti(data)
        console.log(data)
      }
    })
  }, [])


  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    const project = {
      title: values.title,
      description: values.description,
    };
    console.log("Project", project);
    const token = isAuthenticated().token;
    createProject(project, token, clientID).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        swal("Project Created!", "Project has been started", "success");
        setIsModalVisible(false);
        setTimeout(function () {
          window.location.reload();
        }, 2000);
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  const newNoti = noti.map((no) => (
    no.userA[1].notifications == 0 ? ('') : (<><img src={dot} alt="chat" width="15" style={{float:"right"}}/> </>)
  ))



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

          return (
            <Card
              className="project-card m-3"
              hoverable
              // loading={loading}
              key={i}
              onClick={() => history.push(`/project/${project._id}`)}
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
  // if (loading) {
  //   return <Skeleton />;
  // }
  const projects = project.filter((project) => {
    return project.title.toLowerCase().includes(keyword.toLowerCase());
  });
  return (
    <div>
      <div>
        <div className="secondary-nav" style={{ display: "flex" }}>
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={showModal}
            >
              Create Project
            </Button>
          </div>

          <div style={{
            borderLeft: " 2px solid #D3D3D3",
            height: 40
          }}>
            <AddGC />
          </div>
          <div style={{ float: "right", marginLeft: 1000 }}>
            {/* <Search
              placeholder="Search projects"
              onChange={(e) => setKeyword(e.target.value)}
              size="middle"
              enterButton
              allowClear
            /> */}

            <div className="chatss" style={{marginRight:20}}>
              <Link to="/client/openchat">
                { newNoti}
             
                <div className="cheto">
                <img src={chat} alt="chat" width="60"  />
             
                </div>
              </Link>

            </div>
          </div>


          <Modal
            title="Create Project"
            okText="Create"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Enter title!",
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
                    message: "Please enter description!",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <h2 style={{ marginLeft: 11 }}>
          {!project.length ? (
            <Empty
              description={
                <span>
                  <b>No recent projects</b>
                </span>
              }
            />
          ) : (
            "Recent Projects"
          )}
        </h2>
        {renderProjects(projects)}
      </div>

    </div>
  );
};

export default Projectdisplay;
