import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaTwitch, FaDiscord } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { FcPrivacy } from "react-icons/fc";
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from '../BrandCarousel/BrandCarousel';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';

const RightSideNav = () => {
    const { providerLogin } = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => console.error(error));

    }

    return (
        <div>
            <ButtonGroup className='gap-2' vertical >
                <Button onClick={handleGoogleSignIn} variant="outline-primary"> <FaGoogle></FaGoogle> Login via Google</Button>
                <Button variant="outline-dark"><FaGithub></FaGithub> Login via GitHub</Button>
            </ButtonGroup>
            <div className='mt-4'>
                <h5>Find us on</h5>
                <ListGroup >
                    <ListGroup.Item className='mb-3'><FaFacebook /> Facebook</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><FaTwitter /> Twitter</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><FaWhatsapp /> WhatsApp</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><FaDiscord /> Discord</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><MdPrivacyTip /> Privacy Policy</ListGroup.Item>
                    <ListGroup.Item className='mb-3'><FcPrivacy /> Term & Condition</ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                <BrandCarousel></BrandCarousel>
            </div>
        </div>

    );
};

export default RightSideNav;