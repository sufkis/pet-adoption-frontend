import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FriendButton from '../components/misc/FriendButton';
import LoginModal from '../components/login/LoginModal';
import SignUpModal from '../components/signup/SignUpModal';

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

const MainPageOut = () => {

    const classes = useStyles();

    return (
        <Grid container className={classes.background}>
            <Grid item xs={false} lg={2} md={1}></Grid>
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
                    Welcome to Find A Friend!
                </Typography>
                <Typography className={classes.par} variant="h4">
                    At find a friend we strongly believe a pet should be adopted, not bought. Our goal is to make the search for a pet easy and fun. Hit the button below and start the search to find your new friend!
                </Typography>
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
            <Grid item xs={false} lg={2} md={1}></Grid>
            <LoginModal />
            <SignUpModal />
        </Grid>
    )
}

export default MainPageOut
