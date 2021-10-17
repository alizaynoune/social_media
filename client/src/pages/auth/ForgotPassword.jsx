import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions';


import 'antd/dist/antd.css';


const ForgotPasswordPage = (props) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors , setErrors] = useState({
        email: '',
        password: ''
    });
    const [isValid , setIsValid] = useState({
        email: false,
        password: false
    });
    const [isLoading , setIsLoading] = useState(false);
    const [isSuccess , setIsSuccess] = useState(false);

    const validation = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'email') {
            if (value.length === 0) {
                error = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                error = 'Invalid email address';
            }
        } else if (name === 'password') {
            if (value.length === 0) {
                error = 'Password is required';
            } else if (value.length < 6) {
                error = 'Password must be at least 6 characters';
            }
        }
        setErrors({ ...errors, [name]: error });
        setIsValid({ ...isValid, [name]: error ? false : true });
        console.log(e , 'test');
        console.log(errors, 'errors');
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        validation(e);
    };


    const handleSubmit = (values) => {
        setIsLoading(true);
        props.forgotPassword(values, () => {
            setIsLoading(false);
            setIsSuccess(true);
        });
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Container>
            <Card className="login-card ">
                <Card.Header>
                    <Card.Title className="text-center">Forgot Password</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ setValues }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        onChange={handleChange}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                            error={errors.email}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Email"
                                name="email"

                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button w-100" size="lg"
                                loading={isLoading}
                                disabled={!isValid.email}
                                onClick={() => handleSubmit({ email: values.email })}
                            >
                                Send
                            </Button>
                        </Form.Item>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center d-flex justify-content-between">
                    <Link to="/login">
                        <Button type="primary">
                            Login
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button type="primary">
                            Register
                        </Button>
                    </Link>
                </Card.Footer>
            </Card>
        </Container>
    );
}

const ForgotPassword = connect(null, { forgotPassword })(ForgotPasswordPage);

export { ForgotPassword }
