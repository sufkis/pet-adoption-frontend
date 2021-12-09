import { Grid } from '@material-ui/core';

const LogoNav = () => {
    return (
        <Grid item container xs={4} md={3} justify="flex-start">
            <img
                src="images/pet-logo.png"
                alt="FaF logo"
                style={{ maxHeight: 50 }}
            />
        </Grid>
    )
}

export default LogoNav
