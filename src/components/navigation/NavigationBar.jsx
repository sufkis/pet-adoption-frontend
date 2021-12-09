import { useAuth } from '../../contexts/auth';
import LoggedOutNavBar from './LoggedOutNavBar';
import LoggedInNavBar from './LoggedInNavBar';

const NavigationBar = () => {
    const { token, user } = useAuth();

    return (
        <>
            {token && user ?
                <LoggedInNavBar />
                :
                <LoggedOutNavBar />
            }
        </>
    )
}

export default NavigationBar
