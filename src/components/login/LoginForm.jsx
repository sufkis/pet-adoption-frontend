import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { CircularProgress, makeStyles, TextField, Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import FriendButton from "../misc/FriendButton";
import { MainContext } from "../../contexts/MainContext";
import { useAuth } from "../../contexts/auth";
import { login } from "../../lib/api";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '70vh',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 5,
    },
    field: {
        width: '70%',
    }
});

const LoginForm = () => {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { handleModalClose, handleModalOpen } = useContext(MainContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setTokenAndUser } = useAuth();
    const history = useHistory();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (!emailRef.current.value || !passwordRef.current.value) {
            setError('Please provide both email and password.');
            setLoading(false);
            return;
        }
        const loginInfo = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            const { token, user } = await login(loginInfo);
            await setTokenAndUser(token, user);
            setLoading(false);
            handleModalClose('login');
            history.push('/');
        }
        catch (err) {
            setLoading(false);
            setError(err.response.data.message);
        }
    }

    return (
        <form className={classes.root} onSubmit={handleLoginSubmit}>
            <Typography variant="h1">Login</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="email"
                label="Email"
                inputRef={emailRef}
            />
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="password"
                label="Password"
                inputRef={passwordRef}
            />
            {loading ?
                <CircularProgress color="secondary" />
                :
                <FriendButton type="submit">
                    Login
                </FriendButton>
            }
            <Typography component="div" >
                Don't have an account yet?
                <Typography
                    variant="h6"
                    onClick={() => {
                        handleModalClose('login');
                        handleModalOpen('signUp');
                    }}
                >
                    Sign Up
                </Typography>
            </Typography>
        </form>
    )
}

export default LoginForm
