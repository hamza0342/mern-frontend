import React, { useState, useEffect } from 'react'
import Pop_up_newFolder_Mir from './Admin_Pop_up/Admin_Pop_up_newFolder_Mir';
import { Link } from "react-router-dom";
import "../../scss/assests.scss";
import { getMirFolderbyProject } from "./adminapi";
import { singleProject } from './adminapi'
// import Comments from './admin-components/Admin_comments'
import { Spin } from 'antd';
import { isAuthenticated } from "../../authentication/index";
import DeleteIcon from "@material-ui/icons/Delete";
import Folder from "../../images/folder4.png"
import swal from 'sweetalert';


function M_i_r(props) {



  const [state, setstate] = useState([]);
  const [project, setProject] = useState("");
  const [comments, setComments] = useState([])
  const [loading, setloading] = useState(true)
  // console.log(props)
  const folderId = props.match.params._id;
  // console.log("Props==>", folderId);

  useEffect(() => {
    const token = isAuthenticated().token;
    // const clientId = isAuthenticated().client._id;

    //project id
    const projectId = props.match.params.id;
    // console.log("Props==>", projectId);
    // console.log("token =>" + token);

    setloading(true)
    getMirFolderbyProject(token, projectId).then((data) => {
      // console.log("data ==>",data)
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("data ==>", data);
        setstate(data);
        setloading(false);
      }
    });

    singleProject(token ,projectId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("Project Details ==>", data)
        setProject(data)
        setComments(data.comments)
      }
    })


  }, []);


  // const updateComments = comments => {
  //   setComments(comments)
  //   // console.log("Updated Array", comments)
  // }


  const getIdAndDeleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch(`http://localhost:8080/folder/delete/${id}`, {
            method: "DELETE",
            //   body: JSON.stringify({
            //     id: folderId,
            //   }),
            headers: {
              Accept: "application/json",
              // "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
            // console.log(response);
            return response.json();
          });

          if (willDelete) {
            swal(`Poof! Your imaginary file has been deleted!`, {
              icon: "success",
            });
          } else {
            swal("Your imaginary file is safe!");
          }
        }
      });

  }
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
        <Spin size="large" tip="Folders Loading..." />
      </div>

    )
  }
  return (
    < >
      <div className="upload_model">
        <Pop_up_newFolder_Mir {...props} />
      </div>
      <div className="folders flex-container">
        <ul>
          {state.map((folder) => (
            <li key={folder._id}>
              <div className="btn">
                <img src={Folder} alt="folder" width="130" height="80"></img>
                <div className="fold">
                  <div>
                    <Link to={`/admin_mirfile/${folder._id}`}>
                      <div className="upload_btn">
                        <div className="content"> View Folder</div>
                      </div>
                    </Link>
                  </div>


                  <div className="delete">

                    <button onClick={() => getIdAndDeleteHandler(folder._id)}>

                      <DeleteIcon />
                    </button>
                  </div>
                </div>
                <div className="title">
                  {folder.title}
                </div>

              </div>

            </li>
          ))}
        </ul>
        {/* <div className="flex-childs project-wall" style={{ width: 400,height:600, marginTop:-90 }}>
          <p className="heading mt-2 ml-2 mb-0">Project Wall</p>
          <hr className="mb-0" />
          <Comments project={project._id} commentss={comments} updateComments={updateComments} />
        </div> */}
      </div>
    </>
  );
}

export default M_i_r
