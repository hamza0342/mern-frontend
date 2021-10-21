import React, { useState, useEffect } from "react";
import FileUploadScreen from "../../screen/fileUploadScreen";
import { getSingleFile, getMultipleFiles } from "../../data/api";
import { Empty } from "antd";
function File() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const getSingleFileList = async () => {
    try {
      const fileList = await getSingleFile();
      console.log("FileList", fileList);
      setSingleFiles(fileList);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getMultipleFilesList = async () => {
    try {
      const fileList = await getMultipleFiles();
      setMultipleFiles(fileList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleFileList();
    getMultipleFilesList();
  }, []);
  // let itemToRender;
  // if(singleFiles){
  //   itemToRender = singleFiles.map(file=>{
  //     return <div key={index}><p>{singleFiles}</p></div>
  //   })
  // }else{
  //   itemToRender ="Loading ...."
  // }
  console.log("1", singleFiles);
  console.log("2", multipleFiles);
  return (
    <>
      <div className="container">
        <h3 className="text-danger font-weight-border  border-bottom text-center">
          FMC FORMS
        </h3>
        <FileUploadScreen
          getSingle={() => getSingleFile()}
          getMultiple={() => getMultipleFiles()}
        />
      </div>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-6">
            <h4 className="text-success font-weight-border">
              Single File Upload Status
            </h4>
            <div className="row">
              {singleFiles.length ? (
                singleFiles.map((file, index) => (
                  <div className="col-6">
                    <p>{file.fileName}</p>
                  </div>
                ))
              ) : (
                <Empty />
              )}
            </div>
          </div>
          <div className="col-6">
            <h4 className="text-success font-weight-bold">
              Multiple File Upload Status
            </h4>
            {/* <div className="row">
              {
                multipleFiles.length ? multipleFiles.map((element,index)=>
                  <div className="col-6" key={element._id}>
                    <h6 className="text-danger font-weight-bold">{element.title}</h6>
                    <div className="row">
                      {
                        element.files.map((file,index)=>
                          <div className="col-6">
                            <p>{file.fileName}</p>
                          </div>
                        )
                      }
                    </div>
                  </div>
                )
              : <Empty />}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default File;
