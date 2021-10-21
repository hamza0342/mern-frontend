import React, { useState, useEffect } from 'react'
// import Pop_up_Modal_360 from "./GC_Pop_up/GC_Pop_up_Model_360"
import { Link, useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import swal from "sweetalert";
import { gcSignout, isAuthenticated } from "../../authentication/index.js";
import "../../scss/client.scss";
import { Layout, Menu, Dropdown, Avatar, Alert } from "antd";
import DownloadIcon from '@mui/icons-material/Download';
import { Pannellum } from "pannellum-react";
import { get360files } from "./gcapi";
import GcUploadLink from "./GcuploadLink";
import GC_Pop_up_Modal_360 from './GC_Pop_up/GC_Pop_up_Model_360.js';
const { Header, Content, Footer } = Layout;

function Gc_Files_360(props) {
  // console.log(props);
  const [getfile, setgetfile] = useState([]);
  const [images, setimages] = useState([]);
  const token = isAuthenticated().token;

  const role = isAuthenticated().subContractor.role;

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
  }, [images, getfile]);

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
          // console.log(response);
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

  // const signout = () => {
  //   if (typeof window !== "undefined") {
  //     localStorage.removeItem("jwt");
  // }
  // <Link to="/"></Link>
  //   // console.log("Signout Successfull")
  //   window.location.reload();
  // }


  var str = isAuthenticated().subContractor.name;
  var result = str.substring(0, 1);


  // const menu = (
  //   // <Menu style={{ width: 120 }}>
  //   //   <Menu.Item key="0">
  //   //     <Link to="">Profile</Link>
  //   //   </Menu.Item>
  //   //   <Menu.Item key="1" onClick={signout}>
  //   //     Signout
  //   //   </Menu.Item>
  //   // </Menu>
  // );
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
                  <Link to={`/gc/dashboard`}>
                    {isAuthenticated().subContractor.name}
                  </Link>
                </a>
                's Account
              </Menu.Item>
            )}


            <Avatar
              className="avatar-props"
              onClick={e => e.preventDefault()}
              size={30}
              style={{ marginLeft: 10 }}
            >
              {result}
            </Avatar>

            {/* <Menu.Item key="2" style={{float: "Right"}} onClick={signout}>
                  Signout
                </Menu.Item> */}
          </Menu>
        </Header>
      </Layout>
      <div className="upload_files">
        {
          role == "designer" ? (
            <GC_Pop_up_Modal_360 getfile={getfile}></GC_Pop_up_Modal_360>
          ) : (" ")
        }

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
                    <DownloadIcon onClick={() => download(image.image)} className="download_icon" />
                    {" "}
                    {/* <DeleteIcon
                      onClick={() => Delete_360(image._id)}
                      className="delete_icon"
                    />{" "} */}

                  </div>
                </div>
              </li>
            ))}
          </ul>


        </div>
        <GcUploadLink />
      </div>
    </>
  )
}

export default Gc_Files_360
