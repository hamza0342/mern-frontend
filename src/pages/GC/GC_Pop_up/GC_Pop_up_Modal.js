import React, { useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { isAuthenticated } from "../../../authentication";
//import { useDropzone } from 'react-dropzone';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
  },
}));

function Pop_up_Modal(props) {
  const [image, setImage] = useState("");
  const [name, setname] = useState("");
  const token = isAuthenticated().token;


  const modelData = async () => {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("image", image);
    const folderId = props.getfile;
    await fetch(`http://localhost:8080/modelFile/upload/${folderId}`, {
      method: "POST",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((result) => {
      props.callback()
     
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="button_1" type="button" onClick={handleOpen}>
        Upload File
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} style={{borderColor:"rgb(67, 164, 230)"}}>
          <div className={classes.paper}>
            <h4 id="transition-modal-title">Upload File</h4>
            <p id="transition-modal-description">
              <div className="container">
                <input
                  style={{
                    border: "none",
                    borderBottom: "2px solid rgb(67, 164, 230)",
                    fontSize:18,

                  }}
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  placeholder="Enter Name of file "
                ></input>
                <br></br><br></br>
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  name="image"
                  style={{
                    color:"rgb(67, 164, 230)"
                  }}
                ></input><br></br><br></br>
                <button
                  onClick={modelData}
                  style={{
                    color: "white",
                    backgroundColor: "rgb(67, 164, 230)",
                    border: "2px solid rgb(238, 233, 233)",
                    borderRadius: "5px",
                    padding: "4px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                  
                >
                  Upload
                </button>
              </div>
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default Pop_up_Modal;
