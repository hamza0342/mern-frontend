import React, {useState} from 'react';
import {PageHeader, Alert, Card, Form, Input, Button, Spin} from 'antd';
import Footer from '../../components/Footer';
import {Redirect, useHistory} from "react-router-dom";
import {clientSignin, authenticate} from "../../authentication/index";


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
    offset: 8,
    span: 8,
  },
};

const ClientSignin = () => {
    //defining state variables
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [error, setError] = useState("");
    const [redirectTo, setRedirectTo]= useState(false);
    const [loading, setLoading]= useState(false);
    let history = useHistory();

    const handleRoute= () => {
        history.push('/')
    }

    
    const ClientLogin= (user) => {
        clientSignin(user).then((data)=>{
           
            if(data.error) {
                setError("error" + data.error);
                setLoading(false);
            } else {
                authenticate(data, ()=> {
                    setRedirectTo("/client/dashboard");
                });
            }
        });
    }
    const onFinish = (values) => {
      
        setLoading(true);
        const user = { 'email': values.email, 'password': values.password, 'role': values.role };
        ClientLogin(user);        
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    
    if(redirectTo) {
        return <Redirect to= {redirectTo} />
    } 

    return (
        <div>
        <PageHeader
            className="site-page-header"
            onBack={handleRoute}
            title="Contractor's Portal"
            subTitle="Sign-in to your account using your credentials registered in our system. If your account is not registered, contact our support team."
        />
        <Card style={styles.container}>
            <h1 style={styles.heading}>Login to your account</h1>
            <Form    
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Alert
                message={error}
                className="alert"
                type="warning"
                showIcon
                style={{ display: error ? "" : "none" }}
            />
            {loading ? (
                <div className="spinner">  
                    <Spin />
                </div>
            ) : (
                ""
            )}  
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
                <Input onChange={(e)=> setEmail(e.target.value) } />
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
                <Input.Password onChange={(e)=> setPassword(e.target.value) } />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" shape="round" block>
                Sign-In
                </Button>
            </Form.Item>
            </Form>

        </Card>
        <Footer />        
        </div>
    )
  
}

export default ClientSignin;

const styles={
    container: {
        marginBottom: 150,
        background: "#FFFFFF",
    },
    heading: {
        textAlign: "center",
        fontWeight: 600
    },
}
