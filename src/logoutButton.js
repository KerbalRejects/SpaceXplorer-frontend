import {useAuth0} from '@auth0/auth0-react';

const LogoutButton = () => {
    const {logout, isAuthenticated} = useAuth0();

    retun (
        isAuthenticated && (
        <button onClick ={() => logout()}>
            Sign Out
        </button>
        )
    )
}

export default LogoutButton;