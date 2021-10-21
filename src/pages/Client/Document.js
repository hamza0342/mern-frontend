import React, { useEffect, useState } from "react";
import "../../scss/model.scss";
import { Link, useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { singleProject } from './clientapi'
import { Spin } from "antd";
import Pop_up_newFolder_Documents from "./Pop_up/Pop_up_newFolder_Documents";
import { isAuthenticated } from "../../authentication/index";
import Comments from "./client-components/comments";
import { getFolderbyProject, } from "./clientapi";
import Folder from "../../images/folder4.png"
import swal from 'sweetalert';

function Document(props) {

  // let history = useHistory();
  //const [getFolders, setgetFolders] = useState([])
  //const [foldersss, setfoldersss] = useState([]);
  const [state, setstate] = useState([]);
  const [project, setProject] = useState("");
  const [comments, setComments] = useState([])
  let   [del, setdel] = useState(0)
  let   [count , setCount] = useState(0);
  

  const token = isAuthenticated().token;
  const name = isAuthenticated().client.name
  let handleChildUpdate = (req,res)=>{
    setCount(++count)
    console.log(count)
  }
  useEffect(() => {
    const token = isAuthenticated().token;
    // const clientId = isAuthenticated().client._id;

    //project id
    const projectId = props.match.params.projectId;
   
   getFolderbyProject(token, projectId).then((data) => {
      // console.log("data ==>",data)
      if (data.error) {
        console.log(data.error);
      } else {
        
        setstate(data);
        // setloading(false)
      }
    });



    singleProject(token, projectId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
      
        setProject(data)
        setComments(data.comments)
      }


    })
  }, [count , del]);
  
  const updateComments = comments => {
    setComments(comments)
    
  }

  const getIdAndDeleteHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this folder!",
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
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }).then((response) => {
          
            setdel(++del)
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
  //   if(loading){
  //     return(
  //       <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" , height:500}}>
  // <Spin size="large"  tip="Folders Loading..."/>
  //       </div>

  //     )
  //   }

  return (
    <>
      <div className="upload_model">
        <Pop_up_newFolder_Documents {...props} callback={handleChildUpdate} />
      </div>
      <div className="folders flex-container">
        <ul>
          {state.map((folder) => (
            <li key={folder._id}>
              <div className="btn">
                <img src={Folder} alt="folder" width="130" height="80"></img>
                <div className="fold">
                  <div>
                    <Link to={`/folder/${folder._id}`}>
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
        <div className="flex-childs project-wall" style={{ width: 500 }}>
          <p className="heading mt-2 ml-2 mb-0">Project Wall</p>
          <hr className="mb-0" />
          <Comments project={project._id} commentss={comments} updateComments={updateComments} name={name}/>
        </div>
      </div>
    </>
  );
}

export default Document;
