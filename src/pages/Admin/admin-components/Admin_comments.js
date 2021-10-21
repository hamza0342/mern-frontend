import React, { useState } from 'react';
import { Comment, Empty, Avatar, Input } from 'antd';
import { comment, uncomment } from "../../Client/clientapi"
import { DeleteOutlined } from '@ant-design/icons';
import { isAuthenticated } from "../../../authentication/index";


const Comments = ({ project, commentss, updateComments }) => {

  const [value, setValue] = useState("");
  const [error, setError] = useState("");

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
      const clientId = isAuthenticated().admin._id;
      const projectId = project;
      const token = isAuthenticated().token;
      const coment = { text: value };

      comment(clientId, token, projectId, coment)
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            console.log("posted", data)
            setValue("")
            setError("")
            //dispatch fresh list of comments to the display page
            updateComments(data.comments);
          }
        })
    }
  }

  const deleteComment = (comment) => {
    const clientId = isAuthenticated().admin._id;
    const projectId = project;
    const token = isAuthenticated().token;
    uncomment(clientId, token, projectId, comment)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Deleted", data.comments)
          updateComments(data.comments);
        }
      })
  }
  const deleteConfirmed = (post) => {
    let answer = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (answer) {
      deleteComment(post);
    }
  }
  return (
    <>
      {/* <Comment
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
                {commentss.length} Comments
              </h6>

              {commentss.length ? commentss.map((coment, i) => (
                <div key={i} className="mt-4 mb-4 comment-list">
                  <Avatar
                    className="float-left mr-3 mb-2"
                    style={{
                      backgroundColor: "black"
                    }}
                    size={35}
                  >
                    {coment.postedBy.name.substring(0, 1)}
                  </Avatar>
                  <div>
                    <p><b className="mr-1">{coment.postedBy?.name ?? "Unknown"}</b> {coment.created.substring(0, 10)}
                      {isAuthenticated().admin._id === coment.postedBy._id && (
                        <>
                          <span
                            className="text-info float-right mr-1"
                          ><DeleteOutlined onClick={() => deleteConfirmed(coment)} /></span>
                        </>
                      )}</p>
                    <p className="mb-1 mt-1" style={{ overflow: "auto" }}>{coment.text}</p>

                  </div>
                </div>
              )) : <Empty description={<span><b>No comments</b></span>} />
              }
            </div>

          </div>
        }
      /> */}
    </>
  );
}

export default Comments;