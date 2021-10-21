import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { Link, useHistory } from "react-router-dom";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { isAuthenticated } from "../../authentication/index";

function Delete(props) {
  const folderId = props.match.params._id;
  console.log("Props==>", folderId);

  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = (folderId) => {
    fetch(`http://localhost:8080/folder/delete/${folderId}`, {
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
    
      return response.json();
    });
  };

  useEffect(() => {
    handleClickOpen();
  },[]);
  return (
  
      <div>
        {alert("be carefull")}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{folderId}</DialogTitle>

          <DialogActions>
            <button onClick={handleClose}>
              Disagree
            </button>

            <button onClick={handleDelete(folderId)}>
              Agree
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default Delete;
