import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


/* 
1. Only allow authenticated user to visit the route
2.
3. Redirect user to the route they wanted to go before login


*/
const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div className='text-center mt-5'>
            <Spinner animation="grow" variant="secondary" 
              style={{ height: '50px' , width: '50px' }}/>
        </div>
    }

    if(!user){
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default PrivateRoute;