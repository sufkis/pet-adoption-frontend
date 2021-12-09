import { Typography, Grid, makeStyles } from "@material-ui/core"
import CardCollection from "../pets/CardCollection";

const useStyles = makeStyles({
    headerDiv: {
        maxHeight: 100
    },
    header: {
        marginTop: 5
    },
    info: {
        marginTop: 15,
    }
});

const UserProfile = ({ user, pets }) => {
    const classes = useStyles();
    const { firstName, lastName, email, phone, bio } = user;

    return (
        <>
            <Grid container item xs={12} justify="center" className={classes.headerDiv}>
                <Typography variant="h1" className={classes.header}>
                    User Information
                </Typography>
            </Grid>
            <Grid container item xs={12} className={classes.info}>
                <Grid container item xs={12}>
                    <Grid item md={6} xs={12}>
                        <Typography variant="h4" component="span">
                            First Name:
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                            {` ${firstName}`}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography variant="h4" component="span">
                            Last Name:
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                            {` ${lastName}`}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography variant="h4" component="span">
                            Email:
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                            {` ${email}`}
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography variant="h4" component="span">
                            Phone:
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                            {` ${phone}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="span">
                            Biography:
                        </Typography>
                        <Typography variant="subtitle2" component="span">
                            {` ${bio}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <CardCollection pets={pets} />
                </Grid>
            </Grid>
        </>
    )
}

export default UserProfile
