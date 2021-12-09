import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#D99962',
        color: '#242526',
        border: '1px solid #242526',
        borderRadius: 25,
        padding: '0 20px',
    }
})

const FriendButton = ({ children, handleOnClick, type }) => {
    const classes = useStyles();

    return (
        <Button
            type={type}
            onClick={handleOnClick}
            className={classes.root}
        >
            {children}
        </Button>
    )
}

export default FriendButton
