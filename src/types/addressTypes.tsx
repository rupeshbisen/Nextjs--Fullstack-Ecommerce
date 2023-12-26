export interface AddressTypes {
    _id?: string;
    fullName: string,
    address: string,
    city: string,
    country: string,
    postalCode: string,
    userID?: string,
    [key: string]: string | undefined;
}

export interface CheckoutFormDataTypes {
    shippingAddress: object;
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt: Date;
    isProcessing: boolean;
}