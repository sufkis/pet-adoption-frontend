import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import Icon from '@mdi/react'
import { mdiViewDashboard, mdiAccountCog, mdiHome } from '@mdi/js';
import FriendButton from '../misc/FriendButton';
import { useAuth } from '../../contexts/auth';
import LogoNav from './LogoNav';

const LoggedInNavBar = () => {
    const history = useHistory();
    const { user, removeTokenAndUser } = useAuth();
    const isAdmin = user.role === 'admin';

    return (
        <AppBar position="static" >
            <Toolbar>
                <Grid container>
                    <LogoNav />
                    <Grid item container xs={8} md={9} alignContent="center" justify="flex-end">
                        {isAdmin && <Link to="/dashboard">
                            <Button endIcon={<Icon path={mdiViewDashboard} title="Home Page" size={1.25} />} >
                                Dashboard
                            </Button>
                        </Link>}
                        <Link to="/">
                            <Button endIcon={<Icon path={mdiHome} title="Home Page" size={1.25} />} >
                                Home
                            </Button>
                        </Link>
                        <Link to="/settings">
                            <Button endIcon={<Icon path={mdiAccountCog} title="Account Settings" size={1.25} />}>
                                {user.firstName}
                            </Button>
                        </Link>
                        <FriendButton handleOnClick={() => { removeTokenAndUser(); history.push('/welcome'); }}>Logout</FriendButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default LoggedInNavBar
