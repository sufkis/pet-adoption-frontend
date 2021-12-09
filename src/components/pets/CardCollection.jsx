import { Grid, makeStyles } from '@material-ui/core'
import PetCard from './PetCard'

const useStyles = makeStyles({
    collection: {
        width: '100%',
    },
});

const CardCollection = ({ pets }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.collection} spacing={3} justify="center">
            {
                pets.map(pet => {
                    return <PetCard key={pet.pet_id} pet={pet} />
                })
            }
        </Grid>
    )
}

export default CardCollection
