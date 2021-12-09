import { useEffect, useState } from 'react';
import { CircularProgress, Grid, makeStyles, Switch, Typography } from '@material-ui/core'
import CardCollection from '../components/pets/CardCollection';
import { getStatusesById, getHeartiesByUserId } from '../lib/api';
import { useAuth } from '../contexts/auth';

const useStyles = makeStyles({
    pageWrapper: {
        marginTop: 25,
    },
    header: {
        marginBottom: 20,
    },
});

const MyPets = () => {
    const classes = useStyles();
    const [switched, setSwitched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pets, setPets] = useState([]);
    const { user, token } = useAuth()

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        const init = async () => {
            if (switched) {
                const heartedPets = await getHeartiesByUserId(user.id, token);
                isMounted && setPets(heartedPets);
            }
            else {
                const myPets = await getStatusesById(user.id, token);
                isMounted && setPets(myPets);
            }
            setLoading(false);
        };
        user && init();
        return () => {
            isMounted = false;
        }
    }, [switched, token, user])

    return (
        <Grid
            container
            direction="column"
            alignItems='center'
            className={classes.pageWrapper}
        >
            {switched ?
                <Typography variant="h1">
                    Hearted Pets
                </Typography>
                :
                <Typography variant="h1">
                    My Pets
                </Typography>
            }
            <Grid
                component="label"
                container
                alignItems="center"
                justify="center" spacing={1}
                className={classes.header}
            >
                <Grid item><Typography variant="h4">My Pets</Typography></Grid>
                <Grid item>
                    <Switch
                        color="default"
                        onChange={() => {setPets([]); setSwitched(!switched);}}
                    />
                </Grid>
                <Grid item><Typography variant="h4">Hearted Pets</Typography></Grid>
            </Grid>
            {loading && <CircularProgress color="secondary" />}
            {switched ?
                <>
                    {pets.length === 0 && <Typography variant="h2">You still have not hearted any pets</Typography>}
                </>
                :
                <>
                    {pets.length === 0 && <Typography variant="h2">You currently do not own any pets</Typography>}
                </>
            }
            <CardCollection pets={pets} />
        </Grid>
    )
}

export default MyPets
