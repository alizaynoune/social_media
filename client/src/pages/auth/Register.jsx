import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Typography, Select, DatePicker } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Container, Card, Alert, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions';
import 'antd/dist/antd.css';

const { Option } = Select;


function RegisterPage(props) {
    const countries = [
        {
            value: 'AF',
            label: 'Afghanistan',
        },
        {
            value: 'AX',
            label: 'Åland Islands',
        },
        {
            value: 'AL',
            label: 'Albania',
        },
        {
            value: 'DZ',
            label: 'Algeria',
        },
        {
            value: 'AS',
            label: 'American Samoa',
        },
        {
            value: 'AD',
            label: 'Andorra',
        },
        {
            value: 'MA',
            label: 'Morocco',
        },
    ];
    const [errors, setErrors] = useState({
        email: ' ',
        password: ' ',
        confirmPassword: ' ',
        firstName: ' ',
        lastName: ' ',
        phoneNumber: ' ',
        gander: ' ',
        birthday: ' ',
        country: ' ',
        city: ' ',
    });
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gander: '',
        birthday: '',
        country: '',
        city: '',
    });
    const [isTouched, setIsTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        phoneNumber: false,
        gander: false,
        birthday: false,
        country: false,
        city: false,
    });
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState('');

    const validation = (name, value) => {
        switch (name) {
            case 'email':
                if (value.length === 0) {
                    setErrors({ ...errors, email: 'Email is required' });
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    setErrors({ ...errors, email: 'Invalid email address' });
                } else {
                    setErrors({ ...errors, email: '' });
                }
                break;
            case 'password':
                if (value.length === 0) {
                    setErrors({ ...errors, password: 'Password is required' });
                } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)) {
                    setErrors({ ...errors, password: 'Password must contain at least 8 characters, one letter and one number' });
                } else {
                    setErrors({ ...errors, password: '' });
                }
                break;
            case 'confirmPassword':
                if (value.length === 0) {
                    setErrors({ ...errors, confirmPassword: 'Confirm password is required' });
                } else if (value !== values.password) {
                    setErrors({ ...errors, confirmPassword: 'Password does not match' });
                } else {
                    setErrors({ ...errors, confirmPassword: '' });
                }
                break;
            case 'firstName':
                if (value.length === 0) {
                    setErrors({ ...errors, firstName: 'First name is required' });
                } else if (!/^[a-zA-Z]*$/i.test(value)) {
                    setErrors({ ...errors, firstName: 'First name must contain only letters' });
                } else {
                    setErrors({ ...errors, firstName: '' });
                }
                break;
            case 'lastName':
                if (value.length === 0) {
                    setErrors({ ...errors, lastName: 'Last name is required' });
                } else if (!/^[a-zA-Z]*$/i.test(value)) {
                    setErrors({ ...errors, lastName: 'Last name must contain only letters' });
                } else {
                    setErrors({ ...errors, lastName: '' });
                }
                break;
            case 'phoneNumber':
                if (value.length === 0) {
                    setErrors({ ...errors, phoneNumber: 'Phone number is required' });
                } else if (!/^[0-9]*$/i.test(value)) {
                    setErrors({ ...errors, phoneNumber: 'Phone number must contain only numbers' });
                } else {
                    setErrors({ ...errors, phoneNumber: '' });
                }
                break;
            case 'gander':
                if (value.length === 0) {
                    setErrors({ ...errors, gander: 'Gander is required' });
                } else if (!/^f|m/i.test(value)) {
                    setErrors({ ...errors, gander: 'Gander must be f or m' });
                } else {
                    setErrors({ ...errors, gander: '' });
                }
                break;
            case 'birthday':
                if (value.length === 0) {
                    setErrors({ ...errors, birthday: 'Birthday is required' });
                } else if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i.test(value)) {
                    setErrors({ ...errors, birthday: 'Birthday must be in format YYYY-MM-DD' });
                } else {
                    setErrors({ ...errors, birthday: '' });
                }
                break;
            case 'country':
                if (value.length === 0) {
                    setErrors({ ...errors, country: 'Country is required' });
                } else if (!/^[a-zA-Z]*$/i.test(value)) {
                    setErrors({ ...errors, country: 'Country must contain only letters' });
                } else {
                    setErrors({ ...errors, country: '' });
                }
                break;
            case 'city':
                if (value.length === 0) {
                    setErrors({ ...errors, city: 'City is required' });
                } else if (!/^[a-zA-Z]*$/i.test(value)) {
                    setErrors({ ...errors, city: 'City must contain only letters' });
                } else {
                    setErrors({ ...errors, city: '' });
                }
                break;
            default:
                break;
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        // setIsTouched({ ...isTouched, [name]: true });
        validation(name, value);
    };

    const handleTouched = (event) => {
        const { name } = event.target;
        setIsTouched({ ...isTouched, [name]: true });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessageError('');
        const data = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            gander: values.gander,
            birthday: values.birthday,
            country: values.country,
            city: values.city,
        };
        try {
            props.register(data);
        } catch (error) {
            setMessageError(error.message);
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
            setMessageError(props.error);
            setIsLoading(false);
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
                            initialValues={{ values }}
                        >
                            <Form.Item
                                name="email"
                                validateStatus={errors.email && isTouched.email ? 'error' : isTouched.email ? 'success' : ''}
                                help={errors.email && isTouched.email ? errors.email : null}
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
                                validateStatus={errors.password && isTouched.password ? 'error' : isTouched.password ? 'success' : ''}
                                help={errors.password && isTouched.password ? errors.password : null}
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
                            <Form.Item
                                name="confirmPassword"
                                validateStatus={errors.confirmPassword && isTouched.confirmPassword ? 'error' : isTouched.confirmPassword ? 'success' : ''}
                                help={errors.confirmPassword && isTouched.confirmPassword ? errors.confirmPassword : null}
                                onBlur={handleTouched}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="firstName"
                                validateStatus={errors.firstName && isTouched.firstName ? 'error' : isTouched.firstName ? 'success' : ''}
                                help={errors.firstName && isTouched.firstName ? errors.firstName : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="First Name"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="lastName"
                                validateStatus={errors.lastName && isTouched.lastName ? 'error' : isTouched.lastName ? 'success' : ''}
                                help={errors.lastName && isTouched.lastName ? errors.lastName : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"
                                validateStatus={errors.phoneNumber && isTouched.phoneNumber ? 'error' : isTouched.phoneNumber ? 'success' : ''}
                                help={errors.phoneNumber && isTouched.phoneNumber ? errors.phoneNumber : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="gander"
                                validateStatus={errors.gander && isTouched.gander ? 'error' : isTouched.gander ? 'success' : ''}
                                help={errors.gander && isTouched.gander ? errors.gander : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <Select
                                    placeholder="Gander"
                                    name="gander"
                                    value={values.gander}
                                    onChange={handleChange}
                                >
                                    <Option value="m" >m</Option>
                                    <Option value="f" ></Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="birthday"
                                validateStatus={errors.birthday && isTouched.birthday ? 'error' : isTouched.birthday ? 'success' : ''}
                                help={errors.birthday && isTouched.birthday ? errors.birthday : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <DatePicker
                                    placeholder="Birthday"
                                    name="birthday"
                                    value={values.birthday}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="country"
                                validateStatus={errors.country && isTouched.country ? 'error' : isTouched.country ? 'success' : ''}
                                help={errors.country && isTouched.country ? errors.country : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <Select
                                    placeholder="Country"
                                    name="country"
                                    value={values.country}
                                    onChange={handleChange}
                                >
                                    {countries.map(country => (
                                        <Option value={country.value}>{country.label}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="city"
                                validateStatus={errors.city && isTouched.city ? 'error' : isTouched.city ? 'success' : ''}
                                help={errors.city && isTouched.city ? errors.city : null}
                                onBlur={handleTouched}
                                hasFeedback
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="City"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            {/* <Form.Item */}

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
                        <Link to="/forgot-password">Forgot password</Link>

                    </Card.Footer>
                </Card>
            </Col>
        </Container>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        isAthenticated: auth.isAuthenticated,
        error: auth.error
    }
}

const Register = connect(mapStateToProps, { register })(RegisterPage);

export { Register };
