import React, { useEffect, useState } from "react";
import "../../scss/file.scss";
import MainLayout from "./client-components/Layout";
import Pop_up_Modal_Mir from "./Pop_up/Pop_up_Model_Mir";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import DownloadIcon from '@mui/icons-material/Download';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { clientSignout, isAuthenticated } from "../../authentication/index.js";
import { FilePdfTwoTone } from '@ant-design/icons';
import Pdf from '../../images/pdf3.png'
import "../../scss/client.scss";
import { Layout, Menu, Dropdown, Avatar, Alert } from "antd";
import { getmirFilebyFolder, getPdfmirFilebyFolder, getApprovedFiles } from "./clientapi";
import Pop_up_Pdf from "./Pop_up/Pop_up_Pdf";
import { compose, style } from "@mui/system";
import { BluetoothDisabled } from "@material-ui/icons";

const { Header, Content, Footer } = Layout;


function Mir_file(props) {


  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState('');
  const [viewPdf, setViewPdf] = useState(null);
  const [getfile, setgetfile] = useState([]);
  const [fileId, setfileId] = useState([])
  const [state, setstate] = useState([]);
  const [approved, setapproved] = useState([]);
  const [iss, setissue] = useState([]);
  let   [del, setdel] = useState(0)
  let   [count , setCount] = useState(0);
  
  

  const folderId = props.match.params.id;
  const token = isAuthenticated().token;

  const Client = isAuthenticated().client.name

  let handleChildUpdate = (req,res)=>{
    setCount(++count)
    console.log(count)
  }

  useEffect(() => {
    const token = isAuthenticated().token;
    const folderId = props.match.params.id;
    console.log(folderId)
    setgetfile(folderId);

    
    
    getmirFilebyFolder(token, folderId).then((data) => {

      
 

        setstate(data);
      
 

    }).catch((err)=>{
      console.log(err.message)
    });


    getPdfmirFilebyFolder(token).then((data) => {

        setissue(data.data)
      

  

    }).catch((err)=>{
      console.log(err)
    })


    getApprovedFiles(token).then((data) => {
     
        setapproved(data.Message)
  
    }).catch((err)=>{
      console.log(err.message)
    })

  },[count , del]);


  // const resolveFile = (id) => {
  //   return fetch(`http://localhost:8080/updateStatus/${id}`, {
  //     method: "PATCH",
  //     headers: {

  //       Authorization: `Bearer ${token}`,
  //     },

  //   })
  // }


  const deleteSub = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`http://localhost:8080/deleteMirSubFiles/${id}`, {
            method: "DELETE",
            // body: JSON.stringify({name}),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            console.log(response);
            setdel(++del)
            // window.location.reload()
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



  const FileId = (fileID) => {
    console.log(fileID)
    setfileId(fileID)
  }

  const fileType = ['application/pdf'];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError('');
        }
      }
      else {
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else {
      console.log('select your file');
    }
  }

  const handleComment = () => {

  }

  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    }
    else {
      setViewPdf(null);
    }
  }

  const deleteFile = (id) => {
    const token = isAuthenticated().token;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this folder!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`http://localhost:8080/mirFile/by/${id}`, {
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
            setdel(++del)
            // window.location.reload()
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

  const handleChange = (e) => {

    console.log(e.target.value)

  }

  const idesssss = (subFileId, fileID) => {
    // const formdata = new FormData();
    //     formdata.append("subFileId", subFileId);

    return fetch(`http://localhost:8080/updateStatus/${fileID}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subFileId })

    })

  }



  const signout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
    }
    <Link to="/"></Link>
    
    window.location.reload();
  }

  var str = isAuthenticated().client.name;
  var result = str.substring(0, 1);


  // const menu = (
  //   <Menu style={{ width: 120 }}>
  //     <Menu.Item key="0">
  //       <Link to="/client/profile">Profile</Link>
  //     </Menu.Item>
  //     <Menu.Item key="1" onClick={signout}>
  //       Signout
  //     </Menu.Item>
  //   </Menu>
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
        <Pop_up_Modal_Mir getfile={getfile} callback={handleChildUpdate}></Pop_up_Modal_Mir>

        <div className="tableDiv">
          <table id="table">
            <tr>
              <th>Name</th>
              <th>File</th>
              {/* <th>Resolve / Un-Resolve</th> */}
              {/* <th>ID</th> */}
              <th>Revision</th>
              <th style={{ width: 50 }}>Status</th>
              <th style={{ width: 50 }}>Action</th>
              <th>Approved File</th>
            </tr>
            {
              state.map((file) => (
                <tr className="rowsss">
                  <td>{file.name}</td>
                  <td style={{ wordWrap: "break-word", overflowX: "hidden", width: 100 }}>{file.image.slice(33)}</td>

                  {/* <td style={{ width: 200 }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        defaultValue="unresolve"
                        name="radio-buttons-group"
                        // value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="resolve" control={<Radio />} label="Resolve" />
                        <FormControlLabel value="unresolve" control={<Radio />} label="Un-Resolve" />
                      </RadioGroup>
                    </FormControl>
                  </td> */}
                  {/* <td>{file._id}</td> */}

                  <td style={{ width: 500 }}>
                    <div>
                      {
                        iss.map((iss) => (
                          <div style={{ backgroundColor: "white", border: "2px  gray", borderBottom: "none", borderLeft: "none", borderRight: "none" }}>


                            {
                              file._id == iss.belongsTo ?
                                (
                                  <div style={{}}>
                                    <p className="p" style={{ color: "rgb(156, 94, 8)", cursor: "pointer" }}><span style={{ fontSize: 15, paddingLeft: 2 }}>Comment :</span> {iss.text}</p></div>
                                )
                                : (" ")
                            }

                            {
                              file._id == iss.belongsTo ?
                                (
                                  <div style={{ float: "right", marginTop: 30, cursor: "pointer" }}>
                                    <DeleteIcon style={{ color: "red" }} onClick={() => deleteSub(iss._id)} />
                                  </div>
                                )
                                : (" ")
                            }
                            {
                              file._id == iss.belongsTo ?
                                (
                                  <div style={{ float: "right", marginTop: 30, cursor: "pointer", marginRight: 10 }}>
                                    <DownloadIcon style={{ color: "green" }} onClick={() => download(iss.image)} />
                                  </div>
                                )
                                : (" ")
                            }

                            {
                              file._id == iss.belongsTo ?
                                (
                                  <div style={{ marginBottom: 5, paddingLeft: 5 }}>
                                    <div onClick={() => openPdf(iss.image.slice(8))} style={{}}>
                                      <p className="p" style={{ color: "teal", cursor: "pointer" }}>File : {iss.image.slice(33)}</p>
                                      <p className="d">CLick here to open PDF</p>
                                    </div>

                                    <div>
                                      <p>Uploaded By : {Client == iss.uploadedBy ? (" You") : (iss.uploadedBy)} </p>
                                      <h6
                                        style={{
                                          float: "right",
                                          marginTop: -105,
                                          marginRight: 5
                                        }}
                                      >
                                        {
                                          Client == iss.uploadedBy ?
                                            (" ") : (<button className="resolve" onClick={() => idesssss(iss._id, file._id)} >Approve</button>)
                                        }
                                      </h6>
                                    </div>




                                  </div>
                                )
                                : (" ")
                            }

                          </div>



                        ))
                      }

                    </div>
                    <div style={{ textAlign: "center" }}>
                      {/* <button type="submit" className='btn btn-info btn-sm'>
                        VIEW
                      </button> */}
                      <Pop_up_Pdf fileId={file._id} idHandler={FileId} callbacks={handleChildUpdate} />
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>{file.status}</td>
                  <td style={{ textAlign: "center" }}>
                    <button onClick={() => download(file.image)} className="download" >
                      Download
                    </button>
                    <button onClick={() => deleteFile(file._id)} className="delete" style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20, marginLeft: 2 }}>Delete</button>
                    {/* <button onClick={() => resolveFile(file._id)} >Resolve</button> */}
                  </td>
                  <td className="approved" >
                    {
                      approved.map((map) => (
                        <div>
                          <div style={{ textAlign: "center" }}>
                          {file._id == map.belongsTo ? (<img onClick={() => openPdf(map.image.slice(8))} src={Pdf} alt="pdf" width="50" height="50"/>) : ("")}<br></br><br></br>
                            {file._id == map.belongsTo ? (map.image.slice(33)) : ("")} 
                        
                            
                          </div>  
                        </div>

                      ))
                    }
                  </td>
                </tr>
              ))
            }

          </table>
        </div>
      </div>
    </>
  )
}

export default Mir_file
