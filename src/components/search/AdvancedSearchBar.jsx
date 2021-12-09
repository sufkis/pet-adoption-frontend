import { useState, useRef, useContext } from 'react'
import { CircularProgress, TextField, FormControl, InputLabel, makeStyles, MenuItem, Select, Grid, Typography } from "@material-ui/core";
import { SearchContext } from "../../contexts/SearchContext";
import FriendButton from "../misc/FriendButton";

const useStyles = makeStyles({
    root: {
        width: "80vw",
        marginTop: 20,
    },
    field: {
        maxWidth: 180,
        marginRight: 10,
    },
    marginBot: {
        marginBottom: 10
    },
    centerText: {
        textAlign: 'center',
    },
});

const AdvancedSearchBar = () => {
    const classes = useStyles();
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const nameRef = useRef();
    const heightRef = useRef();
    const weightRef = useRef();
    const { setIsAdvanced, searchPets, loading } = useContext(SearchContext)

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleSearchClick = () => {
        const searchParams = {};
        if (type) searchParams.type = type;
        if (status) searchParams.status = status;
        if (nameRef.current.value) searchParams.name = nameRef.current.value;
        if (heightRef.current.value) searchParams.height = heightRef.current.value;
        if (weightRef.current.value) searchParams.weight = weightRef.current.value;
        searchPets(searchParams);
    }

    return (
        <div>
            <Grid container alignItems="center" justify="center" className={classes.root}>
                <Grid item xs={3} container direction="column" className={classes.field}>
                    <FormControl variant="outlined" size="small" className={classes.marginBot}>
                        <InputLabel id="type-select">Type</InputLabel>
                        <Select
                            labelId="type-select"
                            id="type"
                            value={type}
                            onChange={handleTypeChange}
                            label="Type"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Dog">Dog</MenuItem>
                            <MenuItem value="Cat">Cat</MenuItem>
                            <MenuItem value="Horse">Horse</MenuItem>
                            <MenuItem value="Lizard">Lizard</MenuItem>
                            <MenuItem value="Bird">Bird</MenuItem>
                            <MenuItem value="Snake">Snake</MenuItem>
                            <MenuItem value="Rabbit">Rabbit</MenuItem>
                            <MenuItem value="Chipmunk">Chipmunk</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        label="Height"
                        required
                        inputRef={heightRef}
                    />
                </Grid>
                <Grid item xs={3} container direction="column" className={classes.field}>
                    <FormControl variant="outlined" size="small" className={classes.marginBot}>
                        <InputLabel id="status-select">Status</InputLabel>
                        <Select
                            labelId="status-select"
                            id="status"
                            value={status}
                            onChange={handleStatusChange}
                            label="status"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Adopted">Adopted</MenuItem>
                            <MenuItem value="Fostered">Fostered</MenuItem>
                            <MenuItem value="Waiting">Waiting</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        label="Weight"
                        inputRef={weightRef}
                    />
                </Grid>
                <Grid item xs={3} container direction="column" className={classes.field}>
                    <TextField
                        className={classes.field}
                        size="small"
                        variant="outlined"
                        type="text"
                        label="Name"
                        inputRef={nameRef}
                    />
                </Grid>
                <Grid item xs={3} className={classes.centerText}>
                    {loading ?
                        <CircularProgress color="secondary" />
                        :
                        <FriendButton handleOnClick={handleSearchClick}>Search A Friend</FriendButton>
                    }
                    <Typography variant="h6" onClick={() => setIsAdvanced(false)}>Basic Search</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default AdvancedSearchBar
