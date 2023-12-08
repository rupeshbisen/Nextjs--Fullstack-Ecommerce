'use client'
import React, { FC, createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import Cookies from 'js-cookie';
import registerUserType from '@/types/registerUserType';

interface ComponentLevelLoader {
    loading: boolean;
    id: string;
}

interface GlobalContextProps {
    showNavModal: boolean;
    setShowNavModal: Dispatch<SetStateAction<boolean>>;
    pageLevelLoader: boolean;
    setPageLevelLoader: Dispatch<SetStateAction<boolean>>;
    componentLevelLoader: ComponentLevelLoader;
    setComponentLevelLoader: Dispatch<SetStateAction<ComponentLevelLoader>>;
    isAuthUser: boolean;
    setIsAuthUser: Dispatch<SetStateAction<boolean>>;
    user: registerUserType | null;
    setUser: Dispatch<SetStateAction<registerUserType | null>>;
    currentUpdatedProduct: null;
    setCurrentUpdatedProduct: Dispatch<SetStateAction<null>>;

}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

interface GlobalStateProps {
    children: React.ReactNode;
}

const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const [showNavModal, setShowNavModal] = useState<boolean>(false);
    const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(false);
    const [componentLevelLoader, setComponentLevelLoader] = useState<ComponentLevelLoader>({
        loading: false,
        id: "",
    });
    const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
    const [user, setUser] = useState<registerUserType | null>(null);
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);

    useEffect(() => {
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            setUser(userData);
        } else {
            setIsAuthUser(false);
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                showNavModal,
                setShowNavModal,
                pageLevelLoader,
                setPageLevelLoader,
                componentLevelLoader,
                setComponentLevelLoader,
                isAuthUser,
                setIsAuthUser,
                user,
                setUser,
                currentUpdatedProduct,
                setCurrentUpdatedProduct
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
