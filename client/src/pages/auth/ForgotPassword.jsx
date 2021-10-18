import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Container, Card, Alert, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions';
import 'antd/dist/antd.css';


import 'antd/dist/antd.css';


const ForgotPasswordPage = (props) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(' ');
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [touched, setTouched] = useState(false);
    const [messageError, setMessageError] = useState('');


    const validateEmail = (email) => {
        if (!email) {
            setError('Email is required');
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid email address');
        }
        else {
            setError('');
        }

    }

    const handleChange = (e) => {
        setValue(e.target.value);
        // setTouched(true);
        validateEmail(e.target.value);
        error === '' ? setIsValid(true) : setIsValid(false);
    }

    const handleTouched = () => {
        setTouched(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            props.forgotPassword(value);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setMessageError(error.response.data.message);
        }
    }

    useEffect(() => {
        if (props.error) {
            console.log(props.error, 'error');
            setIsLoading(false);
            setIsValid(false);
            if (!props.error.errors)
                setMessageError(props.error.message);
            else {
                const error = { ...error };
                props.error.errors.forEach(element => {
                    error[element.param] = element.msg;
                });
                setError(error);
            }
        }
    }, [props.error]);

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
                            initialValues={{ value }}
                        >
                            <Form.Item
                                name="email"
                                validateStatus={error && touched ? 'error' : touched ? 'success' : ''}
                                help={error && touched ? error : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                    name="email"
                                    value={value}
                                    onChange={handleChange}

                                />
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
                        <Link to="/login">Login</Link>
                        <Link to="/register">Don't have an account?</Link>
                    </Card.Footer>
                </Card>
            </Col>
        </Container>
    );
}

const mapStateToProps = ({ auth }) => {
    console.log(auth.error, 'auth');
    return {
        error: auth.error
    };
}
const ForgotPassword = connect(mapStateToProps, { forgotPassword })(ForgotPasswordPage);

export { ForgotPassword }
