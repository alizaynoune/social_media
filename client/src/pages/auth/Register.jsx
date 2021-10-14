import { Button, Alert, Form, Container, Card, FloatingLabel } from 'react-bootstrap'
// import { Input } from 'reactstrap';


function Register() {
    return (
        <>
            <Container className="justify-content-center" >
                <Card className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
                    <Card.Header>
                        <h3 className="text-center">Login</h3>
                    </Card.Header>
                    <Alert variant="danger">
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    </Alert>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="firstName" className="mt-2" >
                                <FloatingLabel controlId="floatingInputGrid" label="First name">
                                    <Form.Control type="text" placeholder="First name" />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="lastName" className="mt-3" >
                                <FloatingLabel controlId="floatingInputGrid" label="Last name">
                                    <Form.Control type="text" placeholder="Last name" />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="email" className="mt-3" >
                                <FloatingLabel controlId="floatingInputGrid" label="Email">
                                    <Form.Control type="email" placeholder="Email" />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="gander" className="mt-3" >
                                <FloatingLabel controlId="floatingInputGrid" label="Gander">
                                    <Form.Control as="select">
                                        <option value="m">f</option>
                                        <option value="f">m</option>
                                    </Form.Control>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="password" className="mt-3" >
                                <FloatingLabel controlId="floatingInputGrid" label="Password">
                                    <Form.Control type="password" placeholder="Password" />
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword" className="mt-3" >
                                <FloatingLabel controlId="floatingInputGrid" label="Confirm your password">
                                    <Form.Control type="password" placeholder="confirm password" />
                                </FloatingLabel>
                            </Form.Group>

                            
                            <div className="d-grid gap-2 mt-3">
                                <Button variant="primary" type="submit" size="lg">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

        </>
    )
}

export default Register

