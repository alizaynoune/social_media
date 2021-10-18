import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Container, Card, Alert, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { singIn } from '../../actions';
import 'antd/dist/antd.css';


function LoginPage(props) {
    const [errors, setErrors] = React.useState({
        email: ' ',
        password: ' '
    });

    const [touched, setTouched] = React.useState({
        email: false,
        password: false
    });

    const [values, setValues] = React.useState({
        email: '',
        password: ''
    });
    const [isValid, setIsValid] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [messageError, setMessageError] = React.useState('');

    const validation = (e) => {
        const { name, value } = e.target;
        // console.log(name, value, '===>');
        let error = '';
        switch (name) {
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'password':
                if (!value) {
                    error = 'Password is required';
                } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
                    error = 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
                }
                break;
            default:
                break;
        }
        setErrors({
            ...errors,
            [name]: error
        });
    };

    const handleTouched = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
        validation(e);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validation(e);
        errors.email === '' && errors.password === '' ? setIsValid(true) : setIsValid(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsValid(true);
        try {
            props.singIn(values);
        } catch (error) {
            console.log(error, 'error');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (props.isAuthenticated) {
            props.history.push('/');
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        if (props.error) {
            console.log(props.error, 'error');
            setIsLoading(false);
            setIsValid(false);
            if (!props.error.errors)
                setMessageError(props.error.message);
            else {
                const error = { ...errors };
                props.error.errors.forEach(element => {
                    error[element.param] = element.msg;
                });
                setErrors(error);
            }
        }
    }, [props.error]);

    useEffect(() => {
        if (errors.email !== '' || errors.password !== '') {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [errors]);





    return (
        <Container className="themed-container" fluid="xm">
            <Col md={10} xm={12} lg={7} xl={7} className="mx-auto">
                <Card className="text-center">
                    <Card.Header>
                        <h2>Login</h2>
                    </Card.Header>
                    <Card.Body>
                        {messageError && <Alert variant="danger">{messageError}</Alert>}
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ values }}
                        >
                            <Form.Item
                                name="email"
                                validateStatus={errors.email && touched.email ? 'error' : touched.email ? 'success' : ''}
                                help={errors.email && touched.email ? errors.email : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}

                                />
                            </Form.Item>
                            <Form.Item
                                hasFeedback
                                name="password"
                                validateStatus={errors.password && touched.password ? 'error' : touched.password ? 'success' : ''}
                                help={errors.password && touched.password ? errors.password : null}
                                onBlur={handleTouched}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                    onClick={handleSubmit}
                                    loading={isLoading}
                                    disabled={!isValid}
                                >
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card.Body>
                    <Card.Footer className="text-center d-flex justify-content-between">
                        <Link to="/forgot-password">Forgot password</Link>
                        <Link to="/register">Don't have an account?</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Container>
    )
}


const mapStateToProps = ({ auth }) => {
    return {
        isAuthenticated: auth.isAuthenticated,
        error: auth.error,
    }
}



const Login = connect(mapStateToProps, { singIn })(LoginPage);

export { Login };
