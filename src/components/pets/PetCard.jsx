import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import { useState, useContext } from 'react';
import FriendButton from '../misc/FriendButton';
import PetModal from './PetModal';
import { useAuth } from '../../contexts/auth'
import { MainContext } from '../../contexts/MainContext';

const useStyles = makeStyles({
    root: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#F2BC79',
        maxHeight: 350,
        minHeight: 350,
        boxShadow: '4px 4px 12px -2px #000000'
    },
    cardItem: {
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
    },
    cardHeader: {
        paddingBottom: 0,
    },
    cardStatus: {
        marginTop: 4,
        textAlign: 'end',
    },
    cardButton: {
        justifyContent: 'center',
    },
});

const PetCard = ({ pet }) => {
    const classes = useStyles();
    const { name, status, image } = pet;
    const [isOpen, setIsOpen] = useState(false);
    const { token } = useAuth();
    const { handleModalOpen } = useContext(MainContext);

    const handlePetModalClose = () => {
        setIsOpen(false);
    }

    const handlePetModalOpen = () => {
        if (!token) handleModalOpen('login');
        else setIsOpen(true);
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.cardItem}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Pet Image"
                        height="235"
                        image={image}
                        title="Pet Card"
                    />
                    <CardContent className={classes.cardHeader}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography gutterBottom variant="h3" component="h2">
                                    {name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.cardStatus}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {status}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardButton}>
                    <FriendButton handleOnClick={handlePetModalOpen}>
                        See More
                    </FriendButton>
                </CardActions>
            </Card>
            <PetModal petId={pet.pet_id} isOpen={isOpen} handleModalClose={handlePetModalClose} />
        </Grid>
    );
}

export default PetCard
