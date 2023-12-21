'use client'
import React, { FC, useContext, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import CommonCart from '@/components/CommonCart';
import { GlobalContext } from '@/context';
import { deleteFromCart, getAllCartItems } from '@/service/Cart';

interface CartProps { }

const Cart: FC<CartProps> = () => {
  const {
    user,
    setCartItems,
    cartItems,
    pageLevelLoader,
    setPageLevelLoader,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    setPageLevelLoader(true);
    const res = await getAllCartItems(user?._id as string);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item: { productID: { onSale: string; price: number; priceDrop: number; }; }) => ({
            ...item,
            productID: {
              ...item.productID,
              price:
                item.productID.onSale === 'yes'
                  ? parseInt(
                    (
                      item.productID.price -
                      item.productID.price * (item.productID.priceDrop / 100)
                    ).toFixed(2)
                  )
                  : item.productID.price,
            },
          }))
          : [];
      setCartItems(updatedData);
      setPageLevelLoader(false);
      localStorage.setItem('cartItems', JSON.stringify(updatedData));
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function handleDeleteCartItem(getCartItemID: string) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader color={'#000000'} loading={pageLevelLoader} size={30} data-testid="loader" />
      </div>
    );
  }

  return (
    <CommonCart
      componentLevelLoader={componentLevelLoader}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItems={cartItems}
    />
  );
};

export default Cart;