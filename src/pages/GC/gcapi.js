export const getProjectBysubContractor = (subId) =>{
    return fetch(`http://localhost:8080/getAssignedprojects/${subId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
    }).then((response) => {

        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}


export const getrvtfiles =async (token ,  projectId) =>{
    return await fetch(`http://localhost:8080/rvt/get/${projectId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    }).then((response) => {
        // console.log(response)
        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}


export const gettourFolderbyProject = (token, projectId) =>{
    return fetch(`http://localhost:8080/tourfolder/by/${projectId}`, {
     method: "GET",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   })
   .then((response) => {
 
     return response.json();
 })
     .catch((err) => {
       console.log(err);
     });
 
 }

 export const singleProject = (token , projectId) =>{
    return fetch(`http://localhost:8080/project/${projectId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }, 
    })
    .then((response) => {
        
        return response.json();
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const get360link = async(token, folderId) =>{
    // alert(folderId)
    return await fetch(`http://localhost:8080/tourLink/get/${folderId}`,{
        method: "GET",
        headers: {
            
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
      
        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}


export const getFolderbyProject = (token, projectId) =>{
    return fetch(`http://localhost:8080/folder/by/${projectId}`, {
     method: "GET",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   })
   .then((response) => {
 
     return response.json();
 })
     .catch((err) => {
       console.log(err);
     });
 
 }

 export const getMirFolderbyProject = (token, projectId) =>{
    return fetch(`http://localhost:8080/mirFolder/by/${projectId}`, {
     method: "GET",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   })
   .then((response) => {
 
     return response.json();
 })
     .catch((err) => {
       console.log(err);
     });
 
 }

 
export const get360files = (token, clientId) =>{
    return fetch(`http://localhost:8080/tourFile/get/${clientId}`,{
        method: "GET",
        headers: {
            
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {

        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}

export const getFilebyFolder = (token, projectId) =>{
    return fetch(`http://localhost:8080/modelFile/get/${projectId}`, {
     method: "GET",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   })
   .then((response) => {
    
     return response.json();
 })
     .catch((err) => {
       console.log(err);
     });
 
 }


 export const getmirFilebyFolder = (token, projectId) =>{
    return fetch(`http://localhost:8080/mirFile/get/${projectId}`, {
     method: "GET",
     headers: {
    //    Accept: "application/json",
    //    "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   })
   .then((response) => {
    
     return response.json();
 })
     .catch((err) => {
       console.log(err);
     });
 
 }

 export const getconversation = async (clientId) =>{
  return await fetch(`http://localhost:8080/api/conversations/${clientId}` ,{
      method:"GET" ,
      headers:{
          Accept:"application/json",
          "content-type":"application/json",
          // Authorization:`Bearer ${token}`
      },
  })
  .then((res) => {
      return res.json();
   })
   .catch((err) =>{
       console.log(err);
   })
}


export const Create_conversation = async (clientId , subId) =>{
  return await fetch(`http://localhost:8080/api/conversations`,{
      method:"POST" ,
      headers:{
          Accept:"application/json",
          "content-type":"application/json",
          // Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
          senderId:clientId,
          receiverId:subId
      })
  })
  .then((res) => {
     return res.json();
  })
  .catch((err) =>{
      console.log(err);
  })
}

export const getSub =async (clientId , token) =>{
  return await fetch(`http://localhost:8080/sub/by/${clientId}`,{
      method:"GET" ,
      headers:{
          Accept:"application/json",
          "content-type":"application/json",
          Authorization:`Bearer ${token}`
      },
  })
  .then((res) => {
     return res.json();
  })
  .catch((err) =>{
      console.log(err);
  })
}



