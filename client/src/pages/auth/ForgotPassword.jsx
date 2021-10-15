import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button, Alert, Form, Container, Card, FloatingLabel } from 'react-bootstrap'

class ForgotPassword extends Component {
    render() {
        return (
            <>
                <Container className="justify-content-center container py-5 h-100" style={{ maxWidth: '600px' }}>
                    <Card className="shadow-lg p-3 mb-2 bg-white rounded ">
                        <Card.Header>
                            <h3 className="text-center">Forgot Password</h3>
                        </Card.Header>
                        {/* <Alert variant="danger">
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        </Alert> */}
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="email" className="mt-2" >
                                    <FloatingLabel controlId="email" label="Email">
                                        <Form.Control type="email" placeholder="Email" />
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
                                    <Link to="login">
                                        <Button variant="link" size="lg">
                                            login
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button variant="link" size="lg">
                                            Register
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
}

export { ForgotPassword };