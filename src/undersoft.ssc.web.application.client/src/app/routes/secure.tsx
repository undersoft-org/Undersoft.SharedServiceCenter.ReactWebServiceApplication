import { Navigate } from 'react-router-dom';
import { currentUser } from '../../../infra/store/userAccountStore'

export { SecuredRoute };

function SecuredRoute({ children }:any) {
    // const { user: authUser } = useSelector(x => x.auth);
    
    if (!currentUser.IsAuthorized) {
        return <Navigate to="/auth/signin" />
    }
    return children;
}