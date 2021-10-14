import { Button, Alert, Form, Container, Card } from 'react-bootstrap'

function Login() {
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
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

export default Login
