import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { CircularProgress, Typography, TextField, makeStyles, Grid } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import FriendButton from "../misc/FriendButton"
import { MainContext } from "../../contexts/MainContext";
import { useAuth } from "../../contexts/auth";
import { signUp } from "../../lib/api";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    field: {
        width: '70%',
    },
    name: {
        width: '45%',
    },
    nameContainer: {
        justifyContent: 'space-evenly',
    }
});

const SignUpForm = () => {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const { handleModalClose, handleModalOpen } = useContext(MainContext);
    const { setTokenAndUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (passwordRef.current.value !== repeatPasswordRef.current.value) {
            setError("The passwords don't match");
            setLoading(false);
            return;
        }
        const signUpInfo = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            phone: phoneRef.current.value,
        }
        try {
            const { token, user } = await signUp(signUpInfo);
            await setTokenAndUser(token, user);
            history.push('/');
            handleModalClose('signUp');
        }
        catch (err) {
            setError(err.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form className={classes.root} onSubmit={handleSignUpSubmit}>
            <Typography variant="h1">Sign Up</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container className={classes.nameContainer}>
                <TextField
                    className={classes.name}
                    variant="outlined"
                    color="secondary"
                    type="text"
                    label="First Name"
                    inputRef={firstNameRef}
                    required
                />
                <TextField
                    className={classes.name}
                    variant="outlined"
                    color="secondary"
                    type="text"
                    label="Last Name"
                    inputRef={lastNameRef}
                    required
                />
            </Grid>
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="tel"
                label="Phone Number"
                inputRef={phoneRef}
                required
            />
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="email"
                label="Email"
                inputRef={emailRef}
                required
            />
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="password"
                label="Password"
                inputRef={passwordRef}
                required
            />
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="password"
                label="Repeat Password"
                inputRef={repeatPasswordRef}
                required
            />
            {loading ?
                <CircularProgress color="secondary" />
                :
                <FriendButton type="submit">
                    Submit
                </FriendButton>
            }
            <Typography component="div" >
                Already have an account?
                <Typography
                    variant="h6"
                    onClick={() => {
                        handleModalClose('signUp');
                        handleModalOpen('login');
                    }}
                >
                    Login
                </Typography>
            </Typography>
        </form>
    )
}

export default SignUpForm
