import { Grid, Typography } from '@material-ui/core'
import PasswordModal from '../components/profile/PasswordModal'
import ProfileForm from '../components/profile/ProfileForm'

const ProfileSettings = () => {
    return (
        <Grid container direction="column" alignItems="center" style={{marginTop: '4rem'}}>
            <Typography variant="h1">Profile Settings</Typography>
            <ProfileForm />
            <PasswordModal />
        </Grid>
    )
}

export default ProfileSettings
