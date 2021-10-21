import React, { useState, useEffect } from "react";
import "../../scss/revit.scss";
import { Link } from "react-router-dom";
import Pop_up_Model_Revit from "./Admin_Pop_up/Admin_Pop_up_Model_Revit";
import { clientSignout, isAuthenticated } from "../../authentication/index.js";
import { getrvtfiles } from "./adminapi";
import swal from 'sweetalert';
import Axios from "axios";
import { FontDownload } from "@material-ui/icons";

// const { Header, Content, Footer } = Layout;

function Model(props) {
  // console.log(props)
  const [getfile, setgetfile] = useState([]);
  const [state, setstate] = useState([]);
  const { token } = isAuthenticated().token;
  useEffect(() => {

    const token = isAuthenticated().token;
    const user = isAuthenticated();
  
    const projectId = props.match.params.id;
    // console.log(projectId)

    setgetfile(projectId);

    //// file get function

    getrvtfiles(token , projectId).then((data) => {
      console.log("data ==>", data)
      if (data.error) {

      } else {

        setstate(data);
        // console.log(data)
      }

    });

    fetch('http://localhost:8080/api/forge/oauth', {
      method: "GET",
      headers: {
        Accept: "application/json",
        'content-type': 'application/x-www-form-urlencoded',

      }
    }).then((data) => {
      // console.log(data)
    }).catch((err) => {
      console.log(err.message)
    })


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
          fetch(`http://localhost:8080/rvt/delete/${id}`, {
            method: "DELETE",
            //   body: JSON.stringify({
            //     id: folderId,
            //   }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`,
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


  function open_Viewer(name) {
    // alert(name)
    return fetch(`http://localhost:8080/api/forge/datamanagement/bucket/upload/${name}`, {
      method: "post",

    })

  }




  return (
    <>

      <Pop_up_Model_Revit getfile={getfile} />
      <div className="tableDiv">
        <table  style={{"tableLayout":"fixed"}} id="table">
          <tr>
          <th scope="col">Date</th>
            {/* <th scope="col">Time</th> */}
            <th scope="col">File Uploaded By</th>
            <th scope="col"> File</th>
            {/* <th scope="col"> File</th> */}
            <th scope="col">Action</th>
          </tr>
          {
            state.map((file) => (
              <tr>
                 <td scope="col">{file.createdAt.slice(0, 10)}</td>
                {/* <td scope="col">{file.createdAt.slice(11, 19)}</td> */}
                <td scope="col">{file.name}</td>
                <td scope="col" className="image">{file.image.slice(33)}</td>
                {/* <td scope="col">{file.name}</td> */}
                <td scope="col" >
                  <div className="btns">
                    <div>
                      <button onClick={() => open_Viewer(file.image)} className="forge">
                        open viewer
                      </button>
                    </div>

                    <div>
                      <button onClick={() => download(file.image)} className="download" style={{ backgroundColor: "#ff9933" }}>
                        Download
                      </button>
                    </div>
                    <div>
                      <button onClick={() => deleteFile(file._id)} className="delete" style={{ backgroundColor: "red" }}>
                        Delete
                      </button>
                    </div>
                  </div>



                </td>
              </tr>
            ))
          }

        </table>
      </div>

    </>
  );
}

export default Model;
