import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product.model";
import Joi from "joi";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

const AdminAddNewProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    sizes: Joi.array().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    imageUrl: Joi.string().required(),
    priceDrop: Joi.number().required(),
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req)

        if ((isAuthUser as JwtPayload)?.role === 'admin') {
            const extractData = await req.json();

            const {
                name, price, description, category, sizes, deliveryInfo, onSale, imageUrl, priceDrop
            } = extractData;
            const { error } = AdminAddNewProductSchema.validate({ name, price, description, category, sizes, deliveryInfo, onSale, imageUrl, priceDrop });
            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0].message
                })
            }

            const newlyCreatedProduct = await Product.create(extractData);
            if (newlyCreatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product added successfully",
                    data: newlyCreatedProduct
                })
            }
            else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to add the product ! Plaese try again later",
                });
            }

        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authorized",
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Somthing went wrong ! Plaese try again later",
        });
    }
}