import React from 'react';
import { Button, Alert, Form, Container, Card, FloatingLabel } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

import { singIn } from '../../actions';



class LoginPage extends React.Component {
    _handleSubmit = (values, bage) => {
        this.props.singIn(values);
        this.bag = bage;
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (isAuthenticated !== prevProps.isAuthenticated) {
            this.props.history.push('/');
        }

        if (error && this.bag) {
            if (error?.errors) {
                error.errors.forEach(error => {
                    this.bag.setErrors({
                        [error.param]: error.msg
                    })
                })
            }
            this.bag.setSubmitting(false);
        }
    }

    _handleErrorIfAny = () => {
        const { error } = this.props;
        console.log(error, 'errorrrr');
        if (error) {
            return (
                <Alert variant="danger">
                    {error.message}
                </Alert>
            )
        }
    }

    render() {
        return (
            <>
                <Container className="justify-content-center container py-5 h-100" style={{ maxWidth: '600px' }}>
                    <Card className="shadow-lg p-3 mb-2 bg-white rounded ">
                        <Card.Header>
                            <h3 className="text-center">Login</h3>
                        </Card.Header>
                        <Card.Body>
                            {this._handleErrorIfAny()}
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={Yup.object().shape({
                                    email: Yup.string()
                                        .email('Invalid email')
                                        .required('Required'),
                                    password: Yup.string()
                                        .required('Required')
                                        .min(6, 'Password must be at least 6 characters')
                                        .max(20, 'Password must be less than 20 characters')
                                        .matches(/[a-zA-Z]/, 'Password must contain letters')
                                        .matches(/[0-9]/, 'Password must contain numbers')
                                        .matches(/[!@#$%^&*]/, 'Password must contain special characters'),
                                })}

                                onSubmit={this._handleSubmit.bind(this)}
                            >

                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                    isValid,
                                    dirty,
                                }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formBasicEmail">
                                            <p className="text-danger"> {errors.email && touched.email && errors.email} </p>
                                            <FloatingLabel
                                                controlId="email"
                                                label="Email"
                                            >
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    isInvalid={touched.email && errors.email}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword" className="mt-2">
                                            <p className="text-danger">{errors.password && touched.password && errors.password} </p>
                                            <FloatingLabel
                                                controlId="password"
                                                label="Password"
                                            >
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    isInvalid={errors.password && touched.password}
                                                />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="text-center d-grid mt-2">
                                            <Button variant="primary" type="submit" size="lg" disabled={isSubmitting || !isValid || !dirty}>
                                                Submit
                                            </Button>
                                        </Form.Group>
                                    </Form>
                                )}
                            </Formik>

                            <div className='d-flex justify-content-between mt-2'>
                                <Link to="/register">
                                    <Button variant="link" size="lg">
                                        Register
                                    </Button>
                                </Link>
                                <Link to="forgot-password">
                                    <Button variant="link" size="lg">
                                        Forgot password?
                                    </Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>

            </>
        );


    }
}

const mapStateToProps = ({ auth }) => {
    console.log(auth, 'auth');
    return {
        isAuthenticated: auth.isAuthenticated,
        error: auth.error
    }
}

const Login = connect(mapStateToProps, { singIn })(LoginPage);

export { Login };
