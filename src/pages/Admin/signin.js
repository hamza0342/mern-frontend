import React, {useState} from 'react';
import {PageHeader, Alert, Card, Form, Input, Button, Checkbox, Spin} from 'antd';
import Footer from '../../components/Footer';
import {Redirect, Link, useHistory} from "react-router-dom";
import {adminSignin, authenticate} from "../../authentication/index";


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

const SigninPage = () => {
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

    const AdminLogin = (user) => {
        adminSignin(user).then((data)=> {
            // console.log("error",data.error);
            if(data.error) {
                setError(data.error);
                setLoading(false);
            } else {
                authenticate(data, ()=> {
                    setRedirectTo("/admin/dashboard");
                });
            }
        });
    }
  
    const onFinish = (values) => {
        // console.log('Success:', values);
        setLoading(true);
        const user = { 'email': values.email, 'password': values.password, 'role': values.role };
        AdminLogin(user);
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
            title="Sign-in"
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

export default SigninPage;

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
