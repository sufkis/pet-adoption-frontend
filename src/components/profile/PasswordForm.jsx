import { useContext, useRef, useState } from "react";
import { Button, CircularProgress, makeStyles, TextField, Typography } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import FriendButton from "../misc/FriendButton";
import { MainContext } from "../../contexts/MainContext";
import { useAuth } from "../../contexts/auth";
import { updatePasswordByUserId } from "../../lib/api";

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

const PasswordForm = () => {
    const classes = useStyles();
    const currentPasswordRef = useRef();
    const newPasswordRef = useRef();
    const repeatPasswordRef = useRef();
    const { handleModalClose } = useContext(MainContext);
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState('');
    const [error, setError] = useState('');
    const { token, user } = useAuth();

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessful(false);
        if (!currentPasswordRef.current.value || !newPasswordRef.current.value || !repeatPasswordRef.current.value) {
            setError('Please fill all of the fields out.');
            setLoading(false);
            return;
        }
        if (newPasswordRef.current.value !== repeatPasswordRef.current.value) {
            setError("New passwords don't match.");
            setLoading(false);
            return;
        }
        const passwordInfo = {
            currentPassword: currentPasswordRef.current.value,
            newPassword: newPasswordRef.current.value,
        }
        try {
            const { message } = await updatePasswordByUserId(passwordInfo, user.id, token);
            setSuccessful(message);
        }
        catch (err) {
            setError(err.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form className={classes.root} onSubmit={handlePasswordSubmit}>
            <Typography variant="h1">Password Change</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {successful && <Alert severity="success">{successful}</Alert>}
            {successful && <Button onClick={() => handleModalClose('password')}>Close window</Button>}
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="password"
                label="Current Password"
                inputRef={currentPasswordRef}
            />
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="password"
                label="New Password"
                inputRef={newPasswordRef}
            />
            <TextField
                className={classes.field}
                variant="outlined"
                color="secondary"
                type="password"
                label="Repeat New Password"
                inputRef={repeatPasswordRef}
            />
            {loading ?
                <CircularProgress color="secondary" />
                :
                <FriendButton type="submit">
                    Change Password
                </FriendButton>
            }
        </form>
    )
}

export default PasswordForm
