import axios from 'axios';

const baseUrl = 'https://find-a-friend-pet-adoption.herokuapp.com'

const addAuthHeader = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

const changeToFormData = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/form-data`
        }
    }
}

export const signUp = async (userInfo) => {
    const response = await axios.post(`${baseUrl}/users`, userInfo);
    return response.data;
}

export const login = async (loginInfo) => {
    const response = await axios.post(`${baseUrl}/users/login`, loginInfo);
    return response.data;
}

export const updateUser = async (userInfo, token) => {
    const response = await axios.put(
        `${baseUrl}/users`,
        userInfo,
        addAuthHeader(token)
    );
    return response.data;
}

export const updatePasswordByUserId = async (passwordInfo, userId, token) => {
    const response = await axios.put(
        `${baseUrl}/users/${userId}`,
        passwordInfo,
        addAuthHeader(token)
    );
    return response.data;
}

export const getAllUsers = async (token) => {
    const response = await axios.get(
        `${baseUrl}/users`,
        addAuthHeader(token)
    );
    return response.data;
}

export const getFullUserById = async (userId, token) => {
    const response = await axios.get(
        `${baseUrl}/users/${userId}/full`,
        addAuthHeader(token)
    );
    return response.data;
}

export const addPetImage = async (imageFormData, token) => {
    const response = await axios.post(
        `${baseUrl}/pets/image`,
        imageFormData,
        changeToFormData(token)
    );
    return response.data;
}

export const addPet = async (petInfo, token) => {
    const response = await axios.post(
        `${baseUrl}/pets`,
        petInfo,
        addAuthHeader(token)
    );
    return response.data;
}

export const getAllPets = async (token) => {
    const response = await axios.get(
        `${baseUrl}/pets`,
        addAuthHeader(token)
    );
    return response.data;
}

export const getSearchedPets = async (searchParams) => {
    const response = await axios.get(
        `${baseUrl}/pets/search`,
        { params: searchParams }
    );
    return response.data;
}

export const getPetById = async (petId, token) => {
    const response = await axios.get(
        `${baseUrl}/pets/${petId}`,
        addAuthHeader(token)
    );
    return response.data;
}

export const updatePet = async (petInfo, petId, token) => {
    const response = await axios.put(
        `${baseUrl}/pets/${petId}`,
        petInfo,
        addAuthHeader(token)
    );
    return response.data;
}

export const updatePetStatus = async (petId, status, token) => {
    const response = await axios.put(
        `${baseUrl}/pets/status/${petId}`,
        status,
        addAuthHeader(token)
    );
    return response.data;
}

export const addStatus = async (petId, status, token) => {
    const response = await axios.post(
        `${baseUrl}/statuses/${petId}`,
        status,
        addAuthHeader(token)
    );
    return response.data;
}

export const getStatusesById = async (userId, token) => {
    const response = await axios.get(
        `${baseUrl}/statuses/${userId}`,
        addAuthHeader(token)
    );
    return response.data;
}

export const updateStatus = async (petId, status, token) => {
    const response = await axios.put(
        `${baseUrl}/statuses/${petId}`,
        status,
        addAuthHeader(token)
    );
    return response.data;
}

export const removeStatus = async (petId, token) => {
    const response = await axios.delete(
        `${baseUrl}/statuses/${petId}`,
        addAuthHeader(token)
    );
    return response.data;
}

export const addHearty = async (petId, token) => {
    const response = await axios.post(
        `${baseUrl}/hearties/${petId}`,
        { },
        addAuthHeader(token)
    );
    return response.data;
}

export const getHearty = async (petId, token) => {
    const response = await axios.get(
        `${baseUrl}/hearties/${petId}`,
        addAuthHeader(token)
    );
    return response.data;
}

export const getHeartiesByUserId = async (userId, token) => {
    const response = await axios.get(
        `${baseUrl}/hearties/all/${userId}`,
        addAuthHeader(token)
    );
    return response.data;
}

export const removeHearty = async (petId, token) => {
    const response = await axios.delete(
        `${baseUrl}/hearties/${petId}`,
        addAuthHeader(token)
    );
    return response.data;
}