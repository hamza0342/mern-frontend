import React, { useState, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDropzone } from 'react-dropzone';
import Model_window from '../New_windows/Model_window';
import { Provider } from '../Context/Context';

export const myContext = React.createContext();



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
        borderRadius: 5,

    },
}));


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};


function Pop_up_File() {

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [sendFile, setsendFile] = useState([]);



    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.type}
        </li>
    ));

    const modelData = () => {
        setsendFile([...sendFile, files])
        // console.log(sendFile)

    }


    const {

        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: 'image/' });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

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
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h4 id="transition-modal-title">Upload File</h4>
                        <p id="transition-modal-description">
                            <div className="container">
                                <div {...getRootProps({ style })}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                                <aside>
                                    <h4>Files</h4>
                                    <ul>{files}</ul>
                                

                                </aside>
                            </div>

                            <div >
                                <button
                                    onClick={modelData}
                                    style={{
                                        color: "white",
                                        backgroundColor: "rgb(67, 164, 230)",
                                        border: "2px solid rgb(238, 233, 233)",
                                        borderRadius: "5px",
                                        padding: "4px",
                                        paddingLeft: "10px",
                                        paddingRight: "10px"
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
    )
}

export default Pop_up_File
