export const clientSignup = (user, token) => {
    return fetch("http://localhost:8080/clientSignup", {
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

export const gcSignup = (user, token) => {
    return fetch("http://localhost:8080/generalContractorSignup", {
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

export const getclients = (token) => {
    return fetch(`http://localhost:8080/clients`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },
    }).then((response) => {
        // console.log(response);
        return response.json();
    })
    .catch((err)=>console.log(err));
};

export const getdisableclientssss = (token) => {
    return fetch(`http://localhost:8080/getdisabledclients`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

        },
    }).then((response) => {
        // console.log(response);
        return response.json();
    })
    .catch((err)=>console.log(err))
};
export const getactiveClients = () =>{
    return fetch(`http://localhost:8080/getcount` ,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-Type" : "application/json",
        },
    }).then((res)=>{
        // console.log(res);
        return res.json()
    }).catch((err) =>console.log(err))
}

export const getdisableClients = () =>{
    return fetch(`http://localhost:8080/getdisabledcount` ,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-Type" : "application/json",
        },
    }).then((res)=>{
        return res.json()
    }).catch((err)=> console.log(err))
}

export const deleteclient = (clientId, token) => {
    return fetch(`http://localhost:8080/deleteclient`, {
        method: "DELETE",
        body: JSON.stringify({
            id: clientId,
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        // console.log(response);
        return response.json();
    }).catch((err)=>console.log(err))
};

export const enableclient = async(clientId, token) => {
    return await fetch(`http://localhost:8080/enableclient`, {
        method: "PATCH",
        body: JSON.stringify({
            id: clientId,
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        // console.log(response);
        return response.json();
    }).catch((err) => console.log(err))
};

export const disableclient = async(clientId, token) =>{
    return await fetch(`http://localhost:8080/disableclient` ,{
        method:"PATCH",
        body :JSON.stringify({
            id:clientId,
        }),
        headers:{
            Accept:"application/json",
            "content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
    }).then((res) =>{
        // console.log(res);
        return res.json();
    }).catch((err) => console.log(err))

};

// export const getGC = () => {
//     return fetch(`http://localhost:8080/generalcontractors`, {
//         method: "GET",
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//     }).then((response) => {
//         console.log(response);
//         return response.json();
//     });
// };

export const deleteGC = (gcId, token) => {
    return fetch(`http://localhost:8080/deletegc`, {
        method: "DELETE",
        body: JSON.stringify({
            id: gcId,
        }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        // console.log(response);
        return response.json();
    }).catch((err) =>console.log(err))
};

export const getGC = () => {
    return fetch(`http://localhost:8080/subContractors`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        // console.log(response);
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

export const getrvtfiles = (token, projectId) =>{
    return fetch(`http://localhost:8080/rvt/get/${projectId}`,{
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
    return fetch(`http://localhost:8080/mir/by/${projectId}`, {
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
 
 


export const getSCByClient = (token, clientId) =>{
    return fetch(`http://localhost:8080/subContractor/by/${clientId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        // console.log(response);
        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}

export const updateProject = (projectId, token, project) => {
    console.log("Projectfsa", project);
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
            // console.log("Respoonse",response);
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
        // console.log(response);
        return response.json();
    }).catch((err) =>console.log(err))
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
        // console.log(response);
        return response.json();
    })
    .catch((err) =>{
        console.log(err)
    })
}


export const update = (clientId, token, client) =>{
    console.log("client form : ",client)
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
        // console.log("Res : ",response)
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

export const singleProject = (token , projectId) =>{
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
        // console.log(response)
        return response.json();
    }).catch((err) =>console.log(err))
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

export const comment = (userId, token, projectId, comment) => {
    return fetch(`http://localhost:8080/project/comment`, {
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
