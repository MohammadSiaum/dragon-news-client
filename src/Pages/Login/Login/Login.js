import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { logInUser, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logInUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('');
                if (user.emailVerified) {
                    setSuccess('Successfully login.');
                    navigate(from, { replace: true });
                    toast.success("Login Successfully");
                }
                else {
                    toast.error("Your email is not verified. Please verify email.");
                }
            })
            .catch(er => {
                console.error(er);
                setError(er.message);
                setSuccess('');
                toast.error("Please fix this Error !");
            })
            .finally(() => setLoading(false));
    }
    return (
        <div className='bg-secondary bg-gradient bg-opacity-25 pt-5 pb-5 rounded mb-5'>
            <h2 className='text-center mb-3'>Log In</h2>
            <Form onSubmit={handleSubmit} className='form-container'>
                <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4 w-75" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required />
                    <Form.Text className="text-muted">
                        Please don't share your password with anyone else.
                    </Form.Text>
                    {
                        success ?
                            <p className='mt-2 text-success'>
                                {success}
                            </p>
                            : <p className='mt-2 text-danger'>
                                {error}
                            </p>
                    }
                </Form.Group>

                <Button className='w-25' variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
        </div>
    );
};

export default Login;