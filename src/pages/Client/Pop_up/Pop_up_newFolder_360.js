import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import Modal from '@material-ui/core/Modal';
import { isAuthenticated } from "../../../authentication/index";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Title from 'antd/lib/skeleton/Title';





const useStyles = makeStyles((theme) => ({




    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 5
    },
}));




function Pop_up_newFolder_360(props) {


    // let history = useHistory();
    const token = isAuthenticated().token;
    //   alert(token)

    const [open, setOpen] = useState(false);
    const [folderName, setfolderName] = useState('');
    //const [addFolders, setaddFolders] = useState([]);
    const classes = useStyles();



    const addFolder = async () => {
        const token = isAuthenticated().token;
    

        if (!folderName) {
            alert("Folder Name Required");
        } else {
            const projectId = props.match.params.projectId
  
   
            await fetch(`http://localhost:8080/tourfolder/new/${projectId}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,

                },
                body: JSON.stringify({
                    "title": folderName,
                }),


            }).then((res) => {
             
                props.callback()

                return res.json();
            }).catch((err) => {
                console.log(err)
            })

        }


    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <>
            <button className="button_1" type="button" onClick={handleOpen}>
                + New Folder
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
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h4 style={{ fontWeight: "500", color: "black", }}>Create New Folder</h4>
                        <p id="transition-modal-description">
                            <input
                                type="text"
                                name="title"
                                id="text"
                                value={folderName}
                                placeholder="Folder Name"
                                onChange={(e) => setfolderName(e.target.value)}
                                style={{
                                    width: "25vw",
                                    border: "none",
                                    borderBottom: "2px solid rgb(67, 164, 230)",
                                    padding: "5px",
                                    fontSize: "16px",
                                    marginTop: "20px"
                                }}>
                            </input>
                        </p>
                        <div>
                            <button
                                onClick={addFolder}
                                style={{
                                    color: "white",
                                    backgroundColor: "rgb(67, 164, 230)",
                                    border: "2px solid rgb(238, 233, 233)",
                                    borderRadius: "5px",
                                    padding: "4px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    marginTop: "10px"
                                }}>
                                Create
                            </button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default Pop_up_newFolder_360
