import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product.model";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
    try {
        await connectToDB();
        const extractData = await req.json();

        const isAuthUser = await AuthUser(req)

        if ((isAuthUser as JwtPayload)?.role === 'admin') {
            const {
                _id, name, price, priceDrop, description, category, sizes, deliveryInfo,
                onSale, imageUrl,
            } = extractData;

            const updatedProduct = await Product.findByIdAndUpdate(
                {
                    _id: _id,
                },
                {
                    name,
                    price,
                    priceDrop,
                    description,
                    category,
                    sizes,
                    deliveryInfo,
                    onSale,
                    imageUrl,
                },
                { new: true, }
            );

            if (updatedProduct) {
                return NextResponse.json({
                    success: true,
                    data: 'Product updated successfully',
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to update Product ! Plaese try again later",
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authorized",
            })
        }
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            success: false,
            message: "Somthing went wrong ! Plaese try again later",
        })
    }
}