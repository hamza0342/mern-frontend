export const getGC = () => {
    return fetch(`http://localhost:8080/subContractors`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
       
        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
};

export const createSubContractor = (user, token, clientId) => {
    return fetch(`http://localhost:8080/subContractorSignup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const createProject = (project, token, clientId) => {
    return fetch(`http://localhost:8080/project/new/${clientId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getProjectByClient = (token, clientId) =>{
    return fetch(`http://localhost:8080/project/by/${clientId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {

        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
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

export const getrvtfiles = (token , projectId) =>{
    return fetch(`http://localhost:8080/rvt/get/${projectId}`,{
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
 

 export const getclientbysub =async (createdBy , token) =>{
    return await fetch(`http://localhost:8080/client/by/${createdBy}`,{
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


export const getgcconversation = async (subId) =>{
    return await fetch(`http://localhost:8080/api/conversations/${subId}` ,{
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






 ///////////////////////////
 export const create_conversation = async (clientId , subId,name,clientName) =>{
    return await fetch(`http://localhost:8080/api/conversations`,{
        method:"POST" ,
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            // Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            senderId:clientId,
            receiverId:subId,
            user1:name,
            user2:clientName
        })
    })
    .then((res) => {
       return res.json();
    })
    .catch((err) =>{
        console.log(err);
    })
}



 /////////////////




export const getFilebyFolder = async (token, projectId) =>{
    return await fetch(`http://localhost:8080/modelFile/get/${projectId}`, {
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

 
export const getcomments = async (projectId) =>{
    return await fetch(`http://localhost:8080/getcomments/by/${projectId}`, {
     method: "GET",
    //  headers: {
    //    Accept: "application/json",
    //    "Content-Type": "application/json",
    //    Authorization: `Bearer ${token}`,
    //  },
   })
   .then((response) => {
    
     return response.json();
 })
     .catch((err) => {
       console.log(err);
     });
 
 }


 export const getmirFilebyFolder = (token, projectId) =>{
    return fetch(`http://localhost:8080/getMirFile/by/${projectId}`, {
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
 
 export const getPdfmirFilebyFolder = (token) =>{
    return  fetch(`http://localhost:8080/getMirSubFiles`, {
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


 export const getApprovedFiles = (token) =>{
    return  fetch(`http://localhost:8080/getMirSubFiles/approved`, {
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
 
 


export const getSCByClient = (token, clientId) =>{
    return fetch(`http://localhost:8080/subContractor/by/${clientId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
       
        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}



export const getTeamByClient = (token, clientId) =>{
    return fetch(`http://localhost:8080/team/by/${clientId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
      
        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}















export const updateProject = (projectId, token, project) => {
  
    return fetch(`http://localhost:8080/project/update/${projectId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
    })
        .then((response) => {
          
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const updatedProject = (project, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.project = project;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};
export const deleteProject = (projectId, token) => {
    return fetch(`http://localhost:8080/project/${projectId}`, {
        method: "DELETE",
        body: JSON.stringify({
            id: projectId,
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
       
        return response.json();
    });
};




////////////////////////

export const getProject = () =>{
    return fetch(`http://localhost:8080/projects`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    }).then((response) => {
       
        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}


export const update = (clientId, token, client) =>{
   
    return fetch(`http://localhost:8080/client/${clientId}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(client),
    }) 
    .then((response)=>{
       
        return response.json();
    })
    .catch((err)=> console.log(err))
}

export const updateClient = (client, next) =>{
    if(typeof window !== "undefined"){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"))
            auth.client = client
            localStorage.setItem("jwt", JSON.stringify(auth))
            next()
        }
    }
}

export const singleProject = (token ,projectId) =>{
    return fetch(`http://localhost:8080/project/${projectId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) => {
        
        return response.json();
    })
    .catch((err)=>{
        console.log(err)
    })
}


const read = (clientId, token) =>{
    return fetch(`http://localhost:8080/client/${clientId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        console.log(response)
        return response.json();
    })
}


export default read;

export const assignTeamMember = (token, projectId, subContractor) => {
    return fetch(`http://localhost:8080/project/addTeamMember`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({projectId, subContractor})
    })
        .then((response)=> {
            return response.json();
        })
        .catch(err => console.log(err));
};

///////////////
export const unassignTeamMember = (token, projectId, subContractor) => {
    return fetch(`http://localhost:8080/project/deleteTeamMember`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({projectId, subContractor})
    })
        .then((response)=> {
            return response.json();
        })
        .catch(err => console.log(err));
};


//////////////















export const comment = (userId, token, projectId, comment,name) => {
    return fetch(`http://localhost:8080/create/comment`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, projectId, comment,name})
    })
        .then((response)=> {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uncomment = (userId, token, projectId, comment) => {
    return fetch(`http://localhost:8080/project/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({clientId: userId, projectId, comment})
    })
        .then((response)=> {
            return response.json();
        })
        .catch(err => console.log(err));
};
