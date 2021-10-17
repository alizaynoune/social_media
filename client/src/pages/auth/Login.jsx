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
                }else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/i.test(value)) {
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
            }else{
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



// class LoginPage extends React.Component {
//     _handleSubmit = (values, bage) => {
//         this.props.singIn(values);
//         this.bag = bage;
//     }

//     componentDidUpdate(prevProps) {
//         const { error, isAuthenticated } = this.props;
//         if (isAuthenticated !== prevProps.isAuthenticated) {
//             this.props.history.push('/');
//         }

//         if (error && this.bag) {
//             if (error?.errors) {
//                 error.errors.forEach(error => {
//                     this.bag.setErrors({
//                         [error.param]: error.msg
//                     })
//                 })
//             }
//             this.bag.setSubmitting(false);
//         }
//     }

//     _handleErrorIfAny = () => {
//         const { error } = this.props;
//         console.log(error, 'errorrrr');
//         if (error?.message) {
//             return (
//                 <Alert variant="danger">
//                     {error.message}
//                 </Alert>
//             )
//         }
//     }

//     render() {
//         return (
//             <>
//                 <Container className="justify-content-center container py-5 h-100" style={{ maxWidth: '600px' }}>
//                     <Card className="shadow-lg mb-2 bg-white rounded ">
//                         <Card.Header>
//                             <h3 className="text-center">Login</h3>
//                         </Card.Header>
//                         <Card.Body>
//                             {this._handleErrorIfAny()}
//                             <Formik
//                                 initialValues={{ email: '', password: '' }}
//                                 validationSchema={Yup.object().shape({
//                                     email: Yup.string()
//                                         .email('Invalid email')
//                                         .required('Required'),
//                                     password: Yup.string()
//                                         .required('Required')
//                                         .min(6, 'Password must be at least 6 characters')
//                                         .max(20, 'Password must be less than 20 characters')
//                                         .matches(/[a-zA-Z]/, 'Password must contain letters')
//                                         .matches(/[0-9]/, 'Password must contain numbers')
//                                         .matches(/[!@#$%^&*]/, 'Password must contain special characters'),
//                                 })}

//                                 onSubmit={this._handleSubmit.bind(this)}
//                             >

//                                 {({
//                                     values,
//                                     errors,
//                                     touched,
//                                     handleChange,
//                                     handleBlur,
//                                     handleSubmit,
//                                     isSubmitting,
//                                     isValid,
//                                     dirty,
//                                 }) => (
//                                     <Form onSubmit={handleSubmit}>
//                                         <Form.Group controlId="formBasicEmail">
//                                             <FloatingLabel
//                                                 controlId="email"
//                                                 label="Email"
//                                             >
//                                                 <Form.Control
//                                                     type="email"
//                                                     name="email"
//                                                     placeholder="Enter email"
//                                                     value={values.email}
//                                                     onChange={handleChange}
//                                                     onBlur={handleBlur}
//                                                     error={errors.email}
//                                                     isInvalid={touched.email && errors.email}
//                                                 />
//                                             <p className="text-danger"> {errors.email && touched.email && errors.email} </p>
//                                             </FloatingLabel>
//                                         </Form.Group>

//                                         <Form.Group controlId="formBasicPassword" className="mt-2">
//                                             <FloatingLabel
//                                                 controlId="password"
//                                                 label="Password"
//                                             >
//                                                 <Form.Control
//                                                     type="password"
//                                                     name="password"
//                                                     placeholder="Password"
//                                                     value={values.password}
//                                                     onChange={handleChange}
//                                                     onBlur={handleBlur}
//                                                     error={errors.password}
//                                                     isInvalid={errors.password && touched.password}
//                                                 />
//                                             <p className="text-danger">{errors.password && touched.password && errors.password} </p>
//                                             </FloatingLabel>
//                                         </Form.Group>
//                                         <Form.Group className="text-center d-grid mt-2">
//                                             <Button variant="primary" type="submit" size="lg" disabled={isSubmitting || !isValid || !dirty}>
//                                                 Submit
//                                             </Button>
//                                         </Form.Group>
//                                     </Form>
//                                 )}
//                             </Formik>

//                             <div className='d-flex justify-content-between mt-2'>
//                                 <Link to="/register">
//                                     <Button variant="link" size="lg">
//                                         Register
//                                     </Button>
//                                 </Link>
//                                 <Link to="forgot-password">
//                                     <Button variant="link" size="lg">
//                                         Forgot password?
//                                     </Button>
//                                 </Link>
//                             </div>
//                         </Card.Body>
//                     </Card>
//                 </Container>

//             </>
//         );


//     }
// }

const mapStateToProps = ({ auth }) => {
    console.log(auth, 'auth');
    // console.log()
    // const errors = auth.error?.errors?.map(error => { return ({ 'email': 'error.msg' }) });
    // console.log(errors?.[0], 'errors');

    return {
        isAuthenticated: auth.isAuthenticated,
        errors: auth.error,
        // errors: errors?.[0]
    }
}

const Login = connect(mapStateToProps, { singIn })(LoginPage);

export { Login };
