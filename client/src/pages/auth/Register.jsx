import React from 'react';
import { Button, Form, Container, Card, FloatingLabel } from 'react-bootstrap'
import { Route, Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const Register = () => {
    return (
        <>
            <Container className="justify-content-center container py-5 h-100 " style={{ maxWidth: '600px' }}>
                <Card className="shadow-lg p-3 mb-2 bg-white rounded ">
                    <Card.Header>
                        <h3 className="text-center">Register</h3>
                    </Card.Header>
                    {/* <Alert variant="danger">
                     <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                 </Alert> */}
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="firstName" className="" >
                                <FloatingLabel controlId="firstName" label="First name">
                                    <Form.Control type="text" placeholder="First name" />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="lastName" className="mt-2" >
                                <FloatingLabel controlId="lastName" label="Last name">
                                    <Form.Control type="text" placeholder="Last name" />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="email" className="mt-2" >
                                <FloatingLabel controlId="email" label="Email">
                                    <Form.Control type="email" placeholder="Email" />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="gander" className="mt-2" >
                                <FloatingLabel controlId="gander" label="Gander">
                                    <Form.Control as="select">
                                        <option value="m">f</option>
                                        <option value="f">m</option>
                                    </Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="password" className="mt-2" >
                                <FloatingLabel controlId="password" label="Password">
                                    <Form.Control type="password" placeholder="Password" />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword" className="mt-2" >
                                <FloatingLabel controlId="confirmPassword" label="Confirm your password">
                                    <Form.Control type="password" placeholder="confirm password" />
                                </FloatingLabel>
                            </Form.Group>
                            <div className="d-grid gap-2 mt-2">
                                <Button variant="primary" type="submit" size="lg">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                        <div className='d-flex justify-content-between mt-2'>
                            <Route>
                                <Link to="/login">
                                    <Button variant="link" size="lg">
                                        Login
                                    </Button>
                                </Link>
                            </Route>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

Register.propTypes = {};

export { Register };