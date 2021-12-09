import { useEffect, useRef, useState } from "react";
import { CircularProgress, Grid, makeStyles, TextField, Button, Input, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import FriendButton from "../misc/FriendButton";
import { addPetImage, addPet, updatePet } from "../../lib/api";
import { useAuth } from "../../contexts/auth";

const useStyles = makeStyles({
    form: {
        textAlign: 'center',
    },
    image: {
        maxHeight: 200,
        maxWidth: 300,
        borderRadius: 10,
        border: '2px solid #8C4830',
        marginBottom: 3
    },
    imgUpload: {
        display: 'none',
    },
    imgBlock: {
        marginBottom: 12,
    },
    formFields: {
        marginBottom: '-10px',
    },
    field: {
        marginBottom: 5,
    },
});

const AddPetForm = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successful, setSuccessful] = useState('');
    const [imgUrl, setImgUrl] = useState('images/dog-placeholder.jpg');
    const [image, setImage] = useState();
    const [status, setStatus] = useState('');
    const [hypo, setHypo] = useState('');
    const [type, setType] = useState('');
    const nameRef = useRef();
    const heightRef = useRef();
    const weightRef = useRef();
    const colorRef = useRef();
    const breedRef = useRef();
    const bioRef = useRef();
    const dietRef = useRef();
    const { token } = useAuth();

    const handleImageChange = (img) => {
        setImage(img);
        const imgUrl = URL.createObjectURL(img);
        setImgUrl(imgUrl);
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handleTypeChange = (e) => {
        setType(e.target.value);
    }

    const handleHypoChange = (e) => {
        setHypo(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessful('');
        setError('');
        if (!status || hypo === undefined || !type || imgUrl === 'images/dog-placeholder.jpg') {
            setError('Please fill out the entire form and provide an image.');
            setLoading(false);
            return;
        }
        try {
            const petInfo = {
                name: nameRef.current.value,
                status,
                height: +heightRef.current.value,
                weight: +weightRef.current.value,
                color: colorRef.current.value,
                hypoallergenic: hypo,
                type,
                breed: breedRef.current.value,
                bio: bioRef.current.value,
                diet: dietRef.current.value,
            };
            if (image) {
                const formData = new FormData();
                formData.append('image', image);
                const { imageUrl } = await addPetImage(formData, token);
                petInfo.imageUrl = imageUrl;
            }
            else {
                petInfo.imageUrl = imgUrl;
            }
            if (props.pet) {
                const { message } = await updatePet(petInfo, props.pet.pet_id ,token);
                setSuccessful(message);
            }
            else {
                const { message } = await addPet(petInfo, token);
                setSuccessful(message);
            }
        }
        catch (err) {
            setError(err.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (props.pet) {
            const { name, status, height, weight, color, hypoallergenic, type, breed, bio, diet, image } = props.pet
            nameRef.current.value = name;
            setStatus(status);
            heightRef.current.value = height;
            weightRef.current.value = weight;
            colorRef.current.value = color;
            if (hypoallergenic) setHypo(true);
            else setHypo(false);
            setType(type);
            breedRef.current.value = breed;
            bioRef.current.value = bio;
            dietRef.current.value = diet;
            setImgUrl(image);
        }
    }, [props.pet])

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <Grid className={classes.imgBlock} container direction="column" alignContent="center">
                <img className={classes.image} src={imgUrl} alt="placeholder" />
                <label htmlFor="outlined-button-file">
                    <Input
                        className={classes.imgUpload}
                        accept="image/*"
                        id="outlined-button-file"
                        type="file"
                        onChange={(event) => handleImageChange(event.target.files[0])}
                    />
                    <Button variant="outlined" component="span">
                        Upload Image
                    </Button>
                </label>
            </Grid>
            <Grid container spacing={4} className={classes.formFields}>
                <Grid item sm={6} container direction="column" justify="center">
                    <TextField
                        className={classes.field}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        type="text"
                        label="Name"
                        required
                        inputRef={nameRef}
                    />
                    <TextField
                        className={classes.field}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        type="number"
                        label="Height"
                        required
                        inputRef={heightRef}
                    />
                    <TextField
                        className={classes.field}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        type="text"
                        label="Color"
                        required
                        inputRef={colorRef}
                    />
                    <FormControl variant="outlined" className={classes.field} size="small">
                        <InputLabel id="type-select">Type</InputLabel>
                        <Select
                            labelId="type-select"
                            id="type"
                            value={type}
                            onChange={handleTypeChange}
                            label="Type"
                        >
                            <MenuItem disabled value="">
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
                        className={classes.field}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        type="text"
                        label="Bio"
                        multiline
                        rows={5}
                        required
                        inputRef={bioRef}
                    />
                </Grid>
                <Grid item sm={6} container direction="column" justify="center">
                    <FormControl variant="outlined" className={classes.field} size="small">
                        <InputLabel id="status-select">Status</InputLabel>
                        <Select
                            labelId="status-select"
                            id="status"
                            value={status}
                            onChange={handleStatusChange}
                            label="status"
                        >
                            <MenuItem disabled value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem disabled value="Adopted">Adopted</MenuItem>
                            <MenuItem disabled value="Fostered">Fostered</MenuItem>
                            <MenuItem value="Waiting">Waiting</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.field}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        type="number"
                        label="Weight"
                        required
                        inputRef={weightRef}
                    />
                    <FormControl variant="outlined" className={classes.field} size="small">
                        <InputLabel id="hypo-select">Hypoallergenic</InputLabel>
                        <Select
                            labelId="hypo-select"
                            id="hypo"
                            value={hypo}
                            onChange={handleHypoChange}
                            label="Hypoallergenic"
                        >
                            <MenuItem disabled value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.field}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        type="text"
                        label="Breed"
                        required
                        inputRef={breedRef}
                    />
                    <TextField
                        className={classes.field}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        type="text"
                        label="Dietary restrictions"
                        multiline
                        rows={5}
                        required
                        inputRef={dietRef}
                    />
                </Grid>
            </Grid>
            {successful && <Alert severity="success">{successful}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            {loading ?
                <CircularProgress color="secondary" />
                :
                <FriendButton type="submit">
                    Submit Pet
                </FriendButton>
            }
        </form>
    )
}

export default AddPetForm
