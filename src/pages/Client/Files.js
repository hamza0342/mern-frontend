import React, { useEffect, useState } from "react";
import "../../scss/file.scss";
import MainLayout from "./client-components/Layout";
import Pop_up_Modal from "./Pop_up/Pop_up_Modal";
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import PDFViewer from 'pdf-viewer-reactjs'
import { clientSignout, isAuthenticated } from "../../authentication/index.js";
import "../../scss/client.scss";
import { Layout, Menu, Dropdown, Avatar, Alert } from "antd";
import { FilePdfTwoTone } from '@ant-design/icons';
import { getFilebyFolder } from "./clientapi";
const { Header, Content, Footer } = Layout;

function Files(props) {

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [getfile, setgetfile] = useState([]);
  const [state, setstate] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);
  let   [del, setdel] = useState(0)
  let   [count , setCount] = useState(0);
  const token = isAuthenticated().token;

 let handleChildUpdate = () =>{
   setCount(++count)
 }
  useEffect(() => {

    const user = isAuthenticated()
    const subContracter = isAuthenticated().subContracter;
    const client = isAuthenticated().client;
    const token = isAuthenticated().token;
    const folderId = props.match.params._id;

    setgetfile(folderId);

    //// file get function

    getFilebyFolder(token, folderId).then((data) => {
      console.log("data ==>", data)
      if (data.error) {
      } else {

        setstate(data);
       
      }

    });
  }, [count , del]);





  const deleteFile = (id, name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`http://localhost:8080/modelFile/delete/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
            //   body: JSON.stringify({
            //     id: folderId,
            //   }),
           
          }).then((response) => {
           
            setdel(++del)
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
    // .then( res => res.blob())
    //   .then( blob => {
    //   var file = window.URL.createObjectURL(blob);
    //   window.location.assign(file);

    // });

  }

  const openPdf = (imagename) => {
    console.log("in blaaa")
    return fetch(`http://localhost:8080/readFile/uploads/${imagename}`, {
      method: "GET",

      headers: {
        Accept: "application/pdf",
        "Content-Type": "application/pdf",

      },
    })
      .then(res => res.blob())
      .then(blob => {
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
      });


  }

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

  const signout = () => {
    clientSignout();
   
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
  var str = isAuthenticated().client.name;
  var result = str.substring(0, 1);


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
        <Pop_up_Modal getfile={getfile} callback={handleChildUpdate}></Pop_up_Modal>

        <div className="tableDiv">
          <table id="table">
            <tr>
              <th>Date</th>
              {/* <th>Uploaded By</th> */}
              <th>Name</th>
              <th>File</th>
              <th>Action</th>
            </tr>
            {
              state.map((file) => (
                <tr>
                  {/* {console.log(file.belongsTo)} */}
                  <td>{file.createdAt.slice(0, 10)}</td>
                  {/* <td scope="col">{file.uploadedBy}</td> */}
                  <td>{file.name}</td>
                  <td style={{ wordWrap: "break-word", overflowX: "hidden" }}>{file.image.slice(33)}</td>
                  <td>
                    <button onClick={() => download(file.image)} className="download">Download</button>
                    <button onClick={() => deleteFile(file._id, file.image)} className="delete">Delete</button>
                    <button onClick={() => openPdf(file.image.slice(8))} className="pdf"><FilePdfTwoTone style={{ fontSize: 20 }} />Open</button>
                  </td>
                </tr>
              ))
            }

          </table>
        </div>
        <div className='pdf-container'>
          {/* show pdf conditionally (if we have one)  */}
          {viewPdf && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl={viewPdf}
              plugins={[defaultLayoutPluginInstance]} />
          </Worker></>}

          {/* if we dont have pdf or viewPdf state is null */}
          {/* {!viewPdf&&<>No pdf file selected</>} */}
        </div>


      </div>
    </>
  );
}

export default Files;
