import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FriendButton from '../components/misc/FriendButton';
import LoginModal from '../components/login/LoginModal';
import SignUpModal from '../components/signup/SignUpModal';
import { useAuth } from '../contexts/auth';

const useStyles = makeStyles({
    root: {
        minHeight: 'calc(100vh - 64px)',
        textAlign: 'center',
        margin: 0,
        paddingTop: 40,
    },
    background: {
        backgroundColor: '#F6FBFE',
    },
    par: {
        marginBottom: 20,
    },
    image: {
        maxHeight: 350,
        maxWidth: '100vw'
    }
});

const MainPageIn = () => {
    const classes = useStyles();
    const { user } = useAuth();
 
    return (
        <Grid container className={classes.background}>
            <Grid item xs={false} md={1} lg={2} />
            <Grid 
                item 
                xs={12} lg={8} md={10} 
                container 
                className={classes.root} 
                direction="column" 
                justify="space-between" 
                alignItems="center" 
            >
                <Typography variant="h1">
                    {user && `Welcome back, ${user.firstName} ${user.lastName}!`}
                </Typography>
                <Link to="/myPets">
                    <FriendButton>
                        My Pet Friends
                    </FriendButton>
                </Link>
                <Link to="/search">
                    <FriendButton>
                        Search A Friend
                    </FriendButton>
                </Link>
                <img
                    className={classes.image}
                    src="images/background-doge.png"
                    alt="pipping dog"
                />
            </Grid>
            <Grid item xs={false} md={1} lg={2} />
            <LoginModal />
            <SignUpModal />
        </Grid>
    )
}

export default MainPageIn
