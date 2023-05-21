import React, { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const Profile = () => {
    const {user, updateUserProfile} = useContext(AuthContext);
    const [name, setName] = useState(user.displayName);

    // way - 2
    const photoURLRef = useRef(user.photoURL);

    const handleSubmit = event => {
        event.preventDefault();
        // console.log(name);
        // console.log(photoURLRef.current.value);

        const photoURL = photoURLRef.current.value
        handleUpdateUserProfile(name, photoURL);
        
    }

    // way - 1
    const handleNameChange = event => {
        setName(event.target.value);
    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }

        updateUserProfile(profile)
          .then(result => {})
          .catch(er => console.error(er));
    }

    return (
        <div className='bg-secondary bg-gradient bg-opacity-25 pt-5 pb-5 rounded mb-5'>
            <h2 className='text-center mb-3'>Your Profile</h2>
            <Form onSubmit={handleSubmit} className='form-container'>
                <Form.Group className="mb-3 w-75" controlId="formBasicName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control onChange={handleNameChange} defaultValue={name} name='name' type="name" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3 w-75" controlId="formBasicPhotoURL">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control ref={photoURLRef} defaultValue={user?.photoURL} name='photoURL' type="photoURL" placeholder="Photo URL" />
                </Form.Group>
                <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control readOnly defaultValue={user?.email} name='email' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-4 w-75" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" />
                </Form.Group>
        
            
                <Button className='w-25' variant="primary" type="submit">
                    Update
                </Button>
            </Form>
       </div>
    );
};

export default Profile;