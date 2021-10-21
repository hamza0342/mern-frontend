import React, {useState} from 'react';
import { Card, Form, Input, Button, Select , Alert} from 'antd';
import {gcSignup} from "./adminapi";
import {isAuthenticated} from "../../authentication/index";
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';


const { Option } = Select;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 11,
      span: 8,
    },
  };

const GCSignup= () => {
    //declaring state variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [cnic, setCnic] = useState("");
    const [age, setAge]= useState("");
    const [phone, setPhone]= useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState("");
    const [redirect, setRedirect] = useState(false);


    const onFinish = (values) => {
        // console.log('Success:', values);
        const token = isAuthenticated().token;
        // console.log("Token", token);
        const user = { 
            'name': values.name,
            'email': values.email, 
            'password': values.password, 
            'age': values.age, 
            'cnic': values.cnic, 
            'phone': values.phone,
            'address': values.address,
            'gender': values.gender, 
        };
        // console.log(user);
        gcSignup(user,token).then((data)=> {
            if(data.error){
                setError(data.error);
            }
            else {
                setName(" ");
                setEmail(" ");
                setPassword(" ");
                setAge(" ");
                setAddress(" ");
                setGender(" ");
                setCnic(" ");
                setPhone(" ");
                // alert("user created");
                // window.location.reload();
                swal("Created!", "Account is created!", "success");
                setRedirect(true);
                
            }
        })
      };
    
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    if(redirect) {
      return <Redirect to="/admin/dashboard/gcdisplay" />
    }
    else {
      return(
        <Card style={{minHeight: '80vh', padding: 40}}>
            <h1 style={{textAlign: "center", marginBottom: 20}}>General Contributer Signup Form</h1>
            <Alert
                message={error}
                className="alert"
                type="warning"
                showIcon
                style={{ display: error ? "" : "none" }}
            />
        <Form
        {...layout}
        name="basic"
        initialValues={{
          name:name,
          email: email,
          password: password,
          cnic: cnic,
          age: age,
          phone: phone,
          address: address,
          gender: gender,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input onChange={(e)=> setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input onChange={(e)=> setEmail(e.target.value)}/>
        </Form.Item>


        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password onChange={(e)=> setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="CNIC"
          name="cnic"
          rules={[
            {
              required: true,
              message: 'Please input your CNIC!',
            },
          ]}
        >
          <Input onChange={(e)=> setCnic(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: 'Please input your age!',
            },
          ]}
        >
          <Input onChange={(e)=> setAge(e.target.value)} />
        </Form.Item>
        
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your Phone Number!',
            },
          ]}
        >
          <Input onChange={(e)=> setPhone(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: 'Please input your Address!',
            },
          ]}
        >
          <Input onChange={(e)=> setAddress(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please select your Gender!',
            },
          ]}
        >
          <Select>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Card>

    );
        }  
    
}

export default GCSignup;