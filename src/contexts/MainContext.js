import { createContext } from 'react';

export const MainContext = createContext({
    isPasswordModalOpen: false,
    isLoginModalOpen: false,
    isSignUpModalOpen: false,
    handleModalOpen: () => { },
    handleModalClose: () => { },
})