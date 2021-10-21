import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavItem, NavMenu, NavLinks, NavBtn, NavBtnLink } from './NavBarElements';
import { IconContext } from 'react-icons/lib';
import logo from '../../images/Logo A1 White.png';
import { animateScroll as scroll } from 'react-scroll';
import {
    Modal, Card, PageHeader, Alert, Form, Input, Button, Checkbox, Spin, Row,
    Col, Radio
} from 'antd';
import { Redirect, Link, useHistory } from "react-router-dom";

import { adminSignin, gcSignin, authenticate, clientSignin } from "../../authentication/index";
import '../../scss/homepage.scss';


const styles = {
    container: {
        marginBottom: 150,
        background: "#FFFFFF",
    },
    heading: {
        textAlign: "center",
        fontWeight: 600
    },
}


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



const NavBar = ({ toggle }) => {
    const [scrollNav, setScrollNav] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [redirectTo, setRedirectTo] = useState(false);
    const [loading, setLoading] = useState(false);

    let history = useHistory();


    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])


    const handleRoute = () => {
        history.push('/')
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true)
        }
        else {
            setScrollNav(false)
        }
    }



    const toggleHome = () => {
        scroll.scrollToTop();
    }

    const AdminLogin = (user) => {
        adminSignin(user).then((data) => {
            console.log("error", data.error);
            if (data.error) {
                setError(data.error);
                setLoading(false);
            } else {
                authenticate(data, () => {
                    setRedirectTo("/admin/dashboard");
                });
            }
        });
    }
    const ClientLogin = (user) => {
        clientSignin(user).then((data) => {
            console.log(data);
            if (data.error) {
                setError("error" + data.error);
                setLoading(false);
            } else {
                console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa=>>>>>>>>>>>>>>>>>>>>>>>>>",data)
                authenticate(data, () => {
                    setRedirectTo("/client/dashboard");
                });
            }
        });
    }

    const gcLogin = (user) => {
        gcSignin(user).then((data) => {
            console.log("error", data.error);
            if (data.error) {
                setError("error" + data.error);
                setLoading(false);
            } else {
                authenticate(data, () => {
                    setRedirectTo("/gc/dashboard");
                });
            }
        });
    }



    const onFinish = (values) => {
        console.log('Success:', values);
        setLoading(true);
        const user = { 'email': values.email, 'password': values.password, "checkbox-group": values.checkboxGroup };
        console.log(user)
        if (values.checkboxGroup == "admin") {
            AdminLogin(user);
        } if (values.checkboxGroup == "client") {
            ClientLogin(user);
        } if (values.checkboxGroup == "sub-contractor") {
            gcLogin(user);
        }



    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    if (redirectTo) {
        return <Redirect to={redirectTo} />
    }



    return (
        <>
            <IconContext.Provider value={{ color: '#CA2128' }}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to='/' onClick={toggleHome}>
                            <img src={logo} height="65px" width="150px" alt="logo" />
                        </NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks to="about" smooth={true} duration={500} spy={true} exact='true' offset={-80}>
                                    About
                                </NavLinks>

                            </NavItem>
                            <NavItem>
                                <NavLinks to="services" smooth={true} duration={500} spy={true} exact='true' offset={-80}>
                                    Services
                                </NavLinks>

                            </NavItem>
                            <NavItem>
                                <NavLinks to="signup" smooth={true} duration={500} spy={true} exact='true' offset={-80}>
                                    Contact
                                </NavLinks>

                            </NavItem>
                        </NavMenu>
                        <NavBtn onClick={showModal}>
                            <NavBtnLink>
                                Sign-In
                            </NavBtnLink>
                        </NavBtn>
                        <Modal
                            title="ArchiWiz Sign-In"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                            width={1500}>
                            {/* <Card>
                    <p>For Administrative priviliges and account usage. Sign-In here.</p>
                    <Button>
                       <Link to="/signin">
                       Admin Sign-In
                       </Link>
                    </Button>
                    </Card>
                    <br />
                    <Card>
                    <p>For contractors who wish to create a new project, or continue their already existing project. Sign-In here.</p>
                    <Button>
                        <Link to="/client/signin">
                            Contractor Sign-In
                       </Link>
                    </Button>
                    </Card>
                    <br />
                    <Card>
                    <p>For sub-contractors who are a part of an already running project. Sign-In here.</p>
                    <Button>
                        <Link to="/gc/signin">
                        Sub-Contractor Sign-In
                        </Link>
                    </Button>
                    </Card> */}
                            <Card>

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

                                        <Form.Item name="checkboxGroup" label="Roles" >
                                            <Checkbox.Group>
                                                <Row>
                                                    <Col span={8}>
                                                        <Checkbox
                                                            value="admin"
                                                            style={{
                                                                lineHeight: '32px',
                                                            }}
                                                        >
                                                            Admin
                                                        </Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox
                                                            value="client"
                                                            style={{
                                                                lineHeight: '32px',
                                                            }}
                                                        >
                                                            Contractor
                                                        </Checkbox>
                                                    </Col>
                                                    <Col span={8}>
                                                        <Checkbox
                                                            value="sub-contractor"
                                                            style={{
                                                                lineHeight: '32px',
                                                                width: 300
                                                            }}
                                                        >
                                                            Sub-Contractor / Others
                                                        </Checkbox>
                                                    </Col>


                                                </Row>
                                            </Checkbox.Group>
                                        </Form.Item>
                                        <Form.Item {...tailLayout}>
                                            <Button type="primary" htmlType="submit" shape="round" block>
                                                Sign-In
                                            </Button>
                                        </Form.Item>
                                    </Form>

                                </Card>


                            </Card>
                        </Modal>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default NavBar;
