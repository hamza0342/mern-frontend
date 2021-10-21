import React, { useState, useEffect } from 'react'
import Pop_up_newFolder_360 from '../Client/Pop_up/Pop_up_newFolder_360'
import { Spin } from "antd"
import { Link } from "react-router-dom";
import "../../scss/assests.scss";
import { gettourFolderbyProject, singleProject } from './gcapi';
import { isAuthenticated } from "../../authentication/index";
import DeleteIcon from "@material-ui/icons/Delete";
import Folder from "../../images/folder4.png"
import swal from 'sweetalert';
import Comments from './gc-component/comments';
function GC_Assests(props) {
  // console.log(props)
  const token = isAuthenticated().token;
  const role = isAuthenticated().subContractor.role;

  const [state, setstate] = useState([]);
  let [count , setCount] = useState(0);
  const [project, setProject] = useState("");

  
  // const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([])

  let handleChildUpdate = (req,res)=>{
    setCount(++count)

  }
 
  useEffect(() => {
    const token = isAuthenticated().token;
    // const clientId = isAuthenticated().client._id;

    //project id
    const projectId = props.match.params.projectId;
    // console.log("Props==>", projectId);
    // console.log("token =>" + token);


    // setLoading(true)
    gettourFolderbyProject(token, projectId).then((res) => {
      // console.log("data ==>",data)
      if (res.error) {
        console.log(res.error);
      } else {
        // console.log("data ==>", data);
        setstate(res);

        // setLoading(false)
      }
    });



    singleProject(token, projectId).then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        // console.log("Project Details ==>", data)
        setProject(res)
        setComments(res.comments)
      }
    })
  }, [count]);

  // const getIdAndDeleteHandler = (id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this imaginary folder!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //     .then((willDelete) => {
  //       if (willDelete) {
  //         fetch(`http://localhost:8080/tourfolder/delete/${id}`, {
  //           method: "DELETE",
  //           //   body: JSON.stringify({
  //           //     id: folderId,
  //           //   }),
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }).then((response) => {
  //           // console.log(response);
  //           return response.json();
  //         });

  //         if (willDelete) {
  //           swal(`Poof! Your imaginary folder has been deleted!`, {
  //             icon: "success",
  //           });
  //         } else {
  //           swal("Your imaginary folder is safe!");
  //         }
  //       }
  //     });

  // }

  // if (loading) {
  //   return (
  //     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 500 }}>
  //       <Spin size="large" tip="Folders Loading..." />
  //     </div>

  //   )
  // }

  const updateComments = comments => {
    setComments(comments)
    // console.log("Updated Array", comments)
  }
  return (
    <>
      <div className="upload_model">
        {
          role == "designer" ? (
            <Pop_up_newFolder_360 {...props} callback={handleChildUpdate}/>
          ) : ("")
        }

      </div>
      <div className="folders flex-container">
        <ul>
          {state.map((folder) => (
            <li key={folder._id}>
              <div className="btn">
                <img src={Folder} alt="folder" width="130" height="80"></img>
                <div className="fold" >
                  <div style={{ marginLeft: 23 }}>
                    <Link to={`/gc360files/${folder._id}`}>
                      <div className="upload_btn">
                        <div className="content"> View Folder</div>
                      </div>
                    </Link>
                  </div>

                  {
                    role == "designer" ? (<div className="delete">
                      {/* 
                      <button onClick={() => getIdAndDeleteHandler(folder._id)}>

                        <DeleteIcon />
                      </button> */}
                    </div>) : ("")
                  }

                </div>
                <div className="title">
                  {folder.title}
                </div>

              </div>

            </li>
          ))}
        </ul>
        <div className="flex-childs project-wall" style={{ width: 400, height: 600 }}>
          <p className="heading mt-2 ml-2 mb-0">Project Wall</p>
          <hr className="mb-0" />
          <Comments project={project._id} commentss={comments} updateComments={updateComments} />
        </div>
      </div>
    </>
  )
}

export default GC_Assests