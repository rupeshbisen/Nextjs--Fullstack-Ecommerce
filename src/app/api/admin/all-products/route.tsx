import connectToDB from "@/database";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await connectToDB();
        const extractAllproducts = await Product.find({});
        if (extractAllproducts) {
            return NextResponse.json({
                success: true,
                data: extractAllproducts,
            });
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No products found !",
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

