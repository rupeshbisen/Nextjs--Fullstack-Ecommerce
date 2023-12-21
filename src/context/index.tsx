/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { FC, createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import Cookies from 'js-cookie';
import registerUserType from '@/types/registerUserType';
import { AddProductTypes, cartItems } from '@/types/productTypes';
import { AddressTypes, CheckoutFormDataTypes } from '@/types/addressTypes';
import { usePathname, useRouter } from 'next/navigation';
import { orderTypes } from '@/types/orderTypes';

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
    currentUpdatedProduct: AddProductTypes | null;
    setCurrentUpdatedProduct: Dispatch<SetStateAction<AddProductTypes | null>>;
    showCartModal: boolean;
    setShowCartModal: Dispatch<SetStateAction<boolean>>;
    cartItems: Array<cartItems>;
    setCartItems: Dispatch<SetStateAction<Array<cartItems>>>;
    addresses: Array<AddressTypes>;
    setAddresses: Dispatch<SetStateAction<Array<AddressTypes>>>;
    addressFormData: AddressTypes;
    setAddressFormData: Dispatch<SetStateAction<AddressTypes>>;
    checkoutFormData: CheckoutFormDataTypes;
    setCheckoutFormData: Dispatch<SetStateAction<CheckoutFormDataTypes>>;
    allOrdersForUser: Array<orderTypes>;
    setAllOrdersForUser: Dispatch<SetStateAction<Array<orderTypes>>>;
    orderDetails: orderTypes | null;
    setOrderDetails: Dispatch<SetStateAction<orderTypes | null>>;
    allOrdersForAllUsers: Array<orderTypes>
    setAllOrdersForAllUsers: Dispatch<SetStateAction<Array<orderTypes>>>;


}

export const GlobalContext = createContext<GlobalContextProps>({} as GlobalContextProps);

export const initialCheckoutFormData: CheckoutFormDataTypes = {
    shippingAddress: {
        fullName: '',
        city: '',
        country: '',
        postalCode: '',
        address: ''
    },
    paymentMethod: '',
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true
}

const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];

const protectedAdminRoutes = [
    "/admin-view",
    "/admin-view/add-product",
    "/admin-view/all-products",
];
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
    const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState<AddProductTypes | null>(null);
    const [showCartModal, setShowCartModal] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Array<cartItems>>([]);
    const [addresses, setAddresses] = useState<Array<AddressTypes>>([]);
    const [addressFormData, setAddressFormData] = useState<AddressTypes>({
        fullName: '',
        city: '',
        country: '',
        postalCode: '',
        address: ''
    });

    const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormDataTypes>(initialCheckoutFormData);
    const [allOrdersForUser, setAllOrdersForUser] = useState<Array<orderTypes>>([]);
    const [orderDetails, setOrderDetails] = useState<orderTypes | null>(null);
    const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState<Array<orderTypes>>([])

    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const getCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            setUser(userData);
            setCartItems(getCartItems);
        } else {
            setIsAuthUser(false);
            setUser({} as registerUserType); //unauthenticated user
        }
    }, [Cookies]);

    useEffect(() => {
        if (
            pathName !== "/register" &&
            !pathName.includes("product") &&
            pathName !== "/" &&
            user &&
            Object.keys(user).length === 0 &&
            !protectedRoutes.includes(pathName)
        )
            router.push("/login");
    }, [user, pathName]);

    useEffect(() => {
        if (
            user !== null &&
            user &&
            Object.keys(user).length > 0 &&
            user?.role !== "admin" &&
            protectedAdminRoutes.indexOf(pathName) > -1
        )
            router.push("/unauthorized-page");
    }, [user, pathName]);


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
                setCurrentUpdatedProduct,
                showCartModal,
                setShowCartModal,
                cartItems,
                setCartItems,
                addresses,
                setAddresses,
                addressFormData,
                setAddressFormData,
                checkoutFormData,
                setCheckoutFormData,
                allOrdersForUser,
                setAllOrdersForUser,
                orderDetails,
                setOrderDetails,
                allOrdersForAllUsers,
                setAllOrdersForAllUsers
            }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalState;
