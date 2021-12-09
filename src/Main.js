import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainContext } from './contexts/MainContext'
import { useAuth } from './contexts/auth';
import NavigationBar from './components/navigation/NavigationBar';
import MainPageOut from './pages/MainPageOut';
import MainPageIn from './pages/MainPageIn';
import SearchPage from './pages/SearchPage';
import ProfileSettings from './pages/ProfileSettings';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import Dashboard from './pages/Dashboard';
import MyPets from './pages/MyPets';


const Main = () => {
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
    const { isInitiallyLoaded } = useAuth();
    const modalTypeEnum = {
        login: 'login',
        signUp: 'signUp',
    };

    const handleModalOpen = (modalType) => {
        switch (modalType) {
            case modalTypeEnum.login:
                setLoginModalOpen(true);
                break;
            case modalTypeEnum.signUp:
                setSignUpModalOpen(true);
                break;
            default:
                setPasswordModalOpen(true);
                break;
        }
    };

    const handleModalClose = (modalType) => {
        switch (modalType) {
            case modalTypeEnum.login:
                setLoginModalOpen(false);
                break;
            case modalTypeEnum.signUp:
                setSignUpModalOpen(false);
                break;
            default:
                setPasswordModalOpen(false);
                break;
        }
    };

    const mainContext = {
        isPasswordModalOpen,
        isLoginModalOpen,
        isSignUpModalOpen,
        handleModalOpen,
        handleModalClose,
    }

    if (!isInitiallyLoaded) {
        return <div></div>
    }
    return (
        <MainContext.Provider value={mainContext}>
            <Router>
                <NavigationBar />
                <Switch>
                    <Route path="/welcome" component={MainPageOut} />
                    <Route path="/search" component={SearchPage} />
                    <PrivateRoute exact path="/" component={MainPageIn} />
                    <PrivateRoute path="/settings" component={ProfileSettings} /> 
                    <PrivateRoute path="/myPets" component={MyPets} /> 
                    <AdminRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        </MainContext.Provider>
    )
}

export default Main
