import { useState } from "react"
import { Typography, Grid, Drawer, List, ListItem, ListItemText, makeStyles, CircularProgress } from "@material-ui/core"
import FriendButton from "../components/misc/FriendButton"
import AddPetForm from "../components/admin/AddPetForm";
import { getAllUsers, getFullUserById, getAllPets, getPetById } from "../lib/api";
import { useAuth } from "../contexts/auth";
import UserProfile from "../components/admin/UserProfile";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#F2BC79',
        width: 250,
        height: '100%',
    },
    list: {
        backgroundColor: '#F2BC79'
    },
    title: {
        textAlign: 'center',
        width: '100%',
        marginTop: 5
    },
    item: {
        color: '#8C4830',
    },
    buttonCon: {
        height: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Dashboard = () => {
    const classes = useStyles();
    const [initial, setInitial] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [openPets, setOpenPets] = useState(false);
    const [pets, setPets] = useState([]);
    const [pet, setPet] = useState();
    const [ownedPets, setOwnedPets] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const handleOpenUsers = async () => {
        setOpenUsers(true);
        setLoading(true);
        try {
            const usersList = await getAllUsers(token);
            setUsers(usersList);
        }
        catch (err) {
            alert(err.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleUserClick = async (userId) => {
        setIsFormOpen(false);
        setLoading(true);
        setUsers([]);
        setPet();
        try {
            const { user, ownedPets } = await getFullUserById(userId, token);
            setOwnedPets(ownedPets);
            setUser(user);
            setInitial(false);
            setOpenUsers(false);
        }
        catch (err) {
            alert(err);
        }
        finally {
            setLoading(false);
        }
    }

    const handleOpenPets = async () => {
        setOpenPets(true);
        setLoading(true);
        try {
            const petsList = await getAllPets(token);
            setPets(petsList);
        }
        catch (err) {
            alert(err.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handlePetClick = async (petId) => {
        setIsFormOpen(false);
        setLoading(true);
        setPets([]);
        setUser();
        try {
            const petInfo = await getPetById(petId, token);
            setInitial(false);
            setOpenPets(false);
            setPet(petInfo);
        }
        catch (err) {
            alert(err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Grid container>
            <Drawer anchor="left" open={openUsers} onClose={() => { setOpenUsers(false); setUsers([]); }}>
                <div className={classes.root}>
                    <Typography variant="h2" className={classes.title}>
                        Users
                    </Typography>
                    {loading ?
                        <CircularProgress color="secondary" />
                        :
                        <List className={classes.list}>
                            {
                                users.map(user => {
                                    return <ListItem key={user.id} button className={classes.item} onClick={() => handleUserClick(user.id)}>
                                        <ListItemText primary={user.firstName} />
                                    </ListItem>
                                })
                            }
                        </List>
                    }
                </div>
            </Drawer>
            <Grid item sm={2} className={classes.buttonCon}>
                <FriendButton handleOnClick={handleOpenUsers}>
                    All Users
                </FriendButton>
            </Grid>
            {initial &&
                <Grid container item sm={8} direction="column" alignItems="center" style={{ marginTop: '1rem' }}>
                    <Typography variant="h1" className={classes.header}>
                        Admin Dashboard
                        </Typography>
                    <FriendButton handleOnClick={() => { setInitial(false); setIsFormOpen(true) }}>
                        Add new pet
                        </FriendButton>
                </Grid>
            }
            {isFormOpen &&
                <Grid container item sm={8} direction="column" alignItems="center" style={{ marginTop: '1rem' }}>
                    <AddPetForm />
                </Grid>
            }
            {pet &&
                <Grid container item sm={8} direction="column" alignItems="center" style={{ marginTop: '1rem' }}>
                    <AddPetForm pet={pet} />
                </Grid>
            }
            {user &&
                <Grid item sm={8} style={{ marginTop: '1rem' }}>
                    <UserProfile user={user} pets={ownedPets} />
                </Grid>
            }
            <Grid item sm={2} className={classes.buttonCon}>
                <FriendButton handleOnClick={handleOpenPets}>
                    All Pets
                </FriendButton>
            </Grid>
            <Drawer anchor="right" open={openPets} onClose={() => setOpenPets(false)}>
                <div className={classes.root}>
                    <Typography variant="h2" className={classes.title}>
                        Pets
                    </Typography>
                    {loading ?
                        <CircularProgress color="secondary" />
                        :
                        <List className={classes.list}>
                            {
                                pets.map(pet => {
                                    return <ListItem key={pet.pet_id} button className={classes.item} onClick={() => handlePetClick(pet.pet_id)}>
                                        <ListItemText primary={pet.name} />
                                    </ListItem>
                                })
                            }
                        </List>
                    }
                </div>
            </Drawer>
        </Grid>
    )
}

export default Dashboard
