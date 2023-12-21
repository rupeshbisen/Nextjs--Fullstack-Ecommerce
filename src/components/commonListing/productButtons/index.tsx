import React, { FC, useContext } from 'react';
import { toast } from 'react-toastify';
import { GlobalContext } from '@/context';
import { usePathname, useRouter } from 'next/navigation';
import ComponentLevelLoader from '@/components/loader/ComponentLevelLoader';
import { deleteAProduct } from '@/service/product';
import { AddProductTypes } from '@/types/productTypes';
import { addToCart } from '@/service/Cart';

interface ProductButtonProps {
    item: AddProductTypes
}

const ProductButton: FC<ProductButtonProps> = ({ item }) => {
    const router = useRouter();

    const {
        setCurrentUpdatedProduct,
        setComponentLevelLoader,
        componentLevelLoader,
        user,
        showCartModal,
        setShowCartModal
    } = useContext(GlobalContext);

    const pathName = usePathname();
    const isAdminView = pathName.includes('admin-view');

    const handleDeleteProduct = async (item: any) => {
        setComponentLevelLoader({ loading: true, id: item._id });

        const res = await deleteAProduct(item._id);

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' });
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            router.refresh();
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: '' });
        }
    };

    const handleAddToCart = async (getItem: AddProductTypes) => {
        setComponentLevelLoader({ loading: true, id: getItem._id as string });

        const res = await addToCart({ productID: getItem._id as string, userID: user?._id as string });

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: '' });
            setShowCartModal(true);
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLevelLoader({ loading: false, id: '' });
            setShowCartModal(true);
        }
    };
    return isAdminView ? (
        <>
            <button
                onClick={() => {
                    setCurrentUpdatedProduct(item);
                    router.push('/admin-view/add-product');
                }}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                Update
            </button>
            <button
                onClick={() => handleDeleteProduct(item)}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                {componentLevelLoader &&
                    componentLevelLoader.loading &&
                    item._id === componentLevelLoader.id ? (
                    <ComponentLevelLoader
                        text={'Deleting Product'}
                        color={'#ffffff'}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                    />
                ) : (
                    'DELETE'
                )}
            </button>
        </>
    ) : (
        <>
            <button
                onClick={() => handleAddToCart(item)}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                {componentLevelLoader &&
                    componentLevelLoader.loading &&
                    componentLevelLoader.id === item._id ? (
                    <ComponentLevelLoader
                        text={'Adding to cart'}
                        color={'#ffffff'}
                        loading={componentLevelLoader && componentLevelLoader.loading}
                    />
                ) : (
                    'Add To Cart'
                )}
            </button>
        </>
    );
};

export default ProductButton;