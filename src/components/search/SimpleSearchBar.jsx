import { useContext, useState } from "react";
import { CircularProgress, FormControl, InputLabel, makeStyles, MenuItem, Select, Grid, Typography } from "@material-ui/core";
import { SearchContext } from "../../contexts/SearchContext";
import FriendButton from "../misc/FriendButton";

const useStyles = makeStyles((theme) => ({
    searchBar: {
        margin: '25px 0',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    centerText: {
        textAlign: 'center',
    },
}));

const SimpleSearchBar = () => {
    const classes = useStyles();
    const [type, setType] = useState('');
    const { setIsAdvanced, searchPets, loading } = useContext(SearchContext)

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleSearchClick = () => {
        const searchParams = {};
        if (type) searchParams.type = type;
        searchPets(searchParams);
    }

    return (
        <div>
            <Grid container alignItems="center" className={classes.searchBar}>
                <Typography variant="h4">Friend Type</Typography>
                <FormControl variant="outlined" className={classes.formControl}>
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
                <Grid item className={classes.centerText}>
                    {loading ?
                        <CircularProgress color="secondary" />
                        :
                        <FriendButton handleOnClick={handleSearchClick}>Search A Friend</FriendButton>
                    }
                    <Typography variant="h6" onClick={() => setIsAdvanced(true)}>Advanced Search</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default SimpleSearchBar
