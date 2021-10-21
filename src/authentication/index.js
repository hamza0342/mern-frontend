import { Redirect } from "react-router";

/*-------Admin api---------*/
export const adminSignin = (user) => {
    return fetch("http://localhost:8080/signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const adminSignout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");

        console.log("removed")
    }
};

/*------Client Functions ------*/
export const clientSignin = (user) => {
    return fetch("http://localhost:8080/clientSignin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const clientSignout = (next) => { 
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
       
        console.log("removed")
    }
};

/*------General Contributor Functions ------*/
export const gcSignin = (user) => {
    return fetch("http://localhost:8080/subContractorSignin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const gcSignout = (next) => {

};


/*----- Authetication Functions------*/

export const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    } else if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};