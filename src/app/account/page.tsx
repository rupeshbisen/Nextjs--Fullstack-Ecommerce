"use client";
import React, { FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Notification from '@/components/Notification';
import { GlobalContext } from '@/context';
import { addNewAddressFormControls } from '@/utils';
import InputComponent from '@/components/formElements/InputComponent';
import ComponentLevelLoader from '@/components/loader/ComponentLevelLoader';
import { addNewAddress, deleteAddress, getAllAddress, updateAddress } from '@/service/address';
import { AddressTypes } from '@/types/addressTypes';


const Account: FC = () => {
    const {
        user,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        componentLevelLoader,
        setComponentLevelLoader,
        pageLevelLoader,
        setPageLevelLoader,
    } = useContext(GlobalContext);

    const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
    const [currentEditedAddressId, setCurrentEditedAddressId] = useState<string | null>(null);

    const router = useRouter();

    async function extractAllAddresses(): Promise<void> {
        setPageLevelLoader(true);
        const res = await getAllAddress(user?._id as string);

        if (res.success) {
            setPageLevelLoader(false);
            setAddresses(res.data);
        }
    }

    async function handleAddOrUpdateAddress(): Promise<void> {
        setComponentLevelLoader({ loading: true, id: '' });
        const res = currentEditedAddressId !== null
            ? await updateAddress({
                ...addressFormData,
                _id: currentEditedAddressId,
            })
            : await addNewAddress({ ...addressFormData, userID: user?._id });

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' });
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAddressFormData({
                fullName: '',
                city: '',
                country: '',
                postalCode: '',
                address: '',
            });
            extractAllAddresses();
            setCurrentEditedAddressId(null);
        } else {
            setComponentLevelLoader({ loading: false, id: '' });
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAddressFormData({
                fullName: '',
                city: '',
                country: '',
                postalCode: '',
                address: '',
            });
        }
    }

    function handleUpdateAddress(getCurrentAddress: AddressTypes): void {
        setShowAddressForm(true);
        setAddressFormData({
            fullName: getCurrentAddress.fullName,
            city: getCurrentAddress.city,
            country: getCurrentAddress.country,
            postalCode: getCurrentAddress.postalCode,
            address: getCurrentAddress.address,
        });
        setCurrentEditedAddressId(getCurrentAddress._id as string);
    }

    async function handleDelete(getCurrentAddressID: string): Promise<void> {
        setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

        const res = await deleteAddress(getCurrentAddressID);

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' });

            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            extractAllAddresses();
        } else {
            setComponentLevelLoader({ loading: false, id: '' });

            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    useEffect(() => {
        if (user !== null) extractAllAddresses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <section>
            <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow">
                    <div className="p-6 sm:p-12">
                        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                            {/* we have render random user image here */}
                        </div>
                        <div className="flex flex-col flex-1">
                            <h4 className="text-lg font-semibold text-center md:text-left">
                                {user?.name}
                            </h4>
                            <p>{user?.email}</p>
                            <p>{user?.role}</p>
                        </div>
                        <button onClick={() => router.push('/orders')} className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            View Your Orders
                        </button>
                        <div className="mt-6">
                            <h1 className="font-bold text-lg">Your Addresses :</h1>
                            {pageLevelLoader ? (
                                <PulseLoader
                                    color={'#000000'}
                                    loading={pageLevelLoader}
                                    size={15}
                                    data-testid="loader"
                                />
                            ) : (
                                <div className="mt-4 flex flex-col gap-4">
                                    {addresses && addresses.length ? (
                                        addresses.map((item) => (
                                            <div className="border p-6" key={item._id}>
                                                <p>Name : {item.fullName}</p>
                                                <p>Address : {item.address}</p>
                                                <p>City : {item.city}</p>
                                                <p>Country : {item.country}</p>
                                                <p>PostalCode : {item.postalCode}</p>
                                                <button
                                                    onClick={() => handleUpdateAddress(item)}
                                                    className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id as string)}
                                                    className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                >
                                                    {componentLevelLoader &&
                                                        componentLevelLoader.loading &&
                                                        componentLevelLoader.id === item._id ? (
                                                        <ComponentLevelLoader
                                                            text={'Deleting'}
                                                            color={'#ffffff'}
                                                            loading={
                                                                componentLevelLoader &&
                                                                componentLevelLoader.loading
                                                            }
                                                        />
                                                    ) : (
                                                        'Delete'
                                                    )}
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No address found ! Please add a new address below</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                            >
                                {showAddressForm ? 'Hide Address Form' : 'Add New Address'}
                            </button>
                        </div>
                        {showAddressForm ? (
                            <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                                    {addNewAddressFormControls.map((controlItem) => (
                                        <InputComponent
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            value={addressFormData[controlItem.id] as string}
                                            onChange={(event) =>
                                                setAddressFormData({
                                                    ...addressFormData,
                                                    [controlItem.id]: event.target.value,
                                                })
                                            }
                                            key={controlItem.id}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handleAddOrUpdateAddress}
                                    className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                >
                                    {componentLevelLoader && componentLevelLoader.loading ? (
                                        <ComponentLevelLoader
                                            text={'Saving'}
                                            color={'#ffffff'}
                                            loading={
                                                componentLevelLoader && componentLevelLoader.loading
                                            }
                                        />
                                    ) : (
                                        'Save'
                                    )}
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <Notification />
        </section>
    );
};

export default Account;