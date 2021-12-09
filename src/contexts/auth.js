import { useEffect, useContext, useState, createContext } from 'react';
import localforage from 'localforage';

export const AuthContext = createContext({
    token: '',
    user: '',
    setTokenAndUser: async (token) => { },
    removeTokenAndUser: () => { },
    isInitiallyLoaded: false,
});

const tokenKey = 'userToken';
const userKey = 'userInfo';

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = (props) => {
    const [token, setToken] = useState();
    const [user, setUser] = useState();
    const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);

    const setTokenAndUser = async (token, user) => {
        await localforage.setItem(tokenKey, token);
        await localforage.setItem(userKey, user);
        setToken(token);
        setUser(user);
    }
    
    const removeTokenAndUser = async () => {
        await localforage.removeItem(tokenKey);
        await localforage.removeItem(userKey);
        setToken();
        setUser();
    }

    useEffect(() => {
        let isMounted = true;
        localforage.getItem(tokenKey).then(token => {
            if (token && isMounted) setToken(token);
            isMounted &&setIsInitiallyLoaded(true);
        });
        localforage.getItem(userKey).then(user => {
            if (user && isMounted) setUser(user);
        });
        return () => {
            isMounted = false;
        }
    }, [])

    return <AuthContext.Provider value={{ token, user, setTokenAndUser, removeTokenAndUser, isInitiallyLoaded }}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthProvider;