import React,{useState} from 'react'
import {singleFileUpload,multipleFileUpload} from "../data/api"
import {buildStyles, CircularProgressbar} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'


const FileUploadScreen = (props) =>{
    const [singleFile, setSingleFile] = useState('')
    const [multipleFile, setMultipleFile] = useState('')
    const [title,setTitle] = useState('')
    const [singleProgress, setSingleProgress] = useState(0)
    const [multipleProgress,setMultipleProgress] = useState(0)

    const singleFileChange = (e) =>{
        setSingleFile(e.target.files[0])
        setSingleProgress(0)
    }
    const multipleFileChange = (e) =>{
        setMultipleFile(e.target.files)
        setMultipleProgress(0)
    }
    const singleFileProgress = {
        onUploadProgress: (progressEvent) =>{
            const {loaded, total} = progressEvent;
            const percentage = Math.floor(((loaded/1000)*100)/(total/1000))
            setSingleProgress(percentage)
        }
    }

    const multipleFileProgress ={
        onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent
            const percentage = Math.floor(((loaded/1000)*100)/(total/1000))
            setMultipleProgress(percentage)
        }
    }

    const uploadSingleFile =  async()=>{
        const formData = new FormData()
        formData.append('file', singleFile)
        await singleFileUpload(formData,singleFileProgress)
        props.getSingle()
    }
    const uploadMultipleFile = async()=>{
        const formData = new FormData()
        formData.append('title',title)
        for(let i=0; i < multipleFile.length; i++){
            formData.append('files', multipleFile[i])
        }
        await multipleFileUpload(formData,multipleFileProgress)
        props.getMultiple()
    }
    return(
        <div className="row mt-3">
            <div className="col-6">
                <div className="form-group">
                    <label>Select Single File</label>
                    <input type="file" className="form-control" onChange={(e) => singleFileChange(e)} />
                </div>
                <div className="row">
                    <div className="col-10">
                        <button type="button" className="btn btn-danger" onClick={() => uploadSingleFile()}>Upload</button>
                    </div>
                    <div className="col-2">
                        <CircularProgressbar 
                            value={singleProgress}
                            text={`${singleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap:'butt',
                                textSize:'16px',
                                pathTransitionDuration: 0.5,
                                pathColor:`rgba(0, 153, 153, ${singleProgress /100})`,
                                textColor: '#f88',
                                trailColor:"#d6d6d6",
                                backgroundColor:"#3e98c7"
                            })}
                        />
                    </div>
                </div>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-6">
                        <label>Title</label>
                        <input type="text" placeholder="Enter title for your reports" className="form-control" onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Select Mulitple File</label>
                    <input type="file" className="form-control" multiple onChange={(e)=>multipleFileChange(e)}/>
                </div>
                <div className="row">
                    <div className="col-10">
                        <button type="button" className="btn btn-danger" onClick={()=> uploadMultipleFile()}>Upload</button>
                    </div>
                    <div className="col-2">
                        <CircularProgressbar 
                            value={multipleProgress}
                            text={`${multipleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap:'butt',
                                textSize:'16px',
                                pathTransitionDuration: 0.5,
                                pathColor:`rgba(0, 153, 153, ${multipleProgress /100})`,
                                textColor: '#f88',
                                trailColor:"#d6d6d6",
                                backgroundColor:"#3e98c7"
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FileUploadScreen