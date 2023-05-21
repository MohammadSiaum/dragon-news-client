import React, { useContext } from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LeftSideNav from '../LeftSideNav/LeftSideNav';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { FaUser } from 'react-icons/fa';
import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';



const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => { });
    }

    return (
        <Navbar sticky="top" className='mb-5 header-navibar' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><Link to='/'>Dragon News</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">All News</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <div>
                            {
                                user?.uid ?
                                    <Nav.Link className='me-2'>{user?.displayName}</Nav.Link>
                                    :
                                    <>
                                        <Link className='' to='/login'><Button variant="dark">Log In</Button></Link>
                                        <Link to='/register'><Button variant="dark">Register</Button></Link>
                                    </>
                            }
                        </div>

                        <div>
                            
                            <Link to='/profile'>
                                {user?.photoURL ?
                                    <Image
                                        style={{ height: '30px', width: '30px' }}
                                        roundedCircle
                                        src={user.photoURL}></Image>
                                    :
                                    <>
                                        {user?.uid ? <FaUser style={{ height: '20px', width: '20px' }}></FaUser> : <></>

                                        }

                                    </>

                                }
                            </Link>

                            {
                                user?.uid ?
                                    <Link className='ms-2' to='/login'><Button onClick={handleLogOut} variant="dark">Log Out</Button></Link>
                                    : <> </>

                            }
                        </div>
                    </Nav>
                    <div className='d-lg-none'>
                        <LeftSideNav></LeftSideNav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;