import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product.model";
import { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function DELETE(req: Request) {
    try {

        await connectToDB();
        const isAuthUser = await AuthUser(req)

        if ((isAuthUser as JwtPayload)?.role === 'admin') {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get('id');
            if (!id) {
                return NextResponse.json({
                    success: false,
                    message: "Product id is required !",
                })
            }
            const deletedProduct = await Product.findByIdAndDelete(id);

            if (deletedProduct) {
                return NextResponse.json({
                    success: true,
                    message: "Product deleted successfully",
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Failed to delete Product ! Plaese try again later",
                })
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "You are not authorized",
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Somthing went wrong ! Plaese try again later",
        })
    }
}