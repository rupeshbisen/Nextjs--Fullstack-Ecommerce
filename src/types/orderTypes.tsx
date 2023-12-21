import { AddressTypes } from "./addressTypes";
import registerUserType from "./registerUserType";

interface orderItems {
    product: {
        imageUrl: string;
        price: number;
        name: string;
    };
    _id: string;
}
export interface orderTypes {
    user?: registerUserType;
    _id?: string;
    orderItems: orderItems[],
    shippingAddress: AddressTypes
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt: Date;
    isProcessing: boolean;
    createdAt: string;
}
