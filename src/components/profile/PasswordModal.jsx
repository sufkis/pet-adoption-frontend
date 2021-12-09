import { useContext } from 'react';
import { Modal, Grid, Paper, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MainContext } from '../../contexts/MainContext';
import PasswordForm from './PasswordForm';

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
        width: '45vw', 
        height: '75vh',
        position: 'relative',
        display: 'flex-column',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
});

const PasswordModal = () => {
    const { isPasswordModalOpen, handleModalClose } = useContext(MainContext);
    const classes = useStyles();

    return (
        <Modal
            className={classes.modal}
            open={isPasswordModalOpen}
            onClose={() => handleModalClose('password')}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isPasswordModalOpen}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <PasswordForm />
                    </Paper>
                </Grid>
            </Fade>
        </Modal>
    )
}

export default PasswordModal
