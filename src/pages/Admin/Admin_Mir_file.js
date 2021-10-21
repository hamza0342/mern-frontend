import React, { useEffect, useState } from "react";
import "../../scss/file.scss";

import Pop_up_Modal_Mir from "./Admin_Pop_up/Admin_Pop_up_Model_Mir";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { clientSignout, isAuthenticated } from "../../authentication/index.js";
import "../../scss/client.scss";
import { Layout, Menu, Dropdown, Avatar, Alert } from "antd";
import { getmirFilebyFolder } from "./adminapi";
const { Header, Content, Footer } = Layout;


function Admin_Mir_file(props) {
  const [getfile, setgetfile] = useState([]);
  const [state, setstate] = useState([]);
  const { token } = isAuthenticated().token;

  useEffect(() => {
    const token = isAuthenticated().token;
    const folderId = props.match.params.id;
    // console.log(folderId)

    setgetfile(folderId);

    //// file get function

    getmirFilebyFolder(token, folderId).then((data) => {
      // console.log("data ==>",data)
      if (data.error) {
      } else {

        setstate(data);
        // console.log(data)
      }

    });
  }, []);

  const deleteFile = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this folder!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`http://localhost:8080/mirFile/delete/${id}`, {
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
            window.location.reload()
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

  }

  function download(name) {
    // alert(name)
    return fetch(`http://localhost:8080/download/${name}`, {
      method: "GET",

    }).then(async (image) => {

      const imageBlog = await image.blob()
      const imageURL = URL.createObjectURL(imageBlog)

      const link = document.createElement('a')
      link.href = imageURL

      link.download = name.slice(33)
      document.body.appendChild(link)

      link.click()
      document.body.removeChild(link)
    })

    // then( res => res.blob() )
    // .then( blob => {
    //   var file = window.URL.createObjectURL(blob);
    //   console.log(file)
    //   window.location.assign(file);

    // });

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
        <Pop_up_Modal_Mir getfile={getfile}></Pop_up_Modal_Mir>

        <div className="tableDiv">
          <table id="table">
            <tr>
              <th>Name</th>
              <th>File</th>
              <th>Action</th>
            </tr>
            {
              state.map((file) => (
                <tr>
                  <td>{file.name}</td>
                  <td>{file.image.slice(33)}</td>
                  <td><button onClick={() => download(file.image)} className="download">
                    Download
                  </button>
                    <button onClick={() => deleteFile(file._id)} className="delete">Delete</button></td>
                </tr>
              ))
            }

          </table>
        </div>
      </div>
    </>
  )
}

export default Admin_Mir_file
