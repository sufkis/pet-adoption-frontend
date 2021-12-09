import { Modal, Grid, Paper, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PetPage from './PetPage'

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
        width: '55vw', 
        height: '95vh',
        position: 'relative',
        display: 'flex-column',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
});

const PetModal = ({ petId, isOpen, handleModalClose }) => {
    const classes = useStyles();
    
    return (
        <Modal
            className={classes.modal}
            open={isOpen}
            onClose={handleModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <PetPage petId={petId} />
                    </Paper>
                </Grid>
            </Fade>
        </Modal>
    )
}

export default PetModal
