import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Card, FloatingLabel, Alert } from 'react-bootstrap'
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions';
import { Formik } from 'formik';

import './login.css'


function RegesterPage(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: '',
        city: '',
        gander: '',
        birthday: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        country: '',
        city: '',
        gander: '',
        birthday: '',
    });
    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        phoneNumber: false,
        country: false,
        city: false,
        gander: false,
        birthday: false,
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        confirmPassword: false,
        firstName: false,
        lastName: false,
        phoneNumber: false,
        country: false,
        city: false,
        gander: false,
        birthday: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState('');

    const validate = (name, value) => {
        console.log(name, value);
        let error = { ...errors };
    
        if (!value) {
            // setErrors({ ...errors, [name]: `${name} is required` });
            error[name] = `${name} is required`;
            setIsValid({ ...isValid, [name]: false });
        } else {
            switch (name) {
                case 'email':
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                        error.email = 'Invalid email address';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'password':
                    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)) {
                        error.password = 'Password must be at least 8 characters and contain at least one number and one letter';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'confirmPassword':
                    if (value !== values.password) {
                        error.confirmPassword = 'Password does not match';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'firstName':
                    if (!/^[a-zA-Z]+$/i.test(value)) {
                        error.firstName = 'First name must be letters only';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'lastName':
                    if (!/^[a-zA-Z]+$/i.test(value)) {
                        error.lastName = 'Last name must be letters only';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'phoneNumber':
                    if (!/^[0-9]{10}$/i.test(value)) {
                        error.phoneNumber = 'Phone number must be 10 digits';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'country':
                    if (!/^[a-zA-Z]+$/i.test(value)) {
                        error.country = 'Country must be letters only';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'city':
                    if (!/^[a-zA-Z]+$/i.test(value)) {
                        error.city = 'City must be letters only';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'gander':
                    if (!/^(m|f){1,}$/i.test(value)) {
                        error.gander = 'Gander must be m or f';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                case 'birthday':
                    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/i.test(value)) {
                        error.birthday = 'Birthday must be in format YYYY-MM-DD';
                        setIsValid({ ...isValid, [name]: false });
                    }
                    break;
                default:
                    break;

            }
        }
        setErrors(error);
        console.log(error)
        console.log(errors);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        // setTouched({ ...touched, [name]: true });
        validate(name, value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setGlobalError('');
        setIsLoading(true);
        try {
            props.register(values)
        } catch (error) {
            setGlobalError(error.message);
            setIsLoading(false);
            setIsSubmitting(false);
        }
    }

    const handleBlur = (event) => {
        const { name } = event.target;
        setTouched({ ...touched, [name]: true });
        validate(name, values[name]);
        console.log('blur')
    }

    const handleFocus = (event) => {
        const { name } = event.target;
        setTouched({ ...touched, [name]: false });
    }

    return (
        <Container className="mt-5">
            <Card className="shadow-lg mb-2 bg-white rounded ">
                <Card.Header className="text-center">
                    <h3>Register</h3>
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
                                <Form.Group controlId="firstName"  className="mt-2">
                                    <FloatingLabel
                                        controlId="firstName"
                                        label="First name"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            label="First name"
                                            value={values.firstName}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.firstName}
                                            isValid={isValid.firstName && touched.firstName}
                                            isInvalid={touched.firstName && errors.firstName}
                                            required={true}

                                            style={{
                                                boxShadow: errors.firstName ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.firstName) ? '0 4px 2px -2px green' :
                                                        (touched.firstName) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}

                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="lastName" className="mt-2">
                                    <FloatingLabel
                                        controlId="lastName"
                                        label="Last name"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            label="Last name"
                                            value={values.lastName}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.lastName}
                                            isValid={isValid.lastName && touched.lastName}
                                            isInvalid={touched.lastName && errors.lastName}
                                            required={true}

                                            style={{
                                                boxShadow: errors.lastName ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.lastName) ? '0 4px 2px -2px green' :
                                                        (touched.lastName) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}

                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="email" className="mt-2">
                                    <FloatingLabel
                                        controlId="email"
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
                                </Form.Group>
                                <Form.Group controlId="password" className="mt-2">
                                    <FloatingLabel
                                        controlId="password"
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
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="confirmPassword" className="mt-2">
                                    <FloatingLabel
                                        controlId="confirmPassword"
                                        label="Confirm password"
                                    >
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            label="ConfirmPassword"
                                            value={values.confirmPassword}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.confirmPassword}
                                            isValid={isValid.confirmPassword && touched.confirmPassword}
                                            isInvalid={touched.confirmPassword && errors.confirmPassword}
                                            required={true}

                                            style={{
                                                boxShadow: errors.confirmPassword ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.confirmPassword) ? '0 4px 2px -2px green' :
                                                        (touched.confirmPassword) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}

                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="phoneNumber" className="mt-2">
                                    <FloatingLabel
                                        controlId="phoneNumber"
                                        label="Phone"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            
                                            value={values.phoneNumber}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.phoneNumber}
                                            isValid={isValid.phoneNumber && touched.phoneNumber}
                                            isInvalid={touched.phoneNumber && errors.phoneNumber}
                                            required={true}

                                            style={{
                                                boxShadow: errors.phoneNumber ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.phoneNumber) ? '0 4px 2px -2px green' :
                                                        (touched.phoneNumber) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.phoneNumber}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="country" className="mt-2">
                                    <FloatingLabel
                                        controlId="country"
                                        label="Country"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="country"
                                            label="Country"
                                            value={values.country}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.country}
                                            isValid={isValid.country && touched.country}
                                            isInvalid={touched.country && errors.country}
                                            required={true}

                                            style={{
                                                boxShadow: errors.country ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.country) ? '0 4px 2px -2px green' :
                                                        (touched.country) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.country}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="city" className="mt-2">
                                    <FloatingLabel
                                        controlId="city"
                                        label="City"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="city"
                                            label="City"
                                            value={values.city}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.city}
                                            isValid={isValid.city && touched.city}
                                            isInvalid={touched.city && errors.city}
                                            required={true}

                                            style={{
                                                boxShadow: errors.city ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.city) ? '0 4px 2px -2px green' :
                                                        (touched.city) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="gander" className="mt-2">
                                    <FloatingLabel
                                        controlId="gander"
                                        label="Gander"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="gander"
                                            label="Gander"
                                            value={values.gander}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.gander}
                                            isValid={isValid.gander && touched.gander}
                                            isInvalid={touched.gander && errors.gander}
                                            required={true}

                                            style={{
                                                boxShadow: errors.gander ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.gander) ? '0 4px 2px -2px green' :
                                                        (touched.gander) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.gander}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group controlId="birthday" className="mt-2">
                                    <FloatingLabel
                                        controlId="birthday"
                                        label="Birthday"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="birthday"
                                            label="Birthday"
                                            value={values.birthday}
                                            onFocus={handleFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.birthday}
                                            isValid={isValid.birthday && touched.birthday}
                                            isInvalid={touched.birthday && errors.birthday}
                                            required={true}

                                            style={{
                                                boxShadow: errors.birthday ? '0 4px 2px -2px rgba(255,0,0,0.5)' :
                                                    (isValid.birthday) ? '0 4px 2px -2px green' :
                                                        (touched.birthday) ? '0 4px 2px -2px #4285f4' :
                                                            '0 4px 2px -2px rgba(0,0,0,0.5)',
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {errors.birthday}
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


    )

}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const Register = connect(mapStateToProps, { register })(RegesterPage);


export { Register };