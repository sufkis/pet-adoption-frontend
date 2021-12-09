import { useContext } from 'react';
import { Modal, Grid, Paper, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../contexts/MainContext';
import SignUpForm from './SignUpForm'

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#F2BC79',
        border: '1px solid #242526',
        borderRadius: 20,
        width: '50vw', 
        height: '90vh',
        position: 'relative',
        display: 'flex-column',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
});

const SignUpModal = () => {
    const { isSignUpModalOpen, handleModalClose } = useContext(MainContext);
    const classes = useStyles();

    return (
        <Modal
            className={classes.modal}
            open={isSignUpModalOpen}
            onClose={() => handleModalClose('signUp')}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isSignUpModalOpen}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <SignUpForm />
                    </Paper>
                </Grid>
            </Fade>
        </Modal>
    )
}

export default SignUpModal
