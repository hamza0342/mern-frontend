import React, { useState } from 'react';
import { createSubContractor } from "./clientapi"
import {
    Button, Modal, Form, Input, Select, Alert, Checkbox, Row,
    Col, Radio
} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import { isAuthenticated } from "../../authentication/index";
import swal from 'sweetalert';

const { Search } = Input;
const { Option } = Select;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: { offset: 18, span: 16 },
};


const AddGC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);




    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = (values) => {
     
        const clientId = isAuthenticated().client._id;
        const token = isAuthenticated().token;
       
        const user = {
            'name': values.name,
            'email': values.email,
            'password': values.password,
            'phone': values.phone,
            "role": values.role

        };
       
        createSubContractor(user, token, clientId).then((data) => {
            if (data.error) {
                setError(data.error);
            }
            else {
                setName(" ");
                setEmail(" ");
                setPassword(" ");
                setPhone(" ");
                setRole(" ");
                // alert("user created");
                swal("Created!", "Account is created!", "success");
                // window.location.reload();
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <div>
                <div style={{ marginBottom: 20 }}>
                    <Button
                        // shape="round" 
                        type="primary"
                        icon={<PlusOutlined />}
                        size='large'
                        onClick={showModal}
                        style={{

                            marginLeft: 20
                        }}
                        block>
                        Add Sub Contractor
                    </Button>
                    <Modal title="Subcontractor Signup" okText="Create" visible={isModalVisible} footer={null} onCancel={handleCancel}>
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
                                name: name,
                                email: email,
                                password: password,
                                phone: phone,
                                role: role,


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
                                <Input onChange={(e) => setName(e.target.value)} />
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
                                <Input onChange={(e) => setEmail(e.target.value)} />
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
                                <Input.Password onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>

                            <Form.Item name="role" label="Roles" rules={[
                                {
                                    required: true,
                                    message: 'Please Select One Role',
                                },
                            ]}>

                                <Checkbox.Group>
                                    <Row>
                                        <Col span={12}>

                                            <Checkbox
                                                value="designer"
                                                style={{
                                                    lineHeight: '32px',
                                                }}
                                            >
                                                Designer
                                            </Checkbox>
                                        </Col>
                                        <Col span={12} style={{ marginLeft: 1 }}>
                                            <Checkbox
                                                value="others"
                                                style={{
                                                    lineHeight: '32px',
                                                }}
                                            >
                                                Others
                                            </Checkbox>
                                        </Col>



                                    </Row>
                                </Checkbox.Group>
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
                                <Input onChange={(e) => setPhone(e.target.value)} />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </div>

        </div>
    );
}

export default AddGC;