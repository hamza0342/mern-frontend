import React, { useState, useEffect } from 'react';
import { Comment, Empty, Avatar, Input } from 'antd';
import '../../../scss/comments.scss'
import { comment, uncomment } from "../clientapi";
import { DeleteOutlined } from '@ant-design/icons';
import { isAuthenticated } from "../../../authentication/index";
import { useParams } from 'react-router';
import { getcomments ,deleteComment } from '../clientapi';


const Comments = ({ project, commentss, updateComments, name }) => {

  const { projectId } = useParams()
 
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [commentsssss, setcomments] = useState([])

  useEffect(() => {
    getcomments(projectId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
     
        setcomments(data.comments);


      }
    })
  }, [])

  const isValid = () => {
    if (!value.length > 0) {
      setError("Empty comments are not allowed")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      const clientId = isAuthenticated().client._id;
      const projectId = project;
      const token = isAuthenticated().token;
      const coment = { text: value };

      comment(clientId, token, projectId, coment, name)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
          
            setValue("")
            setError("")
            //dispatch fresh list of comments to the display page
            updateComments(data.comments);
            window.location.reload()
          }
        })
    }
  }

 const deleteComment = async (Id) => {
    return await fetch(`http://localhost:8080/delete/comment/${Id}`, {
        method: "DELETE",
        body: JSON.stringify({
            id: Id,
        }),
        // headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        // },
    }).then((response) => {
     
        window.location.reload();
        return response.json();
      
    });
};
  // const deleteConfirmed = (post) => {
  //   let answer = window.confirm(
  //     "Are you sure you want to delete this comment?"
  //   );
  //   if (answer) {
  //     deleteComment(post);
  //   }
  // }
  return (
    <>
      <Comment
        content={
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  onChange={(e) => setValue(e.target.value)}
                  className="form-control"
                  value={value}
                  placeholder="Leave a comment"
                />
              </div>
            </form>
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
              {error}
            </div>
            <hr />
            <div className="col-md-12 col-md-offset-2">
              <h6 className="text-primary">
                {/* {commentsssss.length} Comments */}
              </h6>



              {
                commentsssss.map((coment, i) => (
                  <div key={i} className="comment">
                    <div className="cmnt" ><p className="para">{coment.comment}</p>
                      <p style={{ color: "black", fontWeight: "bold", marginTop: 5, fontFamily: "monospace" }}>
                        Posted By:
                        <span style={{ color: "gray", fontWeight: 600 }}>
                          {coment.postedBy == name ? "You" : coment.postedBy}
                          </span> 
                          </p>
                          
                    <div style={{ textAlign: "right", cursor: "pointer" }}>
                      <DeleteOutlined onClick={()=>deleteComment(coment._id)} style={{ color: "#640606", fontSize: 15, marginRight: 2 }} />
                    </div>
                    </div>


                  </div>
                ))
              }

              {/* {commentsssss.length ? commentsssss.map((coment, i) => (
                <div key={i} className="mt-4 mb-4 comment-list">
                  <Avatar
                    className="float-left mr-3 mb-2"
                    style={{
                      backgroundColor: "black"
                    }}
                    size={35}
                  >
                    
                  </Avatar>
                  <div>
                    <p><b className="mr-1">{coment.postedBy}</b> 
                      {isAuthenticated().client._id === coment.postedBy._id && (
                        <>
                          <span
                            className="text-info float-right mr-1"
                          ><DeleteOutlined onClick={() => deleteConfirmed(coment)} /></span>
                        </>
                      )}</p>
                    <p className="mb-1 mt-1" style={{ overflow: "auto" }}>{coment.text}</p>

                  </div>
                </div>
              )
              ) : <Empty description={<span><b>No comments</b></span>} />
              } */}
            </div>

          </div>
        }
      />
    </>
  );
}

export default Comments;