"use client";
import Notification from '@/components/Notification'
import InputComponent from '@/components/formElements/InputComponent'
import SelectComponent from '@/components/formElements/SelectComponent'
import TileComponent from '@/components/formElements/TileComponent'
import ComponentLevelLoader from '@/components/loader/ComponentLevelLoader'
import { GlobalContext } from '@/context'
import { AddProductTypes } from '@/types/productTypes';
import { AvailableSizes, adminAddProductformControls, firbaseStorageURL, firebaseConfig } from '@/utils'
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { addNewProduct, updateAProduct } from '@/service/product'
import { toast } from 'react-toastify';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firbaseStorageURL)

const createUniqueFileName = (getFile: { name: any; }) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12)
    return `${getFile.name}-${timeStamp}-${randomStringValue}`
}
async function helperForUPloadingImageToFirebase(file: any) {
    const getFileName = createUniqueFileName(file);
    const storageRefrence = ref(storage, `ecommerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageRefrence, file);
    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed', (snapshot) => { }, (error) => {
            console.log(error);
            reject(error)
        }, () => {
            getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => resolve(downloadURL)).catch(error => reject(error))
        })
    })
}

const initialFormData: AddProductTypes = {
    name: "",
    price: 0,
    description: "",
    category: "men",
    sizes: [],
    deliveryInfo: "",
    onSale: "no",
    imageUrl: "",
    priceDrop: 0,
};
export default function AdminAddNewProduct() {
    const [formData, setFormData] = useState(initialFormData);
    const {
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
    } = useContext(GlobalContext);

    const router = useRouter();

    useEffect(() => {
        if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
    }, [currentUpdatedProduct]);

    async function handleImage(e: any) {
        const extractImageUrl = await helperForUPloadingImageToFirebase(e.target.files[0])
        if (extractImageUrl !== "") {
            setFormData((prevFormData) => {
                return {
                    ...prevFormData,
                    imageUrl: extractImageUrl as string,
                }
            })
        }

    }
    function handleTileClick(getCurrentItem: any) {
        setFormData((prevFormData) => {
            let copySizes = [...prevFormData.sizes];
            const index = copySizes.findIndex((item) => item.id === getCurrentItem.id);

            if (index === -1) {
                copySizes.push(getCurrentItem);
            } else {
                copySizes = copySizes.filter((item) => item.id !== getCurrentItem.id);
            }

            return {
                ...prevFormData,
                sizes: copySizes,
            };
        });
    }
    async function handleAddProduct() {
        setComponentLevelLoader({ loading: true, id: "" });
        const res =
            currentUpdatedProduct !== null
                ? await updateAProduct(formData)
                : await addNewProduct(formData);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })

            setFormData(initialFormData);
            setCurrentUpdatedProduct(null)
            setTimeout(() => {
                router.push("/admin-view/all-products");
            }, 1000);
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: "" });
            setFormData(initialFormData);
        }

    }

    return (
        <div className='w-full mt-5 mr-0 mb-0 ml-0 relative'>
            <div className='flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative '>
                <div className='w-full mt-6 mr-0 ml-0 mb-0 space-y-8'>
                    <input
                        className='text-black'
                        accept='image/*'
                        max='1000000'
                        type="file"
                        onChange={handleImage}
                    />
                    <div className='flex gap-2 flex-col'>
                        <label className='text-black'>Available sizes</label>
                        <TileComponent
                            onClick={handleTileClick}
                            data={AvailableSizes}
                            selected={formData.sizes}
                        />
                    </div>
                    {adminAddProductformControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                            <InputComponent
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id] as string}
                                onChange={(event) => {
                                    setFormData((prevFormData) => {
                                        return {
                                            ...prevFormData,
                                            [controlItem.id]: event.target.value,
                                        }
                                    });
                                }}
                                key={controlItem.id}
                            />
                        ) : controlItem.componentType === "select" ? (
                            <SelectComponent
                                label={controlItem.label}
                                options={controlItem.options}
                                value={formData[controlItem.id] as string}
                                onChange={(event) => {
                                    setFormData((prevFormData) => {
                                        return {
                                            ...prevFormData,
                                            [controlItem.id]: event.target.value
                                        }
                                    });
                                }}
                                key={controlItem.id}
                            />
                        ) : null
                    )}
                    <button
                        onClick={handleAddProduct}
                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                    >
                        {componentLevelLoader && componentLevelLoader.loading ? (
                            <ComponentLevelLoader
                                text={currentUpdatedProduct !== null ? 'Updating Product' : "Adding Product"}
                                color={"#ffffff"}
                                loading={componentLevelLoader && componentLevelLoader.loading}
                            />
                        ) : currentUpdatedProduct !== null ? (
                            "Update Product"
                        ) : (
                            "Add Product"
                        )}
                    </button>
                </div>
            </div>
            <Notification />
        </div>
    )
}
