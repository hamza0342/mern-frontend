import React, {useState, useEffect} from 'react';
import {Card, Form, Input, Button, Select , Alert} from 'antd';
import {isAuthenticated} from "../../authentication/index";
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import read, { update, updateClient } from './clientapi'
import {useParams} from "react-router-dom"


function EditClient() {
    //declaring state variables
    const [ id, setId] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [cnic, setCnic] = useState("")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [gender, setGender] = useState("")
    const [error,setError] = useState("")
    const [redirectProfile, setRedirectProfile] = useState(false)

    const {clientId} = useParams();
    const token = isAuthenticated().token
    console.log(clientId,token)

    useEffect(() => {
      read(clientId, token).then((data)=>{
        console.log(data)
        if(data.error){
          setRedirectProfile(true)
        } else {
          console.log(data)
          setId(data._id)
          setName(data.name)
          setPassword(data.password)
          setCnic(data.cnic)
          setAge(data.age)
          setAddress(data.address)
          setGender(data.gender)
          setError("")
        }
      })
    },[])
    console.log(name)

    const clickSubmit = event =>{
      event.preventDefault()
      const client = {
        name,
        address,
        age,
        phone,
        cnic,
        gender,
        password: password || undefined
      }
      console.log(client)
      update(clientId, token, client).then((data) =>{
        if(data.error){
          setError(data.error)
        }
        else{
          updateClient(data,()=>{
            setRedirectProfile(true)
          })
        }
      })
    }

    const editForm = (name, cnic, age,phone, address,password) =>(
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input 
            onChange={(e)=>setName(e.target.value)}
            type="text"
            className="form-control"
            value={name} 
          />
        </div>
        <div className="form-group">
          <label className="text-muted">CNIC</label>
          <input 
            onChange={(e)=>setCnic(e.target.value)}
            type="text"
            className="form-control"
            value={cnic} 
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Age</label>
          <input 
            onChange={(e)=>setAge(e.target.value)}
            type="text"
            className="form-control"
            value={age} 
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Address</label>
          <input 
            onChange={(e)=>setAddress(e.target.value)}
            type="text"
            className="form-control"
            value={address} 
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Phone</label>
          <input 
            onChange={(e)=>setPhone(e.target.value)}
            type="number"
            className="form-control"
            value={phone} 
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input 
            onChange={(e)=>setPassword(e.target.value)}
            type="text"
            className="form-control"
            value={password} 
          />
        </div>
        <button
          onClick={clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Update
        </button>
      </form>
    )

    if(redirectProfile){
      <Redirect to={`/client/dashboard/${id}`} />
      console.log("hi")
    }

    return(
      <div className="container">
        <h1 className="mt-5 mb-5">Edit Client</h1>
        {
          editForm(name, cnic, age,phone, address,password)
        }
      </div>
    )
}  

export default EditClient;