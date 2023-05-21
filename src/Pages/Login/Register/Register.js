import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [accepted, setAccepted] = useState(false);
    const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        createUser(email, password)
            .then(result => {
                const user = result.user;
                user.displayName = name;
                user.photoURL = photoURL;
                console.log(user);
                form.reset();
                setError('');
                setSuccess('Successfully login.');
                navigate('/');
                handleUpdateUserProfile(name, photoURL);
                handleEmailVerification();
                toast.success('Please verify your email and check your inbox');
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
                setSuccess('');
            });

    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL 
        }

        updateUserProfile(profile)
          .then(() => {})
          .catch(er => console.error(er));
    }

    const handleEmailVerification = () => {
        verifyEmail()
          .then(() => {})
          .catch(er => console.error(er));
    }

    const handleAccepted = event => {
        const checked = event.target.checked;
        setAccepted(checked);

    }
    return (
        <div className='bg-secondary bg-gradient bg-opacity-25 pt-5 pb-5 rounded mb-5'>
            <h2 className='text-center mb-3'>Register</h2>
            <Form onSubmit={handleSubmit} className='form-container'>
                <Form.Group className="mb-3 w-75" controlId="formBasicName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control name='name' type="name" placeholder="Enter name" required />
                </Form.Group>
                <Form.Group className="mb-3 w-75" controlId="formBasicPhotoURL">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control name='photoURL' type="photoURL" placeholder="Photo URL" />
                </Form.Group>
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        onClick={handleAccepted}
                        type="checkbox" 
                        label={<>Accept <Link to='/terms'>Terms & Conditions</Link></>} />
                </Form.Group>
                <Button disabled={!accepted} className='w-25' variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;