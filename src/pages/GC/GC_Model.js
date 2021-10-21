import React, { useState, useEffect } from 'react'
import Pop_up_Model_Revit from './GC_Pop_up/GC_Pop_up_Model_Revit'
import swal from 'sweetalert';
import { getrvtfiles } from './gcapi';
import Swal from 'sweetalert2'
import { isAuthenticated } from '../../authentication';

let timerInterval
function GC_Model(props) {
  const [getfile, setgetfile] = useState([]);
  const [state, setstate] = useState([]);
  let   [count, setCount] = useState(0)
  const role = isAuthenticated().subContractor.role;



  
let handleChildUpdate = (req,res)=>{
  setCount(++count)
  console.log(count)
}
  useEffect(() => {

    const token = isAuthenticated().token;
    const projectId = props.match.params.projectId;
    // console.log(projectId)

    setgetfile(projectId);

    //// file get function

    getrvtfiles(token, projectId).then((res) => {
      // console.log("data ==>", data)
      if (res.error) {

      } else {

        setstate(res);
        console.log(res)
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


  }, [count]);


  // const deleteFile = (id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this folder!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //     .then((willDelete) => {
  //       if (willDelete) {
  //         fetch(`http://localhost:8080/rvt/delete/${id}`, {
  //           method: "DELETE",
  //           //   body: JSON.stringify({
  //           //     id: folderId,
  //           //   }),
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             // Authorization: `Bearer ${token}`,
  //           },
  //         }).then((response) => {
  //           // console.log(response);
  //           window.location.reload()
  //           return response.json();
  //         });

  //         if (willDelete) {
  //           swal(`Poof! Your folder has been deleted!`, {
  //             icon: "success",
  //           });
  //         } else {
  //           swal("Your folder is safe!");
  //         }
  //       }
  //     });

  // }
  // function download(name) {
  //   // alert(name)
  //   return fetch(`http://localhost:8080/download/${name}`, {
  //     method: "GET",

  //   }).then(async (image) => {

  //     const imageBlog = await image.blob()
  //     const imageURL = URL.createObjectURL(imageBlog)

  //     const link = document.createElement('a')
  //     link.href = imageURL

  //     link.download = name.slice(33)
  //     document.body.appendChild(link)

  //     link.click()
  //     document.body.removeChild(link)
  //   })

  // }


  function open_Viewer(name) {
    // alert(name)
    return fetch(`http://localhost:8080/api/forge/datamanagement/bucket/upload/${name}`, {
      method: "post",

    }).then(

      Swal.fire({
        title: 'Please wait! Your model is opening',
        html: 'Loading files <b></b>',
        timer: 25000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
    )

  }

  return (
    <>
      {
        role == "designer" ? (<Pop_up_Model_Revit getfile={getfile} callback={handleChildUpdate} />  ) : ("")
      }

      <div className="tableDiv">
        <table style={{ "tableLayout": "fixed" }} id="table">
        <tr>
            <th scope="col">Date</th>
            <th scope="col" style={{width:200}}>Uploaded By</th>
            <th scope="col" style={{width:200}}>Name</th>
            <th scope="col"> File</th>
            {/* <th scope="col">File description</th> */}
            {/* <th scope="col"> File</th> */}
            <th scope="col">Action</th>
            
          </tr>
          {
            state.map((file) => (
              <tr>
                <td scope="col">{file.createdAt.slice(0, 10)}</td>
                <td scope="col">{file.uploadedBy}</td>
                <td scope="col">{file.name}</td>
                <td scope="col" style={{ wordWrap: "break-word", overflowX: "hidden" }}>{file.image.slice(33)}</td>
                {/* <td scope="col">{file.name}</td> */}
                <td scope="col" >
                  <div className="btns">
                    <div>
                      <button onClick={() => open_Viewer(file.image)} className="forge">
                        open viewer
                      </button>
                    </div>
{/* 
                    <div>
                      <button onClick={() => download(file.image)} className="download" style={{ backgroundColor: "#ff9933" }}>
                        Download
                      </button>
                    </div> */}
                    {/* <div>
                      <button onClick={() => deleteFile(file._id)} className="delete" style={{ backgroundColor: "red" }}>
                        Delete
                      </button>
                    </div> */}
                  </div>



                </td>
              </tr>
            ))
          }

        </table>
      </div>
    </>
  )
}


export default GC_Model
