import React, { useEffect, useState } from "react";
import "../../scss/files_360.scss";
import MainLayout from "./client-components/Layout";
import Pop_up_Modal_360 from "./Pop_up/Pop_up_Model_360";
import { Link, useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import swal from "sweetalert";
import { clientSignout, isAuthenticated } from "../../authentication/index.js";
import "../../scss/client.scss";
import { Layout, Menu, Dropdown, Avatar, Alert } from "antd";
import { Pannellum } from "pannellum-react";
import { get360files } from "./clientapi";
import kuula from "./kuula";
import UploadLink from "./uploadLink";
const { Header, Content, Footer } = Layout;

function Files_360(props) {
  console.log(props);
  const [getfile, setgetfile] = useState([]);
  const [images, setimages] = useState([]);
  // const [img_360, setimg_360] = useState([])

  const token = isAuthenticated().token;

  useEffect(() => {
    const folderId = props.match.params.id;
    setgetfile(folderId);
    get360files(token, folderId).then((data) => {
      // console.log("data ==>",data)
      if (data.error) {
        console.log("error");
      } else {
        
        setimages(data);
      
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


  function download(image) {
    //  alert(image)
    return fetch(`http://localhost:8080/download/${image}`, {
      method: "GET",

    }).then(async (name) => {
  

      const imageBlog = await name.blob()
      const imageURL = URL.createObjectURL(imageBlog)

      const link = document.createElement('a')
      link.href = imageURL

      link.download = image.slice(33)
      document.body.appendChild(link)

      link.click()
      document.body.removeChild(link)
    })

  }



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
        <Header
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
            {/* <Dropdown overlay={menu} placement={"bottomCenter"}>
              <Avatar
                className="avatar-props"
                onClick={(e) => e.preventDefault()}
                size={30}
              >
                {result}
              </Avatar>
            </Dropdown> */}
            {/* <Menu.Item key="2" style={{float: "Right"}} onClick={signout}>
                Signout
              </Menu.Item> */}
          </Menu>
        </Header>
      </Layout>
      <div className="upload_files">
        {/* <Link to={`/linkpage`} >
          <div className="upload_btn" style={{ marginRight: 50, float: "right" }}>
            <div className="content" style={{ fontSize: 16, fontWeight: 600, color: "black", backgroundColor: "lightgray", padding: 5 }}> Click here to upload 360 Tour link</div>
          </div>
        </Link> */}
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
                  height="100px"
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
                    <DownloadIcon onClick={()=>download(image.image)} className="download_icon"  />
                    {" "}
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
        <UploadLink />
      </div>

    </>
  );
}

export default Files_360;
