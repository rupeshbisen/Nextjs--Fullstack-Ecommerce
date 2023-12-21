/* eslint-disable @next/next/no-img-element */
import { AddProductTypes } from "@/types/productTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductTileProps {
    item: AddProductTypes
}

export default function ProductTile({ item }: ProductTileProps) {
    const router = useRouter();

    return (
        <div onClick={() => router.push(`/product/${item._id}`)}>
            <div className="overflow-hideen aspect-w-1 aspect-h-1 h-52">
                {/* <Image
                    src={item.imageUrl}
                    width={20}
                    height={20}
                    alt="Product image"
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                /> */}
                <img
                    src={item.imageUrl}
                    alt="Product image"
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
                />
            </div>
            {item.onSale === "yes" ? (
                <div className="absolute top-0 m-2 rounded-full bg-black">
                    <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                        Sale
                    </p>
                </div>
            ) : null}
            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                    <p
                        className={`mr-3 text-sm font-semibold ${item.onSale === "yes" ? "line-through text-gray-500" : "text-gray-900"
                            }`}
                    >{`$ ${item.price}`}</p>
                    {item.onSale === "yes" ? (
                        <p className="mr-3 text-sm font-semibold text-gray-900">{`$ ${(
                            item.price -
                            item.price * (item.priceDrop / 100)
                        ).toFixed(2)}`}</p>
                    ) : null}
                    {item.onSale === "yes" ? (
                        <p className="mr-3 text-sm font-semibold text-green-500">{`-(${item.priceDrop}%)off`}</p>
                    ) : null}
                </div>
                <h3 className="md-2 text-gray-400 text-sm">{item.name}</h3>
            </div>
        </div>
    );
}