import { createContext } from 'react';

export const SearchContext = createContext({
    loading: false,
    setIsAdvanced: () => { },
    searchPets: (searchParams) => { },
})