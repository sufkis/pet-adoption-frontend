import { useState, useEffect } from 'react'
import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import FriendButton from '../misc/FriendButton';
import { getPetById, updatePetStatus, addStatus, updateStatus, removeStatus, addHearty, getHearty, removeHearty } from '../../lib/api';
import { useAuth } from '../../contexts/auth';

const useStyles = makeStyles({
    image: {
        maxHeight: 275,
        border: '2px solid #8C4830',
        borderRadius: 10,
    },
    textHolderLeft: {
        textAlign: 'start'
    },
    textHolderRight: {
        textAlign: 'end'
    },
    text: {
        color: '#8C4830',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
    },
});

const PetPage = ({ petId }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [petInfo, setPetInfo] = useState();
    const [petStatus, setPetStatus] = useState();
    const [isHearted, setIsHearted] = useState(false);
    const [hypo, setHypo] = useState();
    const [error, setError] = useState('');
    const { token } = useAuth();
    const petStatusEnum = {
        adopted: 'Adopted',
        fostered: 'Fostered',
        waiting: 'Waiting'
    }

    const handleAdoptClick = async () => {
        setError('');
        setLoading(true);
        try {
            const { status } = await updatePetStatus(petId, { status: petStatusEnum.adopted }, token);
            if (petStatus === petStatusEnum.waiting) {
                await addStatus(petId, { status: petStatusEnum.adopted }, token);
            }
            else {
                await updateStatus(petId, { status: petStatusEnum.adopted }, token);
            }
            setPetStatus(status);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleFosterClick = async () => {
        setError('');
        setLoading(true);
        try {
            const { status } = await updatePetStatus(petId, { status: petStatusEnum.fostered }, token);
            if (petStatus === petStatusEnum.waiting) {
                await addStatus(petId, { status: petStatusEnum.fostered }, token);
            }
            else {
                await updateStatus(petId, { status: petStatusEnum.fostered }, token);
            }
            setPetStatus(status);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleReturnClick = async () => {
        setError('');
        setLoading(true);
        try {
            const { status } = await updatePetStatus(petId, { status: petStatusEnum.waiting }, token);
            await removeStatus(petId, token);
            setPetStatus(status);
        }
        catch (err) {
            setError(err.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleHeartyClick = async () => {
        setError('');
        setLoading(true);
        try {
            await addHearty(petId, token);
            setIsHearted(true);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleUnHeartyClick = async () => {
        setError('');
        setLoading(true);
        try {
            await removeHearty(petId, token);
            setIsHearted(false);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const petInformation = await getPetById(petId, token);
                switch (petInformation.status) {
                    case petStatusEnum.adopted:
                        setPetStatus(petStatusEnum.adopted);
                        break;
                    case petStatusEnum.fostered:
                        setPetStatus(petStatusEnum.fostered);
                        break;
                    default:
                        setPetStatus(petStatusEnum.waiting);
                        break;
                }
                if (petInformation.hypoallergenic) setHypo('Yes');
                else setHypo('No');
                setPetInfo(petInformation);
            }
            catch (err) {
                alert(err.message);
            }
        })();
    }, [petId, petStatusEnum.adopted, petStatusEnum.fostered, petStatusEnum.waiting, token]);

    useEffect(() => {
        (async () => {
            try {
                const hearty = await getHearty(petId, token);
                if (hearty.length) setIsHearted(true);
            }
            catch (err) {
                alert(err.message);
            }
        })();
    }, [petId, token]);

    if (!petInfo) {
        return (
            <CircularProgress color="secondary" />
        )
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Typography variant="h1">
                {`Meet ${petInfo.name}!`}
            </Typography>
            <Grid container item xs={12} >
                <Grid container item xs={4} justify="center">
                    {loading ?
                        <CircularProgress color="secondary" />
                        :
                        <Grid item className={classes.buttons}>
                            {petStatus !== petStatusEnum.adopted && <FriendButton handleOnClick={handleAdoptClick}>Adopt</FriendButton>}
                            {petStatus === petStatusEnum.waiting && <FriendButton handleOnClick={handleFosterClick}>Foster</FriendButton>}
                        </Grid>
                    }
                </Grid>
                <Grid container item xs={4} justify="center">
                    <img
                        className={classes.image}
                        src={petInfo.image}
                        alt="pet-profile"
                    />
                </Grid>
                <Grid container item xs={4} justify="center">
                    {loading ?
                        <CircularProgress color="secondary" />
                        :
                        <Grid item className={classes.buttons}>
                            {petStatus !== petStatusEnum.waiting && <FriendButton handleOnClick={handleReturnClick}>Return</FriendButton>}
                            {isHearted ? <FriendButton handleOnClick={handleUnHeartyClick}>unHearty</FriendButton> : <FriendButton handleOnClick={handleHeartyClick}>Hearty</FriendButton>}
                        </Grid>
                    }
                </Grid>
            </Grid>
            {error && <Alert severity="error" className={classes.alert}>{error}</Alert>}
            <Grid container item xs={10}>
                <Grid item md={6} xs={12} className={classes.textHolderLeft}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Name:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petInfo.name}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderRight}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Status:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petStatus}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderLeft}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Height:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petInfo.height}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderRight}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Weight:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petInfo.weight}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderLeft}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Color:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petInfo.color}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderRight}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Hypoallergenic:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${hypo}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderLeft}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Type:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petInfo.type}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderRight}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Breed:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petInfo.breed}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderLeft}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Bio:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petInfo.bio}`}
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12} className={classes.textHolderRight}>
                    <Typography variant="h4" component="span" className={classes.text}>
                        Diet:
                    </Typography>
                    <Typography variant="subtitle2" component="span">
                        {` ${petInfo.diet}`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={3} />
        </Grid>
    )
}

export default PetPage
