import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import CardCollection from "../components/pets/CardCollection";
import AdvancedSearchBar from "../components/search/AdvancedSearchBar";
import SimpleSearchBar from "../components/search/SimpleSearchBar";
import LoginModal from '../components/login/LoginModal';
import SignUpModal from '../components/signup/SignUpModal';
import { SearchContext } from "../contexts/SearchContext";
import { getSearchedPets } from "../lib/api";

const SearchPage = () => {
    const [isAdvanced, setIsAdvanced] = useState(false);
    const [pets, setPets] = useState([]);
    const [message, setMessage] = useState('Try the advanced search for more parameters');
    const [loading, setLoading] = useState(false);

    const searchPets = async (searchParams) => {
        setLoading(true);
        setMessage('');
        setPets([]);
        try{
            const searchResults = await getSearchedPets(searchParams);
            setPets(searchResults);
            if (!searchResults.length) setMessage("We couldn't find any results. Try other parameters. ");
        }
        catch (err) {
            alert(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    const searchContext = {
        loading,
        setIsAdvanced,
        searchPets,
    }

    return (
        <SearchContext.Provider value={searchContext}>
            <Grid container direction="column" alignItems="center">
                {isAdvanced ?
                    <AdvancedSearchBar />
                    :
                    <SimpleSearchBar />
                }
                {message && <Typography variant="subtitle2">{message}</Typography>}
                <CardCollection pets={pets} />
            </Grid>
            <LoginModal />
            <SignUpModal />
        </SearchContext.Provider>
    )
}

export default SearchPage
