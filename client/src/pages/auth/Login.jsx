import React, { useEffect, useState } from 'react';
import { Button, Alert, Form, Container, Card, FloatingLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { singIn } from '../../actions';

import "./login.css"


function LoginPage(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [isValid, setIsValid] = useState({
        email: false,
        password: false
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    });
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const validation = (name, value) => {
        let error = { ...errors };
        let valid = { ...isValid };
        console.log('validation')
        if(!value) {
            error[name] = 'This field is required';
            valid[name] = false;
        } else {

            switch (name) {
                case 'email':
                    if (value.length === 0) {
                        error.email = 'Email is required';
                        valid.email = false;
                    }
                    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                        error.email = 'Invalid email address';
                        valid.email = false;
                    }
                    else {
                        error.email = '';
                        valid.email = true;
                    }
                    break;
                case 'password':
                    if (value.length === 0) {
                        error.password = 'Password is required';
                        valid.password = false;
                    }
                    else if (value.length < 6) {
                        error.password = 'Password must be at least 6 characters';
                        valid.password = false;
                    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/i.test(value)) {
                        error.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
                        valid.password = false;
                    }
                    else {
                        error.password = '';
                        valid.password = true;
                    }
                    break;
                default:
                    break;
            }
        }
        setIsValid(valid);
        setErrors(error);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        if (touched[name]) {
            validation(name, value);
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        validation(name, values[name]);
    }

    const handleFocus = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        props.singIn(values, props.history);
    }

    useEffect(() => {
        if (props.isAuthenticated) {
            props.history.push('/');
        }
    }, [props.isAuthenticated, props.history]);

    useEffect(() => {
        if (props.errors) {
            setIsLoading(false);
            if (props.errors.errors) {
                let error = { ...errors };
                props.errors?.errors.forEach(item => {
                    error[item.param] = item.msg;
                });
                setErrors(error);
            } else {
                setGlobalError(props.errors.message);
            }
        }
    }, [props.errors]);

    useEffect(() => {
        console.log(errors, 'errors');
    }, [errors]);


    return (
        <Container className="mt-5">
            <Card className="shadow-lg mb-2 bg-white rounded ">
                <Card.Header className="text-center">
                    <h3>Login</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted text-center">
                        {globalError && <Alert variant="danger">{globalError}</Alert>}
                    </Card.Subtitle>
                    <Formik
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        initialValues={values}
                        errors={errors}
                        touched={touched}
                    >
                        {() => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail" style={{ bordersize: '0 0 1px' }}>
                                    <FloatingLabel
                                        controlId="formBasicEmail"
                                        label="Email"
                                    >
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            label="Email"
                                            value={values.email}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.email}
                                            isValid={isValid.email && touched.email}
                                            isInvalid={touched.email && errors.email}
                                            required={true}

                                            style={{
                                                boxShadow: errors.email ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.email) ? '0 4px 2px -2px green' :
                                                        (touched.email) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}

                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group >
                                <Form.Group controlId="formBasicPassword" className="mt-2">
                                    <FloatingLabel
                                        controlId="formBasicPassword"
                                        label="Password"
                                    >
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            label="Password"
                                            value={values.password}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.password}
                                            isValid={isValid.password && touched.password}
                                            isInvalid={touched.password && errors.password}
                                            required={true}

                                            style={{
                                                boxShadow: errors.password ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.password) ? '0 4px 2px -2px green' :
                                                        (touched.password) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip >
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-4 w-100" block="true" size="lg"
                                    disabled={!Object.keys(isValid).every(key => isValid[key] === true) || isLoading}>
                                    {isLoading ? 'Loading...' : 'Login'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Card.Footer className="text-center d-flex justify-content-between mt-4">
                        <Link to="/register">
                            <Button variant="link" className="">
                                Register
                            </Button>
                        </Link>
                        <Link to="/forgot-password">
                            <Button variant="link" className="">
                                Forgot Password
                            </Button>
                        </Link>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Container>
    );



}

export default LoginPage

const mapStateToProps = ({ auth }) => {
    return {
        isAuthenticated: auth.isAuthenticated,
        errors: auth.error,
    }
}

const Login = connect(mapStateToProps, { singIn })(LoginPage);

export { Login };
