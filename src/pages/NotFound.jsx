import {Navigate} from 'react-router-dom';

function NotFound() {
    return (
        <Navigate to='/posts' replace/>
    )
}

export default NotFound;