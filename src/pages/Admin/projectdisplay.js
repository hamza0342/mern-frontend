import React, { useState, useEffect } from "react";
import { createProject, getProjectByClient } from "./adminapi";
import { Card, Button, Modal, Form, Input, Empty, Skeleton } from "antd";
import { Link, useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Layout } from 'antd';
import { isAuthenticated } from "../../authentication/index";
import AddGC from "../Client/addGC";
import { useParams } from "react-router";
import AdminMenu from "./admin-components/menu";
import ClientSignup from "./clientsignup";
import ClientDisplay from "./clientdisplay";
import Sidebar from "../../components/Side";
import {
  BrowserRouter as Router,
  Route,
  Switch as RouterSwitch,
} from "react-router-dom";
import swal from "sweetalert";

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

const { Header, Content, Footer } = Layout;

const Projectdisplay = (props) => {
  // console.log(props)
  const clientID = props.match.params.id;

  const [project, setProject] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // const clientID = isAuthenticated().client._id;


  let history = useHistory();
  const token = isAuthenticated().token;
  useEffect(() => {

   


    // const clientId = isAuthenticated().client._id;
    // console.log("Client ID ==>", clientID);
    getProjectByClient(token, clientID).then((data) => {
      // console.log("data ==>",data)
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("data ==>", data);
        setProject(data);
        setLoading(false);
      }
    });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values) => {
    // console.log("Success:", values);
    const project = {
      title: values.title,
      description: values.description,
    };
    // console.log("Project", project);
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
              onClick={() => history.push(`/viewProjects/${project._id}/${clientID}`)}
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
    <div style={{ display: "flex" }}>
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
          {/* <Footer style={{ textAlign: 'center' }}>ArchiWiz &copy; 2021 A Project of Safe Solutions Consultants</Footer> */}
        </Layout>

      </Layout>
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
            <Search
              placeholder="Search projects"
              onChange={(e) => setKeyword(e.target.value)}
              size="middle"
              enterButton
              allowClear

            />
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
