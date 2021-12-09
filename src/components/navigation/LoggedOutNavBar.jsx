import { useContext } from 'react';
import { AppBar, Toolbar, Grid } from '@material-ui/core';
import FriendButton from '../misc/FriendButton';
import { MainContext } from '../../contexts/MainContext';
import LogoNav from './LogoNav';

const LoggedOutNavBar = () => {
    const { handleModalOpen } = useContext(MainContext);
    
    return (
        <AppBar position="static" >
            <Toolbar>
                <Grid container justify="space-between">
                    <LogoNav />
                    <Grid item container xs={8} md={9} alignContent="center" justify="space-evenly" >
                        <FriendButton handleOnClick={() => handleModalOpen('login')}>Login</FriendButton>
                        <FriendButton handleOnClick={() => handleModalOpen('signUp')}>Sign Up</FriendButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default LoggedOutNavBar
