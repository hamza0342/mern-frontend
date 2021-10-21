import React, { useEffect, useState } from "react";
import "../../scss/file.scss";
// import MainLayout from "./client-components/Layout";
import Pop_up_Modal from "./Admin_Pop_up/Admin_Pop_up_Modal";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import { clientSignout, isAuthenticated } from "../../authentication/index.js";
import "../../scss/client.scss";
import { Layout, Menu, Dropdown, Avatar, Alert } from "antd";
import { getFilebyFolder } from "./adminapi";
const { Header, Content, Footer } = Layout;

function Admin_Files(props) {
  const [getfile, setgetfile] = useState([]);
  const [state, setstate] = useState([]);
const { token } = isAuthenticated().token;
  useEffect(() => {

    const user = isAuthenticated()
    const subContracter = isAuthenticated().subContracter;
    const client = isAuthenticated().client;
    const token = isAuthenticated().token;
    const folderId = props.match.params.id;

    setgetfile(folderId);

    //// file get function

    getFilebyFolder(token, folderId).then((data) => {
      // console.log("data ==>",data)
      if (data.error) {
      } else {
       
        setstate(data);     
        // console.log(data)   
      }
      
    });
  }, []);
  




  const deleteFile = (id) =>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete){
        fetch(`http://localhost:8080/modelFile/delete/${id}`, {
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
        swal(`Poof! Your file has been deleted!`, {
          icon: "success",
        });
      } else {
        swal("Your file is safe!");
      }
    }
    });

  }
  function download (name) {
    // alert(name)
    return fetch(`http://localhost:8080/download/${name}`,{
      method:"GET",

    }).then(async (image)=>{

        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const link = document.createElement('a')
        link.href = imageURL

    link.download = name.slice(33)
    document.body.appendChild(link)

    link.click()
    document.body.removeChild(link)
    })
    // .then( res => res.blob())
    //   .then( blob => {
    //   var file = window.URL.createObjectURL(blob);
    //   window.location.assign(file);
    
    // });
  
  }



  const signout = () => {
    clientSignout();
    console.log("Signout Successfull");
    window.location.reload();
  };
  // Extracting first letter of name
  // var str = isAuthenticated().client.name;
  // var result = str.substring(0, 1);

  // const filenameHandler = (folder) =>{
  //   fetch(`http://localhost:8080/download`, {
  //    method: "POST",
  //    body:folder,
  //    headers: {
  //      origin:"",
  //      Accept: "application/json",
  //      "Content-Type": "application/json",
  //     //  Authorization: `Bearer ${token}`,
  //    },
  //  })

  // }
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
                    {isAuthenticated().subContracter.name}
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
        <Pop_up_Modal getfile={getfile}></Pop_up_Modal>

        <div className="tableDiv">
       <table id="table">
            <tr>
            <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>File</th>
              <th>Action</th>
            </tr> 
             {
               state.map((file) =>(
                 <tr>
                    <td>{file.createdAt.slice(0, 10)}</td>
                   <td>{file.createdAt.slice(11, 19)}</td>
                   <td>{file.name}</td>
                   <td>{file.image.slice(33)}</td>
                   <td><button onClick={() =>download(file.image)} className="download">
                     Download
                     </button>
                     <button onClick={() =>deleteFile(file._id)} className="delete">Delete</button></td>
                 </tr>
               ))
             }
        
       </table>
        </div>
      </div>
    </>
  );
}

export default Admin_Files;
