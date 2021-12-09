import { CircularProgress, Grid, makeStyles, TextField } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { MainContext } from "../../contexts/MainContext";
import { updateUser } from "../../lib/api";
import FriendButton from "../misc/FriendButton"

const useStyles = makeStyles({
    form: {
        marginTop: '5rem',
        maxWidth: '520px'
    },
    formColumn: {
        minWidth: '275px',
        height: '45vh'
    },
    formItem: {
        margin: '1rem 0',
    },
    topFromItem: {
        margin: '0 0 1rem 0',
    },
    botFormItem: {
        margin: '1rem 0 0 0',
    },
    alert: {
        marginTop: '-4rem',
        maxHeight: '35px',
    },
});

const ProfileForm = () => {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const bioRef = useRef();
    const { handleModalOpen } = useContext(MainContext);
    const classes = useStyles();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const { setTokenAndUser, token, user } = useAuth();

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessful(false);
        const profileInfo = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            bio: bioRef.current.value,
        }
        try {
            const response = await updateUser(profileInfo, token);
            setTokenAndUser(token, response.user);
            setSuccessful(true);
        }
        catch (err) {
            setError(err.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const { firstName, lastName, email, phone, bio } = user;
        firstNameRef.current.value = firstName;
        lastNameRef.current.value = lastName;
        emailRef.current.value = email;
        phoneRef.current.value = phone;
        bioRef.current.value = bio;
    }, [user]);
    
    return (
        <form onSubmit={handleProfileSubmit}>
            <Grid container className={classes.form} justify='center'>
                {error && <Alert severity="error" className={classes.alert}>{error}</Alert>}
                {successful && <Alert severity="success" className={classes.alert}>Profile settings updated successfully!</Alert>}
                <FriendButton
                    style={{ maxWidth: 300 }}
                    handleOnClick={() => handleModalOpen('password')}
                    >
                    Change Password
                </FriendButton>
                <Grid container spacing={4}>
                    <Grid item sm={6} container direction="column" justify="center" className={classes.formColumn}>
                        <TextField
                            className={classes.topFromItem}
                            variant="outlined"
                            color="secondary"
                            type="text"
                            label="First Name"
                            inputRef={firstNameRef}
                            required
                        />
                        <TextField
                            className={classes.formItem}
                            variant="outlined"
                            color="secondary"
                            type="text"
                            label="Last Name"
                            inputRef={lastNameRef}
                            required
                        />
                        <TextField
                            className={classes.botFormItem}
                            variant="outlined"
                            color="secondary"
                            type="email"
                            label="Email"
                            inputRef={emailRef}
                            required
                        />
                    </Grid>
                    <Grid item sm={6} container direction="column" justify="center" className={classes.formColumn}>
                        <TextField
                            className={classes.topFromItem}
                            variant="outlined"
                            color="secondary"
                            type="tel"
                            label="Phone Number"
                            inputRef={phoneRef}
                            required
                        />
                        <TextField
                            className={classes.botFormItem}
                            variant="outlined"
                            color="secondary"
                            type="text"
                            label="Personal Bio.."
                            multiline
                            rows={5}
                            inputRef={bioRef}
                        />
                    </Grid>
                </Grid>
                {loading ?
                    <CircularProgress color="secondary" />
                    :
                    <FriendButton type="submit">
                        Submit Changes
                </FriendButton>
                }
            </Grid>
        </form>
    )
}

export default ProfileForm
