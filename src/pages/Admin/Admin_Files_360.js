import React, { useEffect, useState } from "react";
import "../../scss/files_360.scss";
import MainLayout from "./admin-components/AdmiLayout";
import Pop_up_Modal_360 from "./Admin_Pop_up/Admin_Pop_up_Model_360";
import { Link, useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import swal from "sweetalert";
import { clientSignout, isAuthenticated } from "../../authentication/index.js";
import "../../scss/client.scss";
import { Layout, Menu, Dropdown, Avatar, Alert } from "antd";
import { Pannellum } from "pannellum-react";
import { get360files } from "./adminapi";
// import kuula from "./kuula";
const { Header, Content, Footer } = Layout;

function Admin_Files_360(props) {
  // console.log(props);
  const [getfile, setgetfile] = useState([]);
  const [images, setimages] = useState([]);
  // const [img_360, setimg_360] = useState([])

  const token = isAuthenticated().token;

  useEffect(() => {
    const folderId = props.match.params.id;
    // console.log(folderId);

    setgetfile(folderId);

    //// file get function

    get360files(token, folderId).then((data) => {
      // console.log("data ==>",data)
      if (data.error) {
        console.log("error");
      } else {
        // console.log(data);
        setimages(data);
        // console.log(images);
      }
    });
  }, []);

  const Delete_360 = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this folder!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:8080/tourFile/delete/${id}`, {
          method: "DELETE",
          //   body: JSON.stringify({
          //     id: folderId,
          //   }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          console.log(response);
          window.location.reload();
          return response.json();
        });

        if (willDelete) {
          swal(`Poof! Your folder has been deleted!`, {
            icon: "success",
          });
        } else {
          swal("Your folder is safe!");
        }
      }
    });
  };
  ///////////////////////

  // load your image
  // const image = new Image();
  // image.src = 'panosphere.jpg';

  // image.onload = () => {
  //   // when the image is loaded, setup the viewer
  //   const viewer = create360Viewer({
  //     image: image
  //   });

  //////////////////
  const signout = () => {
    clientSignout();
    console.log("Signout Successfull");
    window.location.reload();
  };

  const menu = (
    <Menu style={{ width: 120 }}>
      <Menu.Item key="0">
        <Link to="/client/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={signout}>
        Signout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
    <Layout className="layout layout">
        {/* <Header
          className="header-style"
          style={{ paddingLeft: 30, paddingRight: 30 }}
        >
          <Menu theme="dark" mode="horizontal" className="header-style">
            {isAuthenticated() && (
              <Menu.Item key="1">
                <a>
                  <Link to={`/client/dashboard`}>
                    {isAuthenticated().client.name}
                  </Link>
                </a>
                's Account
              </Menu.Item>
            )}
            <Dropdown overlay={menu} placement={"bottomCenter"}>
              <Avatar
                className="avatar-props"
                onClick={(e) => e.preventDefault()}
                size={30}
              >
                {result}
              </Avatar>
            </Dropdown>
            <Menu.Item key="2" style={{float: "Right"}} onClick={signout}>
                Signout
              </Menu.Item>
          </Menu>
        </Header> */}
      </Layout>
      <div className="upload_files">
        <Pop_up_Modal_360 getfile={getfile}></Pop_up_Modal_360>
        <div className="folders flex-container">
          <ul>
            {images.map((image) => (
              <li key={image._id}>
                {/* <img
                  src={"http://localhost:8080/" + image.image}
                  alt={image.image}
                  width="300"
                  height="300"
                ></img> */}
                <Pannellum
                  width="100%"
                  height="250px"
                  image={"http://localhost:8080/" + image.image}
                  pitch={10}
                  yaw={180}
                  hfov={110}
                  autoLoad
                  showZoomCtrl={false}
                  className="pannellum"
                >
                  <Pannellum.Hotspot
                    type="custom"
                    pitch={12.41}
                    yaw={117.76}
                    handleClick={(evt, name) => console.log(name)}
                    name="image info"
                  />
                </Pannellum>
                <div className="text">
                  <div>{image.name}</div>
                  <div>
                    <DeleteIcon
                      onClick={() => Delete_360(image._id)}
                      className="delete_icon"
                    />{" "}
                  </div>
                </div>
              </li>
            ))}
          </ul>
       
        </div>
      </div>

    </>
  );
}

export default Admin_Files_360;
