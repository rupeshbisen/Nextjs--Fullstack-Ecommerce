export interface sizes {
    id: string;
    label: string
}

export interface AddProductTypes {
    name: string;
    price: number;
    description: string;
    category: string;
    sizes: sizes[];
    deliveryInfo: string;
    onSale: string;
    imageUrl: string;
    priceDrop: number;
    [key: string]: string | number | sizes[];
}