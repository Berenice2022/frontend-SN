import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from './context/AuthContext';

function ProtectedRoute() {
    const {loading, isAuthenticated} = useAuth();
    console.log("loading:"+loading);
    console.log("isAuthenticated"+ isAuthenticated);

    if(loading){
        return <h1>Charging...</h1>
    }

    if(!loading && !isAuthenticated)
    return<Navigate to='/login' replace/>

    return (
        <Outlet/> 
    )
}

export default ProtectedRoute